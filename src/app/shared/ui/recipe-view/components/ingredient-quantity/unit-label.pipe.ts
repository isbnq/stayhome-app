import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'unitLabel'
})
export class UnitLabelPipe implements PipeTransform {
  static translateMap: Record<string, string | undefined> = {
    "milliliter": "мл",
    "liter": "л",
    "gram": "г",
    "kgram": "кг",
    "piece": "шт",
    "tablespoon": "ст.л",
    "teaspoon": "ч.л"
  }

  transform(viewUnit: string): string {
    if (!(viewUnit in UnitLabelPipe.translateMap)) {
      throw new Error(`Unknown viewUnit '${viewUnit}'`);
    }
    return UnitLabelPipe.translateMap[viewUnit]!;
  }

}
