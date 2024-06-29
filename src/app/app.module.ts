import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiSvgModule, TuiDataListModule, TuiTextfieldControllerModule, TuiButtonModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseAuthService, authInterceptor } from "./core/services/firebase-auth.service";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { FirebaseStorageService } from "./core/services/firebase-storage.service";
import { provideFirebaseConfig } from "./core/firebase-config";
import { environment } from "src/environments/environment";
import { ImageUploaderService } from "@services/image-uploader.service";
import { FirebaseImageUploaderService } from "./core/services/firebase-image-uploader.service";
import { ImageConverterService } from "./core/services/image-converter.service";
import { TuiLetModule } from "@taiga-ui/cdk";
import { TuiSelectModule } from "@taiga-ui/kit";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,

      TuiButtonModule,
      TuiSvgModule,
      TuiLetModule,
      TuiDataListModule,
      TuiSelectModule,
      TuiTextfieldControllerModule
],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),

    provideFirebaseConfig(environment.firebaseConfig),
    FirebaseAuthService,
    FirebaseStorageService,

    ImageConverterService,
    { provide: ImageUploaderService, useClass: FirebaseImageUploaderService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
