import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { tuiSum } from '@taiga-ui/cdk';


@Component({
  selector: 'recipe-view-macronutrients',
  templateUrl: 'macronutrients.component.html',
  styleUrl: 'macronutrients.component.scss'
})
export class MacronutrientsComponent implements OnChanges{
  private readonly labels: readonly [string, string, string] = ['Белки', 'Жиры', 'Углеводы'];

  @Input({
    required: true,
    transform: (v: [number | null, number | null, number | null]) => v.map(v => v ?? 0) })
  value!: [number, number, number];

  total!: number;

  index = NaN;

  ngOnChanges(changes: SimpleChanges): void {
    this.total = tuiSum(...changes['value'].currentValue)
  }

  get sum(): number {
    return Number.isNaN(this.index) ? this.total : this.value[this.index];
  }

  get label(): string {
    return Number.isNaN(this.index) ? 'БЖУ' : this.labels[this.index];
  }
}
