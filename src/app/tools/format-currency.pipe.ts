import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    if (value > 10 ** 5 && value <= 10 ** 8) {
      return `${Math.round(value / 10 ** 3)} K`;
    } else if (value > 10 ** 8 && value <= 10 ** 11) {
      return `${Math.round(value / 10 ** 6)} M`;
    } else if (value > 10 ** 11 && value <= 10 ** 15) {
      return `${Math.round(value / 10 ** 9)} B`;
    } else if (value > 10 ** 15 && value <= 10 ** 18) {
      return `${Math.round(value / 10 ** 9)} T`;
    }
    // console.log(value, args);
  }
}
