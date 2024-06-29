import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';

import { RecipesViewComponent } from './conponents/recipes-view/recipes-view.component';
import { RecipesEditComponent } from './conponents/recipes-edit/recipes-edit.component';
import { RecipesCreateComponent } from './conponents/recipes-create/recipes-create.component';


const routes: Routes = [
  {
    path: 'create',
    component: RecipesCreateComponent
  },
  {
    path: ':recipeId',
    component: RecipesViewComponent
  },
  {
    path: ':recipeId/edit',
    component: RecipesEditComponent
  },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  bootstrap: [RecipesComponent]
})
export class RecipeRoutingModule { }
