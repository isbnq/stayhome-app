import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import Compressor from 'compressorjs';


export type ImageConvertOptions = Pick<Compressor.Options, 'strict' | 'checkOrientation' | 'maxWidth' | 'maxHeight' | 'resize' | 'quality' | 'mimeType'>

@Injectable({
  providedIn: 'root'
})
export class ImageConverterService {
  private static readonly defaultOpts: Readonly<ImageConvertOptions> = {
    strict: true,
    checkOrientation: true,
    resize: 'none'
  }

  convert(imageFile: File | Blob, opts?: Readonly<ImageConvertOptions>): Observable<File | Blob> {
    return from(new Promise<File | Blob>((resolve, reject) => new Compressor(imageFile, {
      ...ImageConverterService.defaultOpts,
      ...opts,
      success: resolve,
      error: reject
    })))
  }
}
