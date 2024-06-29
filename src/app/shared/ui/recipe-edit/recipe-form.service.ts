import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RecipeData } from '@mytypes/data/recipe-data';
import { FormControlDeep } from '@type-utils/reactive-forms';
import { required, normalize_formarray } from 'src/utils/forms';

@Injectable({
  providedIn: 'root'
})
export class RecipeFormService {

  private recipeFormGroup: FormControlDeep<RecipeData> = new FormGroup({
    imageUrl:       new FormControl(''),
    title:          new FormControl('', required()),
    description:    new FormControl('', required()),

    servings:       new FormControl(0, required([Validators.min(1)])),
    cookingTime:    new FormControl(0, required([Validators.min(0)])),
    kcalories:      new FormControl<number | null>(null),
    
    protein:        new FormControl<number | null>(null, [Validators.min(0), Validators.max(100)]),
    fat:            new FormControl<number | null>(null, [Validators.min(0), Validators.max(100)]),
    carbohydrates:  new FormControl<number | null>(null, [Validators.min(0), Validators.max(100)]),
    
    ingredients:    new FormArray<any>([]),
    instruction:    new FormArray<any>([]),
    notes:          new FormArray<any>([]),
  });

  constructor() { }

  get group() {
    return this.recipeFormGroup;
  }

  static newIngredient(): FormControlDeep<RecipeData['ingredients'][number]> {
    return new FormGroup({
      product: new FormGroup({
        name: new FormControl('', required()),
        type: new FormControl('', required())
      }),
      quantity: new FormGroup({
        gram:             new FormControl<number | null>(null),
        milliliter:       new FormControl<number | null>(null),
        piece:            new FormControl<number | null>(null),
        defaultViewUnit:  new FormControl<string | null>(null)
      })
    });
  }

  static newInstructionStep(): FormControlDeep<RecipeData['instruction'][number]> {
    return new FormGroup({
      imageUrl: new FormControl(''),
      text:     new FormControl('', required()),
    });
  }

  static newNote(): FormControlDeep<RecipeData['notes'][number]> {
    return new FormGroup({
      text: new FormControl('', required()),
    });
  }

  setRecipeData(newRecipeData: RecipeData) {
    normalize_formarray(
      this.recipeFormGroup.controls.ingredients, newRecipeData.ingredients, RecipeFormService.newIngredient);
    normalize_formarray(
      this.recipeFormGroup.controls.instruction, newRecipeData.instruction, RecipeFormService.newInstructionStep);
    normalize_formarray(
      this.recipeFormGroup.controls.notes, newRecipeData.notes, RecipeFormService.newNote);
    
    this.recipeFormGroup.setValue(newRecipeData);
  }

  clear() {
    this.recipeFormGroup.controls.ingredients.clear();
    this.recipeFormGroup.controls.instruction.clear();
    this.recipeFormGroup.controls.notes.clear();
    this.recipeFormGroup.reset();
  }

  addIngredient() {
    this.recipeFormGroup.controls.ingredients.push(RecipeFormService.newIngredient());
  }
  removeIngredient(index: number) {
    this.recipeFormGroup.controls.ingredients.removeAt(index);
  }

  addInstructionStep() {
    this.recipeFormGroup.controls.instruction.push(RecipeFormService.newInstructionStep());
  }
  removeInstructionStep(index: number) {
    this.recipeFormGroup.controls.instruction.removeAt(index);
  }

  addNote() {
    this.recipeFormGroup.controls.notes.push(RecipeFormService.newNote());
  }
  removeNote(index: number) {
    this.recipeFormGroup.controls.notes.removeAt(index);
  }
}
