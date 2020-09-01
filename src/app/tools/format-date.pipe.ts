import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDatePipe',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let newValue = value.split(' ')[0];
    newValue = newValue.split('-')[2] + '-' + newValue.split('-')[1];
    return newValue;
  }
}
