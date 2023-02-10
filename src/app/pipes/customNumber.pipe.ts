import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customNumber' })
export class CustomNumberPipe implements PipeTransform {
  transform(value: number, ...args: any[]) {
    return Math.round(value);
  }
}