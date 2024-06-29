import { Component, Input } from '@angular/core';

import { RecipeData } from '@mytypes/data/recipe-data';

type DescriptionData = Pick<RecipeData, 'imageUrl' | 'description'>

@Component({
  selector: 'recipe-view-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent {
  @Input({ required: true, alias: 'value' }) data!: DescriptionData;
}
