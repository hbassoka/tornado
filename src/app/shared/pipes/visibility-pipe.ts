import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visibility',
  standalone:true
})
export class VisibilityPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    return value ? 'Visble' : 'Non visible';
  }

}
