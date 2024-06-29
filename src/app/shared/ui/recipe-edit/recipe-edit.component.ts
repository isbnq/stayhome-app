import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { RecipeData } from '@mytypes/data/recipe-data';

import { RecipeFormService } from './recipe-form.service';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnChanges {
  @Input('value') recipeData?: RecipeData;
  @Output('valueChange') recipeDataChange = new EventEmitter<RecipeData>();

  constructor(readonly recipeForm: RecipeFormService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { previousValue, currentValue } = changes['recipeData'];

    if (previousValue !== currentValue) {
      if (currentValue) {
        this.recipeForm.setRecipeData(changes['recipeData'].currentValue);
      } else {
        this.recipeForm.clear();
      }
    }
  }

  get group() {
    return this.recipeForm.group;
  }

  get controls() {
    return this.recipeForm.group.controls;
  }

  clear() {
    this.recipeForm.clear();
  }

  onSubmit() {
    this.recipeDataChange.emit(this.recipeForm.group.getRawValue());
  }
}
