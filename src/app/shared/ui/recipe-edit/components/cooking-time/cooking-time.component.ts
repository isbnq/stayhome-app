import { Component, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { required } from 'src/utils/forms';

@Component({
  selector: 'recipe-edit-cooking-time',
  templateUrl: './cooking-time.component.html',
  styleUrl: './cooking-time.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CookingTimeComponent),
      multi: true,
    }
  ]
})
export class CookingTimeComponent implements ControlValueAccessor, OnDestroy {
  private _prev_minutes: number = 0

  formGroup = new FormGroup({
    hours: new FormControl(0, required([Validators.min(0)])),
    minutes: new FormControl(0, required([Validators.min(0)]))
  })

  private _subscription?: Subscription

  private _onChange?: (v: number | undefined) => void
  private _onTouched?: () => void


  writeValue(minutes: number): void {
    this._subscription?.unsubscribe();
    
    if (this._prev_minutes !== minutes) {
      this.formGroup.setValue({
        hours: Math.trunc(minutes / 60),
        minutes: minutes % 60
      })
    }

    this.formGroup.valueChanges.pipe(
      map(({ hours, minutes }) => {
        if (hours === undefined && minutes === undefined) {
          return undefined;
        } else {
          return 60 * (hours ?? 0) + (minutes ?? 0);
        }
      })
    ).subscribe(v => {
      this._onChange && this._onChange(v);
    });
  }

  registerOnChange(cb: (v: number | undefined) => void): void {
    this._onChange = cb;
  }

  registerOnTouched(cb: () => void): void {
    this._onTouched = cb;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  focusedChange(isFocused: boolean) {
    !isFocused && this._onTouched && this._onTouched();
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
