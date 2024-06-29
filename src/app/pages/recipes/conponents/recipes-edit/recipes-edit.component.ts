import { Component } from '@angular/core';
import { mockRecipeData } from 'src/mock/recipe-data';
import { RecipeData } from '@mytypes/data/recipe-data';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrl: './recipes-edit.component.scss'
})
export class RecipesEditComponent {
  recipeData = mockRecipeData;

  valueChange(recipeData: RecipeData) {
    console.log(recipeData);
  }
}
