import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditComponent } from './recipe-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputFilesModule, TuiInputModule, TuiInputNumberModule, TuiIslandModule, TuiMarkerIconModule, TuiTextareaModule } from '@taiga-ui/kit';
import { CookingTimeComponent } from './components/cooking-time/cooking-time.component';
import { TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { RecipeFormService } from './recipe-form.service';
import { InstructionStepComponent } from './components/instruction-step/instruction-step.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';


@NgModule({
  declarations: [
    RecipeEditComponent,
    CookingTimeComponent,
    InstructionStepComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    TuiInputModule,
    TuiTextareaModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiInputFilesModule,
    TuiSvgModule,
    TuiMarkerIconModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiIslandModule
  ],
  exports: [RecipeEditComponent],

  bootstrap: [RecipeEditComponent],
  providers: [RecipeFormService]
})
export class RecipeEditModule { }
