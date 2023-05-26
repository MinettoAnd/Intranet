import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  callback: EventEmitter<any> = new EventEmitter<any>()
  // @Output() parametersEmitter = new EventEmitter<any>();
  // parametersFilters: Object;
  constructor() { }

  //   setParameters(newParameters) {
  //     this.parametersFilters = newParameters;
  //     this.changeParameters();
  //     console.log(15, this.parametersFilters)
  //   }
  

  //   changeParameters() {
  //     this.parametersEmitter.emit(this.parametersFilters);
  //   }
}
