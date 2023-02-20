import { Pipe, PipeTransform } from '@angular/core';
import { isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength, parsePhoneNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(phoneValue: any): string {
    
    if(isPossiblePhoneNumber(phoneValue, 'PE') ){
      const stringPhone = phoneValue + '';
    const phoneNumber = parsePhoneNumber(stringPhone, 'PE');
    const formatted = phoneNumber.formatNational();
    return formatted;
    }else{
      phoneValue = phoneValue.replaceAll('-', '');
      phoneValue = phoneValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  
    return phoneValue;
    }
    
  }
}