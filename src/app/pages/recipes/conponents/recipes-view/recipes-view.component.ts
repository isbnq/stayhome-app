import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockRecipeData } from 'src/mock/recipe-data';

@Component({
  selector: 'app-recipes-view',
  templateUrl: './recipes-view.component.html',
  styleUrl: './recipes-view.component.scss'
})
export class RecipesViewComponent {
  recipeData = mockRecipeData;

  constructor(private readonly route: ActivatedRoute) {
    
  }
}
