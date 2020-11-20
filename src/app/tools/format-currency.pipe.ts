import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    if (value > 10 ** 4 && value <= 10 ** 7) {
      return `${Math.round(value / 10 ** 3)} K`;
    } else if (value > 10 ** 7 && value <= 10 ** 10) {
      return `${Math.round(value / 10 ** 6)} M`;
    } else if (value > 10 ** 10 && value <= 10 ** 14) {
      return `${Math.round(value / 10 ** 9)} B`;
    } else if (value > 10 ** 14 && value <= 10 ** 17) {
      return `${Math.round(value / 10 ** 9)} T`;
    }
  }
}
