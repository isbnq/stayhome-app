import { Component, Input } from '@angular/core';

import { RecipeData } from '@mytypes/data/recipe-data';

type ParamsData = Pick<RecipeData, 'kcalories' | 'cookingTime' | 'servings' | 'protein' | 'fat' | 'carbohydrates'>


@Component({
  selector: 'recipe-view-params',
  templateUrl: './params.component.html',
  styleUrl: './params.component.scss'
})
export class ParamsComponent {
  @Input({ required: true, alias: 'value' }) data!: ParamsData;
}
