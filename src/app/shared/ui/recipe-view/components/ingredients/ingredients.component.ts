import { Component, Input } from '@angular/core';

import { RecipeData } from '@mytypes/data/recipe-data';

type IngredientsData = Pick<RecipeData, 'ingredients'>;


@Component({
  selector: 'recipe-view-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
  @Input({ required: true, alias: 'value' }) data!: IngredientsData;
}
