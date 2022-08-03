import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../formulario.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  data: any = [];
  public listencuesta: any = [];
  public resolved: any = [];
  public pending: any = [];
  public listOthers: any = [];
  public receptions: any = [];
  public listMes: any = [];
  public listtiempoDestiempo: any = [];
  public listtiempoDestiempo2: any = [];
  public liststate: any = [];

  public barcharList: any = [];
  public TIPO_RECLAMO: string = "IPRESS";
  isLoading = false;
  isLoading2 = false;
  isLoading3 = false;
  isLoading4 = false;

  isPeriodo = false;
  isRangoFecha = true;

  isPosition1 = true;
  isPosition2 = true;
  isPosition3 = true;
  isPosition4 = true;



  model: NgbDateStruct;
  // Pie 
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
      labels: {
        fontColor: "#454545",
        fontSize: 12,
        fontStyle: "bold",
        boxWidth: 12        
      }
    },
    plugins: {
      datalabels: {        
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            //let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            //var percentage = Math.round((value / sum) * 100) + '%';
            var percentage = ((value * 100) / this.listencuesta[0]?.reporte_registrados).toFixed(2) + '%';
            
            return percentage;
          } else {
            return percentage;
          }
          
        },
        
        color: "black",
        font: {
          weight: "bold",
          size: 14
        },
        anchor: "end",
        clamp :true,
        align: "start",
        //offset:20,
        

      },

    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'horizontalBar';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(67,168,128,1)', 'rgba(22,73,126,1)', 'rgba(100,22,157,1)', 'rgba(159, 24, 0, 1)', 'rgba(67,168,128,1)'],

    },

  ];

  getRegisteredEncuesta() {
    this.formularioService.getFormulario().subscribe(
        (res:any) => {
          console.log(res);
          this.listencuesta = res.body.length > 0 ? res.data : [];       
        });     
  }

  getPorcentaje(data) {
    return ((data * 100) / this.listencuesta[0]?.reclamos_registrados).toFixed(2) + '%';
  }

  getdata(){
    this.formularioService.getFormulario().subscribe(
    (res:any) => {
      console.log(res);
      this.data = res.body;       
    }); 

  };
 



  sucursal;

  public title: string = ""
  public title2: string = ""
  public cantidad: number = 0;
  public cantidad2: number = 0;
  public ngperiodo: string = null;
  public ngfecha01: string = null;
  public ngfecha02: string = null;
  seachForm: FormGroup;
  constructor(private formularioService: FormularioService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.seachForm = this.formBuilder.group({
      opselect: ['2'],
      periodo: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      sede: ['0'],
    });
  } 

  ngOnInit() {
    /* if (parseInt(localStorage.getItem('idrol')) == 1) {
      this.sucursal = 0;
    } else {
      this.sucursal = parseInt(localStorage.getItem('sede'));
    }
    this.search(); */
  }

  search() {
    const formValue = this.seachForm.value;
    if (this.isPeriodo) {
      this.ngperiodo = this.datePipe.transform(formValue.periodo, 'yyyyMM');
    }
    if (this.isRangoFecha) {
      this.ngfecha01 = this.datePipe.transform(formValue.fecha_inicio, 'yyyy-MM-dd');
      this.ngfecha02 = this.datePipe.transform(formValue.fecha_fin, 'yyyy-MM-dd');
    }
    const data = {
      periodo: this.ngperiodo,
      fecha_inicio: this.ngfecha01,
      fecha_fin: this.ngfecha02,
      sede: parseInt(formValue.sede),
      idrol: parseInt(localStorage.getItem('idrol')),
      empresa: this.TIPO_RECLAMO
    };
    console.log(data)
    this.getRegisteredEncuesta();
    /* this.getRegisteredClaims(data);
    this.getResolvedClaims(data);
    this.getPendingClaims(data);
    this.getOthersClaims(data);
    this.getReceptionModeClaims(data);
    this.getClaimsTimepoDestiempo(data);
    this.getClaimsMeses(data);
    this.getClaimsEstado(data); */
  }
  onChange(event) {
    if (parseInt(event.target.value) === 1) {
      this.isPeriodo = true;
      this.isRangoFecha = false;
      this.ngfecha01 = null;
      this.ngfecha02 = null;
    } else {
      this.isPeriodo = false;
      this.isRangoFecha = true;
      this.ngperiodo = null;

    }
  }
  
 
  showTableDasboard(id, position) {
    if (id == 1) {
      if (position == 1) {
        this.isPosition1 = true;
      } else {
        this.isPosition1 = false;
      }
    } else if (id == 2) {
      if (position == 1) {
        this.isPosition2 = true;
      } else {
        this.isPosition2 = false;
      }
    } else if (id == 3) {
      if (position == 1) {
        this.isPosition3 = true;
      } else {
        this.isPosition3 = false;
      }
    } else if (id == 4) {
      if (position == 1) {
        this.isPosition4 = true;
      } else {
        this.isPosition4 = false;
      }
    }
  }

  
}

