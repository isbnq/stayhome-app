import { Component } from '@angular/core';
import { RecipeData } from '@mytypes/data/recipe-data';

@Component({
  selector: 'app-recipes-create',
  templateUrl: './recipes-create.component.html',
  styleUrl: './recipes-create.component.scss'
})
export class RecipesCreateComponent {
  valueChange(recipeData: RecipeData) {
    console.log(recipeData);
  }
}
