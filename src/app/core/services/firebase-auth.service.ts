import { HttpClient, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, filter, fromEvent, tap, map, of, switchMap, from, finalize, share } from 'rxjs';

import { ReadonlyDeep } from 'type-fest';

import { FIREBASE_CONFIG, FirebaseConfig } from '../firebase-config';
import { RefreshToken, SignIn, SignUp } from './firebase-auth.requests';
import { UserData } from './firebase-auth.types';


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // check if request to firebase realtime database or storage
  if (req.url.match(/^https:\/\/(?:www\.)?(?:.+?firebaseio|firebasestorage\.googleapis\.com)/)) {
    return next(req);
  }

  const authService = inject(FirebaseAuthService);
  
  return authService.authToken().pipe(
    switchMap(authToken => {
      if (authToken) {
        const newReq = req.clone({
          params: req.params.append('access_token', authToken)
        });
        return next(newReq);
      } else {
        return next(req);
      }
    })
  );
}


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements OnDestroy {
  // sync between tabs
  private readonly _users$: BehaviorSubject<ReadonlyDeep<Record<string, UserData>>>

  readonly usersArray$: Observable<ReadonlyDeep<UserData[]>>

  // no sync between tabs
  private readonly _activeUser$: BehaviorSubject<ReadonlyDeep<UserData> | null>

  // for prevent race condition when waiting for new authToken while parallel requests
  private _newAuthToken$?: Observable<string | null>

  private _storageSubscription: Subscription

  constructor(
    @Inject(FIREBASE_CONFIG) private readonly config: FirebaseConfig,
    private readonly http: HttpClient) {
    // load data from local storage
    const usersJson = localStorage.getItem('appUsers')
    this._users$ = new BehaviorSubject(
      usersJson && JSON.parse(usersJson) as Record<string, UserData> || {});

    this.usersArray$ = this._users$.pipe(
      map(users => Object.values(users))
    );

    const activeUserId = localStorage.getItem('appActiveUserId');
    this._activeUser$ = new BehaviorSubject(activeUserId && this._users$.value[activeUserId] || null);

    // sync users between tabs
    this._storageSubscription = fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(e => e.key === 'appUsers' && e.newValue !== e.oldValue),
      map(({ newValue }) =>
        newValue && JSON.parse(newValue) as Record<string, UserData> || {})
    ).subscribe(newUsers => {
      this._users$.next(newUsers);

      const activeUser = this._activeUser$.value;
      const activeUserNew = activeUser && newUsers[activeUser.id];
      if (JSON.stringify(activeUserNew) !== JSON.stringify(activeUser)) {
        this._activeUser$.next(activeUserNew ?? null);
      }
    });
  }

  ngOnDestroy(): void {
    this._storageSubscription.unsubscribe();
    this._activeUser$.complete();
    this._users$.complete();
  }

  get activeUser() {
    return this._activeUser$.value;
  }

  get activeUser$() {
    return this._activeUser$.asObservable();
  }

  get users() {
    return this._users$.value;
  }

  get users$() {
    return this._users$.asObservable();
  }

  authToken(): Observable<string | null> {
    const user = this.activeUser;
    if (user?.auth) {
      // prevent race condition
      if (this._newAuthToken$) {
        return this._newAuthToken$;
      }

      // check if token is expired or will expired soon
      if (Date.now() - 5 * 60 * 1000 - user.auth.expiresOn <= 0) {
        this._newAuthToken$ = from(RefreshToken.request(this.config.apiKey, user.auth.refreshToken)).pipe(
          tap(res => this._setUser({
            ...user,
  
            auth: {
              authToken: res.id_token,
              expiresOn: Date.now() + 1000 * Number(res.expires_in),
              refreshToken: res.refresh_token
            }
          })),
          map(res => res.id_token),
          finalize(() => this._newAuthToken$ = undefined),
          share()  // to make one request while multiple subscribers
        );

        return this._newAuthToken$;
      } else {
        return of(user.auth.authToken);
      }
    } else {
      return of(null);
    }
  }

  private _setUser(user: UserData) {
    const newUsers = {...this._users$.value, [user.id]: user};
    this._users$.next(newUsers);
    localStorage.setItem('appUsers', JSON.stringify({...this._users$.value, [user.id]: user}));
  }

  private _delUser(userId: string) {
    if (this._users$.value[userId]) {
      const newUsers = {...this._users$.value};
      delete newUsers[userId];

      localStorage.setItem('appUsers', JSON.stringify(newUsers));
    }
  }

  activateUser(userId: string) {
    if (userId !== this._activeUser$.value?.id) {
      const user = this._users$.value[userId];
      if (user) {
        this._activeUser$.next(user);
      }
    }
  }

  deactivateUser() {
    if (null !== this._activeUser$.value) {
      this._activeUser$.next(null);
    }
  }

  private _signResponseToUserData(res: SignUp.Response | SignIn.Response): UserData {
    return {
      id: res.localId,
      email: res.email,
      name: res.displayName,

      auth: {
        authToken: res.idToken,
        expiresOn: Date.now() + 1000 * Number(res.expiresIn),
        refreshToken: res.refreshToken
      }
    }
  }

  singUp(name: string, email: string, password: string): Observable<void> {
    return from(SignUp.request(this.config.apiKey, { displayName: name, email, password })).pipe( 
      map(res => this._signResponseToUserData(res)),
      map(userData => { this._setUser(userData); this.activateUser(userData.id) }),
    )
  }

  signIn(email: string, password: string): Observable<void> {
    return from(SignIn.request(this.config.apiKey, { email, password })).pipe(
      map(res => this._signResponseToUserData(res)),
      map(userData => { this._setUser(userData); this.activateUser(userData.id) })
    )
  }
}
