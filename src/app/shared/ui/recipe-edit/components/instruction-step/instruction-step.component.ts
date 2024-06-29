import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeData } from '@mytypes/data/recipe-data';
import { FormControlDeep } from '@type-utils/reactive-forms';

import { required } from 'src/utils/forms';

@Component({
  selector: 'recipe-edit-instruction-step',
  templateUrl: './instruction-step.component.html',
  styleUrl: './instruction-step.component.scss'
})
export class InstructionStepComponent {
  @Input() formGroup: FormControlDeep<RecipeData['instruction'][number]> = new FormGroup({
    imageUrl: new FormControl(''),
    text: new FormControl('', required())
  })
}
