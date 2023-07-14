import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/_services/data.service';
import Swal from 'sweetalert2';
import { ExportService } from '../../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';
import { CurrencyPipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';

import { NumberDecimalPipe } from 'src/app/pipes/numberDecimal.pipe';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IndicadoresService } from 'src/app/_services/indicadores.service';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.scss']
})
export class FarmaciaComponent implements OnInit {
  parameters;
  action = false;
  option = 'colaboradores';
  constructor(private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private _ndp:NumberDecimalPipe, private modalService: NgbModal, public dataService: DataService) { }
  panelOptions;
  ngOnInit() {
    // const observer1$: Subscription = this.dataService.callback.subscribe(
    //   (data) => {
    //     this.parameters = data;
    //     console.log(193, this.parameters)
    //     // this.setPage({ offset: 0 });
    //   }
    //   );
    //   this.listObservers$ = [observer1$]
      // this.setPage({ offset: 0 });
    }
  // ngOnDestroy(): void {
  //   this.listObservers$.forEach(u => u.unsubscribe())
  // }
  getParameters(parameters){
    this.parameters = parameters;
    if(parameters !== undefined){
      this.dataService.callback.emit(parameters);
      this.action = true;
    }
  }


}


