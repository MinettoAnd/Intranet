import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
        name: 'numberDecimalPipe'
    })

export class CustomCurrencyPipe implements PipeTransform {

    // public transform(value: any) {
    //     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    // }
    constructor(
        private decimalPipe : DecimalPipe,
    ) {
    }
    
    transform(value: any, digitsInfo?: string, locale?: string): string | null {
        let result;
        result = 'S/ ' + this.decimalPipe.transform(value, '1.3-3', locale);
    
         // …do something with your result
    
        return result;
        }
}