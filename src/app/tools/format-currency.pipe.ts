import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    if (value > 10 ** 3 && value <= 10 ** 6) {
      return `${Math.round(value / 10 ** 3)} K`;
    } else if (value > 10 ** 6 && value <= 10 ** 9) {
      return `${Math.round(value / 10 ** 6)} M`;
    } else if (value > 10 ** 9 && value <= 10 ** 12) {
      return `${Math.round(value / 10 ** 9)} B`;
    } else if (value > 10 ** 12 && value <= 10 ** 15) {
      return `${Math.round(value / 10 ** 9)} T`;
    }
    // console.log(value, args);
  }
}
