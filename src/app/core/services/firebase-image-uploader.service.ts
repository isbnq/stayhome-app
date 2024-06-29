import { Injectable } from '@angular/core';
import { FirebaseStorageService } from './firebase-storage.service';
import { ImageConvertOptions, ImageConverterService } from './image-converter.service';
import { Observable, switchMap } from 'rxjs';
import { ImageUploaderService } from '@services/image-uploader.service';


@Injectable({
  providedIn: 'root',
})
export class FirebaseImageUploaderService implements ImageUploaderService {
  constructor(
    private readonly imageConverter: ImageConverterService,
    private readonly firebaseStorage: FirebaseStorageService
  ) {}

  private readonly convertOpts: ImageConvertOptions = {
    maxWidth: 1920,
    maxHeight: 1920,
    quality: .8,
    mimeType: 'image/webp'
  }

  uploadBlob(imageName: string, imageBlob: Blob): Observable<string> {
    return this.imageConverter.convert(imageBlob, this.convertOpts).pipe(
      switchMap(convertedImage =>
        this.firebaseStorage.uploadBlob(imageName, convertedImage))
    );
  }
}
