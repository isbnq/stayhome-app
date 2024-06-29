import { FormControl, FormGroup, FormArray } from "@angular/forms";
import { Primitive, ConditionalKeys, ConditionalExcept } from "type-fest";

export type FormControlDeep<
  T,
  RequiredT = Required<T>,
  PrimitiveKeys = ConditionalKeys<T, Primitive>,
  NonPrimitiveKeys = keyof ConditionalExcept<T, Primitive>
> = T extends Array<infer U>
? FormArray<FormControlDeep<U>> : T extends {}
? FormGroup<{
  [K in keyof T]: T[K] extends Primitive ? FormControl<RequiredT[K]> : FormControlDeep<RequiredT[K]>
}> : never
