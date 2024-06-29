import { InjectionToken, Provider } from "@angular/core";


export type FirebaseConfig = Readonly<{
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}>

export const FIREBASE_CONFIG = new InjectionToken<FirebaseConfig>('FIREBASE_CONFIG');

export const provideFirebaseConfig = (config: FirebaseConfig): Provider => ({
  provide: FIREBASE_CONFIG, useValue: config
})