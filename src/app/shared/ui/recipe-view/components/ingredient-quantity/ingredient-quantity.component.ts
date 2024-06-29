import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IngredientQuantityData } from '@mytypes/data/recipe-data';
import { UnitConvertPipe } from './unit-convert.pipe';


@Component({
  selector: 'recipe-view-ingredient-quantity',
  templateUrl: 'ingredient-quantity.component.html',
  styleUrl: 'ingredient-quantity.component.scss'
})
export class IngredientQuantityComponent implements OnChanges {
  @Input({ required: true, alias: 'value' }) quantity!: Readonly<IngredientQuantityData>;

  viewUnit: FormControl<string> = new FormControl();
  viewUnits!: string[];

  ngOnChanges(changes: SimpleChanges): void {
    const currentValue = changes['quantity'].currentValue;
    this.viewUnit.reset(currentValue.defaultViewUnit ?? currentValue.refUnit);
    this.viewUnits = this.getViewUnits();
  }

  getViewUnits() {
    const refUnits = Object.keys(this.quantity).filter(v => v === 'gram' || v === 'milliliter' || v === 'piece');
    return [...refUnits.flatMap(
      refUnit => refUnit in UnitConvertPipe.convertMap ?
      Object.keys(UnitConvertPipe.convertMap[refUnit])
      : []), ...refUnits];
  }
}
