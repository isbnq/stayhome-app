import { Validators, FormArray } from "@angular/forms";


export const required: (validators?: any[]) => ({
  nonNullable: true,
  validators: any[]
}) = (validators: any[] = []) => ({
  nonNullable: true,
  validators: [Validators.required, ...validators]
})

export const normalize_formarray = <T extends FormArray>(
  formarray: T,
  valuearray: ReturnType<T['getRawValue']>,
  newItem: () => T['controls'][number]
) => {
  const delta_length = valuearray.length - formarray.controls.length;
  if (delta_length > 0) {
    for (let i = 0; i < delta_length; ++i) {
      formarray.controls.push(newItem());
    }
  } else if (delta_length < 0) {
    formarray.controls.length = valuearray.length;
  }
}
