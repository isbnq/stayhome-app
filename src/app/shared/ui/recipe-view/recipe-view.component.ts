import { Component, Input } from '@angular/core';

import { RecipeData } from '@mytypes/data/recipe-data';


@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent {
  @Input({ alias: 'value', required: true }) recipeData!: RecipeData;
}
