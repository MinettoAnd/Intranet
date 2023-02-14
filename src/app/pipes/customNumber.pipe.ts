import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customNumber' })
export class CustomNumberPipe implements PipeTransform {
  transform(value: number, ...args: any[]) {
    
    return this.separadorDeMiles(Math.round(value));
  }

  separadorDeMiles(numero) {
    let partesNumero = numero.toString().split('.');
  
    partesNumero[0] = partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return partesNumero.join('.');
  }
}