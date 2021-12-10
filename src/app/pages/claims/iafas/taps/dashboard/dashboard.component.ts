import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../../../claims.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public listclaims: any = [];
  public resolved: any = [];
  public pending: any = [];
  public listOthers: any = [];
  public receptions: any = [];
  public listMes: any = [];
  public listtiempoDestiempo: any = [];
  public listtiempoDestiempo2: any = [];
  public liststate: any = [];

  public barcharList: any = [];
  public TIPO_RECLAMO: string = "IAFAS";
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
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            //let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            //var percentage = Math.round((value / sum) * 100) + '%';
            var percentage = ((value * 100) / this.listclaims[0]?.reclamos_registrados).toFixed(2) + '%';
            return percentage;
          } else {
            return percentage;
          }
        },

      },

    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(94, 208, 243, 1)', 'rgba(220, 243, 94, 1)'],

    },

  ];


  //BAR CHAR
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [

  ];

  //TODO PIE CHAR 2 ------------------------------///

  public pieChartOptions2: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            var percentage = ((value * 100) / this.resolved[0]?.reclamos_resultos).toFixed(2) + '%';
            // console.log(percentage);
            return percentage;
          } else {
            return percentage;
          }
        },

      },

    }
  };
  public pieChartLabels2: Label[] = [];
  public pieChartData2: number[] = [];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [pluginDataLabels];
  public pieChartColors2 = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)'],

    },

  ];

  //TODO PIE CHAR 3 ------------------------------///
  public pieChartOptions3: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            var percentage = ((value * 100) / this.listclaims[0]?.reclamos_registrados).toFixed(2) + '%';
            // console.log(percentage);
            return percentage;
          } else {
            return percentage;
          }
        },

      },

    }
  };
  public pieChartLabels3: Label[] = [];
  public pieChartData3: number[] = [];
  public pieChartType3: ChartType = 'pie';
  public pieChartLegend3 = true;
  public pieChartPlugins3 = [pluginDataLabels];
  public pieChartColors3 = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(94, 208, 243, 1)', 'rgba(220, 243, 94, 1)'],

    },

  ];
  sucursal;

  public title: string = "";
  public title2: string = "";
  public cantidad: number = 0;
  public cantidad2: number = 0;
  public ngperiodo: string = null;
  public ngfecha01: string = null;
  public ngfecha02: string = null;
  seachForm: FormGroup;
  constructor(private apiService: ClaimsService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.seachForm = this.formBuilder.group({
      opselect: ['2'],
      periodo: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      sede: ['0'],
    });
  }

  ngOnInit() {
    if (parseInt(localStorage.getItem('idrol')) == 1) {
      this.sucursal = 0;
    } else {
      this.sucursal = parseInt(localStorage.getItem('sede'));
    }
    this.search();
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
    this.getRegisteredClaims(data);
    this.getResolvedClaims(data);
    this.getPendingClaims(data);
    this.getOthersClaims(data);
    this.getReceptionModeClaims(data);
    this.getClaimsTimepoDestiempo(data);
    this.getClaimsMeses(data);
    this.getClaimsEstado(data);
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
  getRegisteredClaims(data) {
    this.apiService.getRegisteredClaimsService(data).then((response: any) => {
      this.listclaims = response.data.length > 0 ? response.data : [];
    })
  }
  getResolvedClaims(data) {
    this.apiService.getResolvedClaimsService(data).then((response: any) => {
      this.resolved = response.data.length > 0 ? response.data : [];
    })
  }
  getPendingClaims(data) {
    this.apiService.getPendingClaimsService(data).then((response: any) => {
      this.pending = response.data.length > 0 ? response.data : [];
    })
  }
  getOthersClaims(data) {
    this.apiService.getOthersClaimsService(data).then((response: any) => {
      this.listOthers = response.data.length > 0 ? response.data : [];
    })
  }
  getReceptionModeClaims(data) {
    this.isLoading = true;
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.apiService.getReceptionModeClaimsService(data).then((response: any) => {
      this.receptions = response.data.length > 0 ? response.data : [];
      this.isLoading = false;
      for (var i = 0; i < this.receptions.length; i++) {
        this.pieChartLabels.push(this.receptions[i].nombre)
        this.pieChartData.push(this.receptions[i].total);
      }



    })
  }
  getClaimsMeses(data) {
    this.isLoading2 = true;
    this.barChartLabels = [];
    var datos = []
    this.apiService.getSateClaimsMesesService(data).then((response: any) => {
      this.listMes = response.data.length > 0 ? response.data : [];
      this.isLoading2 = false;

      for (var i = 0; i < this.listMes.length; i++) {
        this.barChartLabels.push(this.listMes[i].mes)
        // this.pieChartData.push(this.states[i].total);
        var total = 0;

        for (var a = 0; a < this.listMes[i].rides.length; a++) {
          total += this.listMes[i].rides[a].cantidad


          // this.pieChartData.push(this.states[i].total);
        }

        datos.push(total);
        this.barcharList = datos;

      }
      this.barChartData = [{ data: this.barcharList, label: 'Reclamos Generados' }]

    });
  }
  getClaimsTimepoDestiempo(data) {
    this.isLoading3 = true;
    this.pieChartLabels2 = [];
    this.pieChartData2 = [];
    this.apiService.getClaimsTimepoDestiempoService(data).then((response: any) => {
      this.listtiempoDestiempo = response.data.length > 0 ? response.data : [];
      this.title = this.listtiempoDestiempo[0].title;
      this.title2 = this.listtiempoDestiempo[2].title;
      this.cantidad = this.listtiempoDestiempo[1].total
      this.cantidad2 = this.listtiempoDestiempo[3].total;


      console.log(this.listtiempoDestiempo2)
      this.isLoading3 = false;
      for (var i = 0; i < this.listtiempoDestiempo.length; i++) {
        if (this.listtiempoDestiempo[i].title != undefined) {
          this.pieChartLabels2.push(this.listtiempoDestiempo[i].title);

        }
        if (this.listtiempoDestiempo[i].total != undefined) {
          this.pieChartData2.push(this.listtiempoDestiempo[i].total);

        }

      }
    });
  }

  getClaimsEstado(data) {
    this.isLoading4 = true;
    this.pieChartLabels3 = [];
    this.pieChartData3 = [];
    this.apiService.getClaimsEstadoService(data).then((response: any) => {
      this.liststate = response.data.length > 0 ? response.data : [];
      this.isLoading4 = false;
      for (var i = 0; i < this.liststate.length; i++) {
        this.pieChartLabels3.push(this.liststate[i].nombre)
        this.pieChartData3.push(this.liststate[i].total);
      }
    });
  }
  /*   // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    } */
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

  getPorcentaje(dato) {
    return ((dato * 100) / this.listclaims[0]?.reclamos_registrados).toFixed(2) + '%';
  }

  getCantidadPorMes(datos) {
    var valor = 0;
    for (var a = 0; a < datos.rides.length; a++) {
      valor += datos.rides[a].cantidad
      // this.pieChartData.push(this.states[i].total);
    }
    return valor;
  }
  getValorAtiempo(datas) {
    return ((datas * 100) / this.resolved[0]?.reclamos_resultos).toFixed(2) + '%';



  }
  /*   public randomize(): void {
      // Only Change 3 values
      const data = [
        Math.round(Math.random() * 100),
        59,
        80,
        (Math.random() * 100),
        56,
        (Math.random() * 100),
        40];
      this.barChartData[0].data = data;
    } */
}

