import { Component, Input } from '@angular/core';

import { RecipeData } from '@mytypes/data/recipe-data';

type InstructionData = Pick<RecipeData, 'instruction'>;


@Component({
  selector: 'recipe-view-instruction',
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.scss'
})
export class InstructionComponent {
  @Input({ required: true, alias: 'value' }) data!: InstructionData;
}
