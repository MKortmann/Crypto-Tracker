import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatUrl',
})
export class FormatUrlPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const inputString = value.split('/');
    const linkName = inputString[2].split('.');

    const linkNameWithoutWWW =
      linkName.length === 2
        ? `${linkName[0]}.${linkName[1]}`
        : `${linkName[1]}.${linkName[2]}`;

    return linkNameWithoutWWW;
  }
}
