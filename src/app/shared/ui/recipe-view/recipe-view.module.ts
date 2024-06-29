import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TuiIslandModule, TuiLazyLoadingModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiSvgModule, TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiRingChartModule } from '@taiga-ui/addon-charts';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';

import { RecipeViewComponent } from './recipe-view.component';
import { MacronutrientsComponent } from './components/macronutrients/macronutrients.component';
import { IngredientQuantityComponent } from './components/ingredient-quantity/ingredient-quantity.component';
import { UnitLabelPipe } from './components/ingredient-quantity/unit-label.pipe';
import { UnitConvertPipe } from './components/ingredient-quantity/unit-convert.pipe';
import { DescriptionComponent } from './components/description/description.component';
import { ParamsComponent } from './components/params/params.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { InstructionComponent } from './components/instruction/instruction.component';
import { NotesComponent } from './components/notes/notes.component';


@NgModule({
  declarations: [
    RecipeViewComponent,
    MacronutrientsComponent,
    IngredientQuantityComponent,
    UnitLabelPipe,
    UnitConvertPipe,
    DescriptionComponent,
    ParamsComponent,
    IngredientsComponent,
    InstructionComponent,
    NotesComponent
  ],
  exports: [
    RecipeViewComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    TuiIslandModule,
    TuiSvgModule,
    TuiRingChartModule,
    TuiMoneyModule,
    TuiLazyLoadingModule,
    TuiDataListModule,
    TuiSelectModule,
    TuiTextfieldControllerModule
  ],
  bootstrap: [RecipeViewComponent]
})
export class RecipeViewModule { }
