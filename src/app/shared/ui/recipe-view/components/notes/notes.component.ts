import { Component, Input } from '@angular/core';

import { RecipeData } from '@mytypes/data/recipe-data';

type NotesData = Pick<RecipeData, 'notes'>


@Component({
  selector: 'recipe-view-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  @Input({ required: true, alias: 'value' }) data!: NotesData;
}
