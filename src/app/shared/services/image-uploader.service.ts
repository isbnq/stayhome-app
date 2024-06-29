import { Observable, of } from 'rxjs';


export abstract class ImageUploaderService {
   /**
   * 
   * @param imageName: name of image file on storage
   * @param imageBlob: Blob to upload
   * @returns Observable that emits download URL of uploaded blob
   */
  uploadBlob(imageName: string, imageBlob: Blob): Observable<string> {
    return of(URL.createObjectURL(new File([imageBlob], imageName)));
  }
}
