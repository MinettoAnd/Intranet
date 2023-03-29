import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
        name: 'numberDecimalPipe'
    })

export class NumberDecimalPipe implements PipeTransform {

    // public transform(value: any) {
    //     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    // }
    constructor(
        private decimalPipe : DecimalPipe,
    ) {
    }
    
    transform(value: any, digitsInfo?: string, locale?: string): string | null {
        let result;
        result = this.decimalPipe.transform(value, '1.2-2', locale);
    
         // …do something with your result
    
        return result;
        }
}