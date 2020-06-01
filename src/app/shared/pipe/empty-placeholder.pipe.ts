import {Pipe, PipeTransform} from '@angular/core';
import {isString} from 'util';
@Pipe({
  name: 'emptyPlaceholder'
})
export class EmptyPlaceholderPipe implements PipeTransform {
  transform(value: any, placeholder?: any): any {
    if (value == null || (isString(value) && value === '')) {
      return placeholder ? placeholder : '-';
    }
    return value;
  }
}
