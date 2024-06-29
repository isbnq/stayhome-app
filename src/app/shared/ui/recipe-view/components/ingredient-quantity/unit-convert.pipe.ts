import { Pipe, PipeTransform } from '@angular/core';

import { IngredientQuantityData } from '@mytypes/data/recipe-data';

type RefUnits = 'gram' | 'milliliter' | 'piece'


@Pipe({
  name: 'unitConvert'
})
export class UnitConvertPipe implements PipeTransform {
  static convertMap: Record<string, Record<string, (v: number) => number>> = {
    'milliliter': {
      'liter': v => Math.round(v / 1000 * 10) / 10,
      'teaspoon': v => Math.round(v / 5 * 4) / 4,
      'tablespoon': v => Math.round(v / 15 * 4) / 4
    },
    'gram': { 'kgram': v => Math.round(v / 1000 * 10) / 10 }
  }

  static convertMapReversed: Record<string, [RefUnits, (v: number) => number]> = {
    'liter': ['milliliter', ml => Math.round(ml / 1000 * 10) / 10],
    'teaspoon': ['milliliter', ml => Math.round(ml / 5 * 4) / 4],
    'tablespoon': ['milliliter', ml => Math.round(ml / 15 * 4) / 4],
    'kgram': ['gram', kg => Math.round(kg / 1000 * 10) / 10]
  }

  transform(quantity: Pick<IngredientQuantityData, RefUnits>, viewUnit: string): number {
    if (viewUnit in quantity) {
      return (quantity as any)[viewUnit];
    }

    if (!(viewUnit in UnitConvertPipe.convertMapReversed)) {
      throw Error(`Unknown viewUnit '${viewUnit}'`);
    }

    const [refUnit, convert] = UnitConvertPipe.convertMapReversed[viewUnit]!;

    if (!(refUnit in quantity)) {
      throw Error(`Unknown refUnit '${refUnit}'`);
    }

    return convert(quantity[refUnit]!)
  }

}
