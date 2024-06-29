import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, map } from "rxjs";
import { FIREBASE_CONFIG, FirebaseConfig } from "../firebase-config";
import { ErrorWithCodeAndTypedMessage } from "src/utils/error";


export class FirebaseStorageResponseError extends ErrorWithCodeAndTypedMessage {}
export class FirebaseStorageRequestError extends Error {}


const handleStorageError = <T extends unknown = unknown, V extends never = never>() => catchError<T, V>(error => {
  if (error instanceof HttpErrorResponse) {
    throw new FirebaseStorageResponseError(error.status, error.message);
  } else {
    throw new FirebaseStorageRequestError(JSON.stringify(error));
  }
})


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  private readonly _endpoint: string

  constructor(
    @Inject(FIREBASE_CONFIG) private readonly config: FirebaseConfig,
    private readonly http: HttpClient
  ) {
    this._endpoint = `https://firebasestorage.googleapis.com/v0/b/${this.config.storageBucket}/o`;
  }

  private _pathToUrl(path: string): string {
    return `${this._endpoint}/${path.replaceAll('/', '%2F')}`;
  }

  getDownloadUrl(path: string): string {
    return `${this._pathToUrl(path)}?alt=media`;
  }

  getMetadataUrl(path: string): string {
    return this._pathToUrl(path);
  }

  /**
   * 
   * @param path: path to file on storage
   * @param blob: Blob to upload
   * @returns Observable that emits download URL of uploaded blob
   */
  uploadBlob(path: string, blob: Blob): Observable<string> {
    const url = this.getDownloadUrl(path);

    return this.http.post(url, blob).pipe(
      map(() => url),
      handleStorageError()
    );
  }

  delete(path: string): Observable<null> {
    const url = this._pathToUrl(path);

    return this.http.delete(url).pipe(
      map(() => null),
      handleStorageError()
    );
  }
}
