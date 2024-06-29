import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

import { RecipesViewComponent } from './conponents/recipes-view/recipes-view.component';
import { RecipesEditComponent } from './conponents/recipes-edit/recipes-edit.component';

import { RecipeViewModule } from '@ui/recipe-view/recipe-view.module';
import { RecipeEditModule } from '@ui/recipe-edit/recipe-edit.module';
import { RecipesCreateComponent } from './conponents/recipes-create/recipes-create.component';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipesViewComponent,
    RecipesEditComponent,
    RecipesCreateComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    RecipeViewModule,
    RecipeEditModule
  ],
  bootstrap: [RecipesComponent]
})
export class RecipeModule { }
