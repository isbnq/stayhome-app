import { FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from "@angular/forms"

let fb: FormBuilder;

type _Group<T extends {}> = ReturnType<typeof fb.nonNullable.group<T>>
type _Array<T> = ReturnType<typeof fb.nonNullable.array<T>>

type RecipeFormData = _Group<{
  imageUrl: string,

  title: FormControl<string>,
  description: FormControl<string>,

  servings: FormControl<number>,
  cookingTime: FormControl<number>,  // minutes

  kcalories?: FormControl<number>,  // kcal by 100 grams
  macronutrients?: FormGroup<{
    protein: FormControl<number>,  // grams by 100 grams
    fat: FormControl<number>,  // grams by 100 grams
    carbohydrates: FormControl<number>,  // grams by 100 grams
    water?: FormControl<number>,  // milliliters by 100 grams
  }>,

  ingredients: _Array<{
    product: _Group<{
      name: string,
      type: 'liquid' | 'drybulk' | 'solid',
    }>
    quantity?: _Group<{
      gram?: number,  // weight
      milliliter?: number,  // volume
      piece?: number,
      defaultViewUnit?: 'milliliter' | 'liter' | 'gram' | 'kgram' | 'piece' | 'teaspoon' | 'tablespoon'
    }>
  }>

  instruction: _Array<{
    imageUrl: string,
    text: string,
  }>

  notes: _Array<{
    text: string,
  }>
}>

type RecipeData = RecipeFormData['value']