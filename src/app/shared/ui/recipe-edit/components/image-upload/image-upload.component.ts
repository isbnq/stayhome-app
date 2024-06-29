import { Component, ElementRef, Input, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { switchMap, of, Subject, tap } from 'rxjs';
import { ImageUploaderService } from '@services/image-uploader.service';


@Component({
  selector: 'recipe-edit-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    }
  ]
})
export class ImageUploadComponent implements ControlValueAccessor, OnDestroy {
  @Input() style?: string

  @Input({ required: true }) uploadName!: string

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>

  file$ = new Subject<File | null>
  disabled: boolean = false
  imageUrl: string | null = null

  // --- control value accessor part
  private _onChange!: (v: string | null) => void
  private _onTouched!: () => void

  registerOnChange(cb: (v: string | null) => void): void {
    this._onChange = cb;
  }

  registerOnTouched(cb: () => void): void {
    this._onTouched = cb;
  }

  writeValue(newImageUrl: string): void {
    this.imageUrl = newImageUrl;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
  // ---

  constructor(private readonly imageUploader: ImageUploaderService) {
    this.file$.pipe(
      switchMap(imageFile => {
        if (imageFile) {
          return this.imageUploader.uploadBlob(this.uploadName, imageFile);
        } else {
          return of(null)
        }
      }),
      tap(console.log)
    ).subscribe(imageFile => {
      this.imageUrl = imageFile;
      this._onChange && this._onChange(this.imageUrl);
    });
  }

  ngOnDestroy(): void {
    this.file$.complete();
  }

  fileInputChange() {
    const file = this.fileInput.nativeElement.files?.item(0);
    this.file$.next(file ?? null);
  }

  onBlur() {
    this._onTouched && this._onTouched();
  }

  cleanFileInput() {
    this.file$.next(null);
  }
}
