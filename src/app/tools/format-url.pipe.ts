import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatUrl',
})
export class FormatUrlPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const splitted = value.split('/');
    return splitted[2];
    // console.log(value, args);
  }
}
