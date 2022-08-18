import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../formulario.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ValueCache } from 'ag-grid-community';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  data: any = [];
  char: any = [];
  public listencuesta: any = [];
  public listlima: any = [];
  public listchorrillos: any = [];
  public listsurco: any = [];
  public modalima: any = [];
  public escalalima: any = [];
  public satisfaccionlima: any = [];
  public listemergencia: any = [];
  public listhospita: any = [];
  public listconsultorio: any = [];
  public listpaciente: any = [];
  public plansalud: any = [];
  public institucional: any = [];
  public convenio: any = [];
  public compania: any = [];
  public madrenino: any = [];
  public otross: any = [];

  public listadmi: any = [];
  public arrmoda: any = [];
  public arrsucursal: any = [];
  public cantsucursal: any = [];
  public recomen: any = [];
  public recomen2: any = [];
  public recomen3: any = [];
  public recomen4: any = [];
  public recomen5: any = [];
  public recomen6: any = [];
  public recomen7: any = [];
  public recomen8: any = [];
  public recomen9: any = [];
  public recomen10: any = [];
  public escalatotal: any = [];
  public satistotal: any = [];
  arrescala: any = [];
  cantrecom: any = [];
  arrLima: any = [];

  //Escala de Satisfaccion
  public muymalo: any = [];
  public maloo: any = [];
  public regular: any = [];
  public buenoo: any = [];
  public muybueno: any = [];
  public na: any = [];

  public _ACmuymalo: any = [];
  public _ACmaloo: any = [];
  public _ACregular: any = [];
  public _ACbuenoo: any = [];
  public _ACmuybueno: any = [];
  public _ACna: any = [];

  public _COmuymalo: any = [];
  public _COmaloo: any = [];
  public _COregular: any = [];
  public _CObuenoo: any = [];
  public _COmuybueno: any = [];
  public _COna: any = [];

  public _FAmuymalo: any = [];
  public _FAmaloo: any = [];
  public _FAregular: any = [];
  public _FAbuenoo: any = [];
  public _FAmuybueno: any = [];
  public _FAna: any = [];

  public _IMmuymalo: any = [];
  public _IMmaloo: any = [];
  public _IMregular: any = [];
  public _IMbuenoo: any = [];
  public _IMmuybueno: any = [];
  public _IMna: any = [];

  public _LAmuymalo: any = [];
  public _LAmaloo: any = [];
  public _LAregular: any = [];
  public _LAbuenoo: any = [];
  public _LAmuybueno: any = [];
  public _LAna: any = [];

  public _COMmuymalo: any = [];
  public _COMmaloo: any = [];
  public _COMregular: any = [];
  public _COMbuenoo: any = [];
  public _COMmuybueno: any = [];
  public _COMna: any = [];

  public _LIMmuymalo: any = [];
  public _LIMmaloo: any = [];
  public _LIMregular: any = [];
  public _LIMbuenoo: any = [];
  public _LIMmuybueno: any = [];
  public _LIMna: any = [];

  public _MOmuymalo: any = [];
  public _MOmaloo: any = [];
  public _MOregular: any = [];
  public _MObuenoo: any = [];
  public _MOmuybueno: any = [];
  public _MOna: any = [];

  public _DOCmuymalo: any = [];
  public _DOCmaloo: any = [];
  public _DOCregular: any = [];
  public _DOCbuenoo: any = [];
  public _DOCmuybueno: any = [];
  public _DOCna: any = [];

  public _ENmuymalo: any = [];
  public _ENmaloo: any = [];
  public _ENregular: any = [];
  public _ENbuenoo: any = [];
  public _ENmuybueno: any = [];
  public _ENna: any = [];

  public _TECmuymalo: any = [];
  public _TECmaloo: any = [];
  public _TECregular: any = [];
  public _TECbuenoo: any = [];
  public _TECmuybueno: any = [];
  public _TECna: any = [];



  public barcharList: any = [];
  public TIPO_RECLAMO: string = "";
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
  isPosition5 = true;
  isPosition6 = true;

  model: NgbDateStruct;
  //CANVAS

  /* barChartOptions: ChartOptions = {
    responsive: true,    
    scales: {
      yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }]
    }
  };    
  chartData: ChartDataSets[] = [   
  ]; */

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'start',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [

  ];


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
            var percentage = ((value * 100) / this.listencuesta).toFixed(2) + '%';
            // console.log(percentage);
            return percentage;
          } else {
            return percentage;
          }
        },

      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(22,73,126,0.3)', 'rgba(100,22,157,0.3)', 'rgba(159, 24, 0, 0.3)', 'rgba(67,168,128,0.3)']
    }
  ]




  public pieChartOptions2: ChartOptions = {
    responsive: true,

    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            var percentage = ((value * 100) / this.listencuesta).toFixed(2) + '%';
            // console.log(percentage);
            return percentage;
          } else {
            return percentage;
          }
        },

      },

    }
  };
  //RECLAMOS RESUELTOS
  public pieChartLabels2: Label[] = [];
  public pieChartData2 = [];
  public pieChartType2: ChartType = "doughnut";
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [pluginDataLabels];
  public pieChartColors2 = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)'],

    },

  ];
  //TARJETA
  public pieChartOptions22: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            var percentage = ((value * 100) / this.listencuesta).toFixed(2) + '%';
            // console.log(percentage);
            return percentage;
          } else {
            return percentage;
          }
        },
        align: "start",

      },

    }
  };
  public pieChartLabels22: Label[] = [];
  public pieChartData22 = [];
  public pieChartType22: ChartType = "bar";
  public pieChartLegend22 = true;
  public pieChartPlugins22 = [pluginDataLabels];
  public pieChartColors22 = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)'],

    },

  ];
  //CONVENIO
  public pieChartOptions23: ChartOptions = {
    responsive: true,

    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{}]
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            var percentage = ((value * 100) / this.listencuesta).toFixed(2) + '%';
            // console.log(percentage);
            return percentage;
          } else {
            return percentage;
          }
        },
        align: "end",

      },

    }
  };
  public pieChartLabels23: Label[] = [];
  public pieChartData23 = [];
  public pieChartType23: ChartType = "horizontalBar";
  public pieChartLegend23 = true;
  public pieChartPlugins23 = [pluginDataLabels];
  public pieChartColors23 = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)'],

    },

  ];

  public pieChartOptions24: ChartOptions = {
    responsive: true,
    
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            var percentage = ((value * 100) / this.listencuesta).toFixed(2) + '%';
            // console.log(percentage);
            return percentage;
          } else {
            return percentage;
          }
        },
        align: "end",

      },

    }
  };
  public pieChartLabels24: Label[] = [];
  public pieChartData24 = [];
  public pieChartType24: ChartType = "doughnut";
  public pieChartLegend24 = true;
  public pieChartPlugins24 = [pluginDataLabels];
  public pieChartColors24 = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)'],

    },

  ];

  public pieChartOptions3: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            var percentage = ((value * 100) / this.escalatotal.length).toFixed(2) + '%';
            //console.log(percentage);
            return percentage;
          } else {
            return percentage;
          }
        },

      },

    }
  };
  //horizontalBar
  //RECLAMOS RESUELTOS
  public pieChartLabels3: Label[] = [];
  public pieChartData3 = [];
  public pieChartType3: ChartType = "horizontalBar";
  public pieChartLegend3 = true;
  public pieChartPlugins3 = [pluginDataLabels];
  public pieChartColors3 = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(20,0,80,0.3)', 'rgba(0,20,230,0.3)', 'rgba(50,0,25,0.3)'],

    },

  ];

  public pieChartOptions4: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            var percentage = ((value * 100) / this.satistotal.length).toFixed(2) + '%';
            //console.log(percentage);
            return percentage;
          } else {
            return percentage;
          }
        },

      },

    }
  };
  //horizontalBar
  //RECLAMOS RESUELTOS
  public pieChartLabels4: Label[] = [];
  public pieChartData4 = [];
  public pieChartType4: ChartType = "bar";
  public pieChartLegend4 = true;
  public pieChartPlugins4 = [pluginDataLabels];
  public pieChartColors4 = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(20,0,80,0.3)', 'rgba(0,20,230,0.3)', 'rgba(50,0,25,0.3)'],

    },

  ];

  sucursal: number;

  //public title: string = ""
  public title2: string = ""
  public cantidad: number = 0;
  public cantidad2: number = 0;
  public cantmoda: number = 0;
  //public cantrecom: number = 0;
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
    if (parseInt(localStorage.getItem('idrol')) == 1) {
      this.sucursal = 0;
    } else {
      this.sucursal = parseInt(localStorage.getItem('sede'));
    }
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.listencuesta = res.body.length;
        console.log(res.body)
        this.escalatotal = res.body.map((item: { escalaRecomendacion: any; }) => {
          let dato = item.escalaRecomendacion;
          return dato;
        });
        console.log(44, this.escalatotal)
        let sum = [];
        res.body.map((item: { SA_admision: any; }) => {
          let dato = item.SA_admision;
          sum += dato;
        });
        res.body.map((item: { SA_atencionCliente: any; }) => {
          let dato = item.SA_atencionCliente;
          sum += dato;
        });
        res.body.map((item: { SA_convenios: any; }) => {
          let dato = item.SA_convenios;
          sum += dato;
        });
        res.body.map((item: { SA_farmacia: any; }) => {
          let dato = item.SA_farmacia;
          sum += dato;
        });
        res.body.map((item: { SA_imagenes: any; }) => {
          let dato = item.SA_imagenes;
          sum += dato;
        });
        res.body.map((item: { SA_laboratorio: any; }) => {
          let dato = item.SA_laboratorio;
          sum += dato;
        });
        res.body.map((item: { SI_comodidad: any; }) => {
          let dato = item.SI_comodidad;
          sum += dato;
        });
        res.body.map((item: { SI_limpieza: any; }) => {
          let dato = item.SI_limpieza;
          sum += dato;
        });
        res.body.map((item: { SI_modernidad: any; }) => {
          let dato = item.SI_modernidad;
          sum += dato;
        });
        res.body.map((item: { SS_doctor: any; }) => {
          let dato = item.SS_doctor;
          sum += dato;
        });
        res.body.map((item: { SS_enfermera: any; }) => {
          let dato = item.SS_enfermera;
          sum += dato;
        });
        res.body.map((item: { SS_tecnica: any; }) => {
          let dato = item.SS_tecnica;
          sum += dato;
        });
        this.satistotal = sum;

        console.log(24, this.satistotal.length);

      })
    this.getTipoPaciente();
    this.getModalidad();
    this.getSucursal();
    this.getrecomendacion();
    this.getsatisfaccion();
    this.getTarjetaClasica();
    this.getConvenio();
    this.getCompañia();
  };

  getSucursal() {
    //this.isLoading = true;
    this.barChartLabels = [];
    this.barChartData = [];
    let dato = []
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal == 'Lima');
        this.arrsucursal = this.listlima[0].sucursal;
        dato.push(this.listlima.length);
        this.cantsucursal = dato;
        this.barChartData = [{ data: this.cantsucursal, label: 'Lima' }]
        this.barChartLabels.push(this.listlima[0].sucursal);
        console.log(223, this.barChartLabels)
        console.log(222, this.barChartData)

        this.listchorrillos = this.data.filter((sede: { sucursal: string; }) => sede.sucursal == 'Chorrillos');
        this.arrsucursal = this.listchorrillos[0].sucursal;
        dato.push(this.listchorrillos.length);
        this.cantsucursal = dato;
        this.barChartData = [{ data: this.cantsucursal, label: 'Chorrillos' }]
        this.barChartLabels.push(this.listchorrillos[0].sucursal);

        this.listsurco = this.data.filter((sede: { sucursal: string; }) => sede.sucursal == 'Surco');
        this.arrsucursal = this.listsurco[0].sucursal;
        dato.push(this.listsurco.length);
        this.cantsucursal = dato;
        this.barChartData = [{ data: this.cantsucursal, label: 'Surco' }]
        this.barChartLabels.push(this.listsurco[0].sucursal);
      }
    )
  }
  getModalidad() {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        this.listemergencia = this.data.filter((item: { modalidad: string }) => item.modalidad === 'Emergencia');
        this.arrmoda = this.listemergencia[0].modalidad;
        this.cantmoda = this.listemergencia.length;
        this.pieChartLabels.push(this.arrmoda);
        this.pieChartData.push(this.cantmoda)
        console.log(223, this.pieChartLabels)
        console.log(222, this.pieChartData)

        this.listconsultorio = this.data.filter((item: { modalidad: string }) => item.modalidad === 'Consultorio Externo');
        this.arrmoda = this.listconsultorio[0].modalidad;
        this.cantmoda = this.listconsultorio.length;
        this.pieChartLabels.push(this.arrmoda);
        this.pieChartData.push(this.cantmoda)
        console.log(223, this.pieChartLabels)
        console.log(222, this.pieChartData)

        this.listhospita = this.data.filter((item: { modalidad: string }) => item.modalidad === 'Hospitalización');
        this.arrmoda = this.listhospita[0].modalidad;
        this.cantmoda = this.listhospita.length;
        this.pieChartLabels.push(this.arrmoda);
        this.pieChartData.push(this.cantmoda)
        console.log(223, this.pieChartLabels)
        console.log(222, this.pieChartData)

      })

  }

  sumtipopaciente = [];
  getTipoPaciente() {
    this.pieChartLabels2 = [];
    this.pieChartData2 = [];
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        this.plansalud = this.data.filter((item: { paciente: string; }) => item.paciente === 'Plan Salud');
        this.arrLima = this.plansalud[0].paciente;
        this.cantidad = this.plansalud.length
        this.pieChartLabels2.push(this.arrLima);
        this.pieChartData2.push(this.cantidad);
        console.log(111, this.arrLima)


        this.institucional = this.data.filter((item: { paciente: string; }) => item.paciente === 'Institucional');
        this.arrLima = this.institucional[0].paciente;
        this.cantidad = this.institucional.length;
        this.pieChartLabels2.push(this.arrLima);
        this.pieChartData2.push(this.cantidad);

        this.convenio = this.data.filter((item: { paciente: string; }) => item.paciente === 'Convenios');
        this.arrLima = this.convenio[0].paciente;
        this.cantidad = this.convenio.length;
        this.pieChartLabels2.push(this.arrLima);
        this.pieChartData2.push(this.cantidad);

        this.compania = this.data.filter((item: { paciente: string; }) => item.paciente === 'Compañia Seguro');
        this.arrLima = this.compania[0].paciente;
        this.cantidad = this.compania.length;
        this.pieChartLabels2.push(this.arrLima);
        this.pieChartData2.push(this.cantidad);

        this.madrenino = this.data.filter((item: { paciente: string; }) => item.paciente === 'Madre Niño');
        this.arrLima = this.madrenino[0].paciente;
        this.cantidad = this.madrenino.length;
        this.pieChartLabels2.push(this.arrLima);
        this.pieChartData2.push(this.cantidad);

        this.otross = this.data.filter((item: { paciente: string; }) => item.paciente === 'Otros');
        this.arrLima = this.otross[0].paciente;
        this.cantidad = this.otross.length;
        this.pieChartLabels2.push(this.arrLima);
        this.pieChartData2.push(this.cantidad);

        this.sumtipopaciente = this.plansalud.length + this.institucional.length + this.convenio.length
          + this.compania.length + this.madrenino.length + this.otross.length;
        console.log(66, this.sumtipopaciente)
      })
  }
  clasica = [];
  dorada = [];
  diamante = [];
  arrpaciente = [];
  arrcantpa = 0;
  sumtarjeta = [];
  getTarjetaClasica() {
    this.pieChartLabels22 = [];
    this.pieChartData22 = [];
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        //TARJETA CLASICA
        this.clasica = this.data.filter((item: { tipoPaciente: string; }) => item.tipoPaciente === 'Tarjeta CLASICA');
        console.log(65, this.clasica)
        this.arrpaciente = this.clasica[0].tipoPaciente;
        this.arrcantpa = this.clasica.length;
        console.log(67, this.arrpaciente)
        this.pieChartLabels22.push(this.arrpaciente);
        this.pieChartData22.push(this.arrcantpa);
        //TARJETA DORADA
        this.dorada = this.data.filter((item: { tipoPaciente: string; }) => item.tipoPaciente === 'Tarjeta DORADA');
        this.arrpaciente = this.dorada[0].tipoPaciente;
        this.arrcantpa = this.dorada.length;
        this.pieChartLabels22.push(this.arrpaciente);
        this.pieChartData22.push(this.arrcantpa);
        //TARJETA DIAMANTE
        this.diamante = this.data.filter((item: { tipoPaciente: string; }) => item.tipoPaciente === 'Tarjeta DIAMANTE');
        this.arrpaciente = this.diamante[0].tipoPaciente;
        this.arrcantpa = this.diamante.length;
        this.pieChartLabels22.push(this.arrpaciente);
        this.pieChartData22.push(this.arrcantpa);
      });
  }
  saludpol = [];
  fopasef = [];
  sedapal = [];
  petroperu = [];
  crecer = [];
  cmp = [];
  bcrp = [];
  otrocon = [];
  arrconvenio = [];
  arrcantco = 0;
  sumconvenio = [];
  getConvenio() {
    this.pieChartLabels23 = [];
    this.pieChartData23 = [];
    
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        //SALUDPOL
        this.saludpol = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'SALUDPOL');
        console.log(65, this.saludpol)
        this.arrconvenio = this.saludpol[0].tipoConvenio;        
        this.arrcantco = this.saludpol.length;
        console.log(68, this.arrconvenio)
        console.log(69, this.arrcantco)
        this.pieChartLabels23.push(this.arrconvenio);
        this.pieChartData23.push(this.arrcantco);
        
        
        //FOPASEF
        this.fopasef = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'FOPASEF');
        this.arrconvenio = this.fopasef[0].tipoConvenio;
        this.arrcantco = this.fopasef.length;
        this.pieChartLabels23.push(this.arrconvenio);
        this.pieChartData23.push(this.arrcantco);
        //SEDAPAL
        this.sedapal = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'SEDAPAL');
        this.arrconvenio = this.sedapal[0].tipoConvenio;
        this.arrcantco = this.sedapal.length;
        this.pieChartLabels23.push(this.arrconvenio);
        this.pieChartData23.push(this.arrcantco);
        
        //PETROPERU
        this.petroperu = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'PETROPERU');
        this.arrconvenio = this.petroperu[0].tipoConvenio;
        this.arrcantco = this.petroperu.length;
        this.pieChartLabels23.push(this.arrconvenio);
        this.pieChartData23.push(this.arrcantco);
        
        //CRECER
        this.crecer = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'CRECER');
        this.arrconvenio = this.crecer[0].tipoConvenio;
        this.arrcantco = this.crecer.length;
        this.pieChartLabels23.push(this.arrconvenio);
        this.pieChartData23.push(this.arrcantco);
       
        //CMP
        this.cmp = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'CMP');
        this.arrconvenio = this.cmp[0].tipoConvenio;
        this.arrcantco = this.cmp.length;
        this.pieChartLabels23.push(this.arrconvenio);
        this.pieChartData23.push(this.arrcantco);
        
        //BCRP
        this.bcrp = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'BCRP');
        this.arrconvenio = this.bcrp[0].tipoConvenio;
        this.arrcantco = this.bcrp.length;
        this.pieChartLabels23.push(this.arrconvenio);
        this.pieChartData23.push(this.arrcantco);
        
        //OTROS
        this.otrocon = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'OTROS');
        this.arrconvenio = this.otrocon[0].tipoConvenio;
        this.arrcantco = this.otrocon.length;
        this.pieChartLabels23.push(this.arrconvenio);
        this.pieChartData23.push(this.arrcantco);
        

        
      })
  }
  rimac = [];
  pacifico = [];
  positiva = [];
  mapfre = [];
  sanitas = [];
  interseguro = [];
  otrocomp = [];   
  arrcompañia = [];
  arrcantcomp = 0;
  getCompañia() {
    this.pieChartLabels24 = [];
    this.pieChartData24 = [];
    
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        //SALUDPOL
        this.rimac = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'RIMAC');
        console.log(70,this.rimac)
        this.arrcompañia = this.rimac[0].tipoSeguro;
        console.log(701,this.arrcompañia)        
        this.arrcantcomp = this.rimac.length;        
        this.pieChartLabels24.push(this.arrcompañia);
        this.pieChartData24.push(this.arrcantcomp);

        this.pacifico = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'PACIFICO');
        console.log(71,this.pacifico)
        this.arrcompañia = this.pacifico[0].tipoSeguro;              
        this.arrcantcomp = this.pacifico.length;        
        this.pieChartLabels24.push(this.arrcompañia);
        this.pieChartData24.push(this.arrcantcomp);

        this.positiva = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'LA POSITIVA');
        console.log(72,this.positiva)
        this.arrcompañia = this.positiva[0].tipoSeguro;        
        this.arrcantcomp = this.positiva.length;        
        this.pieChartLabels24.push(this.arrcompañia);
        this.pieChartData24.push(this.arrcantcomp);

        this.mapfre = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'MAPFRE');
        console.log(73,this.mapfre)
        this.arrcompañia = this.mapfre[0].tipoSeguro;        
        this.arrcantcomp = this.mapfre.length;        
        this.pieChartLabels24.push(this.arrcompañia);
        this.pieChartData24.push(this.arrcantcomp);
        
        this.sanitas = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'SANITAS');
        console.log(74,this.sanitas)
        this.arrcompañia = this.sanitas[0].tipoSeguro;        
        this.arrcantcomp = this.sanitas.length;        
        this.pieChartLabels24.push(this.arrcompañia);
        this.pieChartData24.push(this.arrcantcomp);

        this.interseguro = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'INTERSEGURO');
        console.log(75,this.interseguro)
        this.arrcompañia = this.interseguro[0].tipoSeguro;        
        this.arrcantcomp = this.interseguro.length;        
        this.pieChartLabels24.push(this.arrcompañia);
        this.pieChartData24.push(this.arrcantcomp);

        this.otrocomp = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'OTROS');
        console.log(76,this.otrocomp)
        this.arrcompañia = this.otrocomp[0].tipoSeguro;        
        this.arrcantcomp = this.otrocomp.length;        
        this.pieChartLabels24.push(this.arrcompañia);
        this.pieChartData24.push(this.arrcantcomp);
        
      })
  }
  getsatisfaccion() {
    let sumMuymalo = [];
    let sumMalo = [];
    let sumRegular = [];
    let sumBueno = [];
    let sumMuybueno = [];
    let sumNa = [];
    let ateMuymalo = [];
    let ateMalo = [];
    let ateRegular = [];
    let ateBueno = [];
    let ateMuybueno = [];
    let ateNa = [];
    let coMuymalo = [];
    let coMalo = [];
    let coRegular = [];
    let coBueno = [];
    let coMuybueno = [];
    let coNa = [];
    let faMuymalo = [];
    let faMalo = [];
    let faRegular = [];
    let faBueno = [];
    let faMuybueno = [];
    let faNa = [];
    let imMuymalo = [];
    let imMalo = [];
    let imRegular = [];
    let imBueno = [];
    let imMuybueno = [];
    let imNa = [];
    let laMuymalo = [];
    let laMalo = [];
    let laRegular = [];
    let laBueno = [];
    let laMuybueno = [];
    let laNa = [];
    let comMuymalo = [];
    let comMalo = [];
    let comRegular = [];
    let comBueno = [];
    let comMuybueno = [];
    let comNa = [];
    let liMuymalo = [];
    let liMalo = [];
    let liRegular = [];
    let liBueno = [];
    let liMuybueno = [];
    let liNa = [];
    let moMuymalo = [];
    let moMalo = [];
    let moRegular = [];
    let moBueno = [];
    let moMuybueno = [];
    let moNa = [];
    let docMuymalo = [];
    let docMalo = [];
    let docRegular = [];
    let docBueno = [];
    let docMuybueno = [];
    let docNa = [];
    let enMuymalo = [];
    let enMalo = [];
    let enRegular = [];
    let enBueno = [];
    let enMuybueno = [];
    let enNa = [];
    let tecMuymalo = [];
    let tecMalo = [];
    let tecRegular = [];
    let tecBueno = [];
    let tecMuybueno = [];
    let tecNa = [];
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body;
        this.data.map((item: { SA_admision: any; }) => {
          let dato = item.SA_admision;
          switch (dato) {
            case '1': sumMuymalo += dato; break;
            case '2': sumMalo += dato; break;
            case '3': sumRegular += dato; break;
            case '4': sumBueno += dato; break;
            case '5': sumMuybueno += dato; break;
            default: sumNa += dato;
          }
          this.muybueno = sumMuybueno;
          this.buenoo = sumBueno;
          this.regular = sumRegular;
          this.maloo = sumMalo;
          this.muymalo = sumMuymalo;
          this.na = sumNa;


        });
        this.data.map((item: { SA_atencionCliente: any; }) => {
          let dato = item.SA_atencionCliente;
          switch (dato) {
            case '1': ateMuymalo += dato; break;
            case '2': ateMalo += dato; break;
            case '3': ateRegular += dato; break;
            case '4': ateBueno += dato; break;
            case '5': ateMuybueno += dato; break;
            default: ateNa += dato;
          }
          this._ACmuybueno = ateMuybueno;
          this._ACbuenoo = ateBueno;
          this._ACregular = ateRegular;
          this._ACmaloo = ateMalo;
          this._ACmuymalo = ateMuymalo;
          this._ACna = ateNa;


        });

        this.data.map((item: { SA_convenios: any; }) => {
          let dato = item.SA_convenios;
          switch (dato) {
            case '1': coMuymalo += dato; break;
            case '2': coMalo += dato; break;
            case '3': coRegular += dato; break;
            case '4': coBueno += dato; break;
            case '5': coMuybueno += dato; break;
            default: coNa += dato;
          }
          this._COmuybueno = coMuybueno;
          this._CObuenoo = coBueno;
          this._COregular = coRegular;
          this._COmaloo = coMalo;
          this._COmuymalo = coMuymalo;
          this._COna = coNa;


        });

        this.data.map((item: { SA_farmacia: any; }) => {
          let dato = item.SA_farmacia;
          switch (dato) {
            case '1': faMuymalo += dato; break;
            case '2': faMalo += dato; break;
            case '3': faRegular += dato; break;
            case '4': faBueno += dato; break;
            case '5': faMuybueno += dato; break;
            default: faNa += dato;
          }
          this._FAmuybueno = faMuybueno;
          this._FAbuenoo = faBueno;
          this._FAregular = faRegular;
          this._FAmaloo = faMalo;
          this._FAmuymalo = faMuymalo;
          this._FAna = faNa;


        });

        this.data.map((item: { SA_imagenes: any; }) => {
          let dato = item.SA_imagenes;
          switch (dato) {
            case '1': imMuymalo += dato; break;
            case '2': imMalo += dato; break;
            case '3': imRegular += dato; break;
            case '4': imBueno += dato; break;
            case '5': imMuybueno += dato; break;
            default: imNa += dato;
          }
          this._IMmuybueno = imMuybueno;
          this._IMbuenoo = imBueno;
          this._IMregular = imRegular;
          this._IMmaloo = imMalo;
          this._IMmuymalo = imMuymalo;
          this._IMna = imNa;


        });

        this.data.map((item: { SA_laboratorio: any; }) => {
          let dato = item.SA_laboratorio;
          switch (dato) {
            case '1': laMuymalo += dato; break;
            case '2': laMalo += dato; break;
            case '3': laRegular += dato; break;
            case '4': laBueno += dato; break;
            case '5': laMuybueno += dato; break;
            default: laNa += dato;
          }
          this._LAmuybueno = laMuybueno;
          this._LAbuenoo = laBueno;
          this._LAregular = laRegular;
          this._LAmaloo = laMalo;
          this._LAmuymalo = laMuymalo;
          this._LAna = laNa;


        });

        this.data.map((item: { SI_comodidad: any; }) => {
          let dato = item.SI_comodidad;
          switch (dato) {
            case '1': comMuymalo += dato; break;
            case '2': comMalo += dato; break;
            case '3': comRegular += dato; break;
            case '4': comBueno += dato; break;
            case '5': comMuybueno += dato; break;
            default: comNa += dato;
          }
          this._COMmuybueno = comMuybueno;
          this._COMbuenoo = comBueno;
          this._COMregular = comRegular;
          this._COMmaloo = comMalo;
          this._COMmuymalo = comMuymalo;
          this._COMna = comNa;


        });

        this.data.map((item: { SI_limpieza: any; }) => {
          let dato = item.SI_limpieza;
          switch (dato) {
            case '1': liMuymalo += dato; break;
            case '2': liMalo += dato; break;
            case '3': liRegular += dato; break;
            case '4': liBueno += dato; break;
            case '5': liMuybueno += dato; break;
            default: liNa += dato;
          }
          this._LIMmuybueno = liMuybueno;
          this._LIMbuenoo = liBueno;
          this._LIMregular = liRegular;
          this._LIMmaloo = liMalo;
          this._LIMmuymalo = liMuymalo;
          this._LIMna = liNa;


        });

        this.data.map((item: { SI_modernidad: any; }) => {
          let dato = item.SI_modernidad;
          switch (dato) {
            case '1': moMuymalo += dato; break;
            case '2': moMalo += dato; break;
            case '3': moRegular += dato; break;
            case '4': moBueno += dato; break;
            case '5': moMuybueno += dato; break;
            default: moNa += dato;
          }
          this._MOmuybueno = moMuybueno;
          this._MObuenoo = moBueno;
          this._MOregular = moRegular;
          this._MOmaloo = moMalo;
          this._MOmuymalo = moMuymalo;
          this._MOna = moNa;


        });

        this.data.map((item: { SS_doctor: any; }) => {
          let dato = item.SS_doctor;
          switch (dato) {
            case '1': docMuymalo += dato; break;
            case '2': docMalo += dato; break;
            case '3': docRegular += dato; break;
            case '4': docBueno += dato; break;
            case '5': docMuybueno += dato; break;
            default: docNa += dato;
          }
          this._DOCmuybueno = docMuybueno;
          this._DOCbuenoo = docBueno;
          this._DOCregular = docRegular;
          this._DOCmaloo = docMalo;
          this._DOCmuymalo = docMuymalo;
          this._DOCna = docNa;


        });

        this.data.map((item: { SS_enfermera: any; }) => {
          let dato = item.SS_enfermera;
          switch (dato) {
            case '1': enMuymalo += dato; break;
            case '2': enMalo += dato; break;
            case '3': enRegular += dato; break;
            case '4': enBueno += dato; break;
            case '5': enMuybueno += dato; break;
            default: enNa += dato;
          }
          this._ENmuybueno = enMuybueno;
          this._ENbuenoo = enBueno;
          this._ENregular = enRegular;
          this._ENmaloo = enMalo;
          this._ENmuymalo = enMuymalo;
          this._ENna = enNa;


        });

        this.data.map((item: { SS_tecnica: any; }) => {
          let dato = item.SS_tecnica;
          switch (dato) {
            case '1': tecMuymalo += dato; break;
            case '2': tecMalo += dato; break;
            case '3': tecRegular += dato; break;
            case '4': tecBueno += dato; break;
            case '5': tecMuybueno += dato; break;
            default: tecNa += dato;
          }
          this._TECmuybueno = tecMuybueno;
          this._TECbuenoo = tecBueno;
          this._TECregular = tecRegular;
          this._TECmaloo = tecMalo;
          this._TECmuymalo = tecMuymalo;
          this._TECna = tecNa;


        });



      })
  }
  public datolabel = [];
  public datonum = [];
  public datolabel2 = [];
  public datonum2 = [];
  public datolabel3 = [];
  public datonum3 = [];
  public datolabel4 = [];
  public datonum4 = [];
  public datolabel5 = [];
  public datonum5 = [];
  public datolabel6 = [];
  public datonum6 = [];
  public datolabel7 = [];
  public datonum7 = [];
  public datolabel8 = [];
  public datonum8 = [];
  public datolabel9 = [];
  public datonum9 = [];
  public datolabel10 = [];
  public datonum10 = [];
  getrecomendacion(): void {
    this.pieChartLabels3 = [];
    this.pieChartData3 = [];


    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        this.recomen = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '10');
        this.cantrecom = this.recomen.length;
        console.log(55, this.recomen)
        this.arrescala = this.recomen[0].escalaRecomendacion;
        this.datolabel = this.arrescala;
        this.datonum = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen2 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '9');
        this.cantrecom = this.recomen2.length;
        this.arrescala = this.recomen2[0].escalaRecomendacion;
        this.datolabel2 = this.arrescala;
        this.datonum2 = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen3 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '8')
        this.cantrecom = this.recomen3.length;
        this.arrescala = this.recomen3[0].escalaRecomendacion;
        this.datolabel3 = this.arrescala;
        this.datonum3 = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen4 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '7')
        this.cantrecom = this.recomen4.length;
        this.arrescala = this.recomen4[0].escalaRecomendacion;
        this.datolabel4 = this.arrescala;
        this.datonum4 = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen5 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '6')
        this.cantrecom = this.recomen5.length;
        this.arrescala = this.recomen5[0].escalaRecomendacion;
        this.datolabel5 = this.arrescala;
        this.datonum5 = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen6 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '5')
        this.cantrecom = this.recomen6.length;
        this.arrescala = this.recomen6[0].escalaRecomendacion;
        this.datolabel6 = this.arrescala;
        this.datonum6 = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen7 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '4')
        this.cantrecom = this.recomen7.length;
        this.arrescala = this.recomen7[0].escalaRecomendacion;
        this.datolabel7 = this.arrescala;
        this.datonum7 = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen8 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '3')
        this.cantrecom = this.recomen8.length;
        this.arrescala = this.recomen8[0].escalaRecomendacion;
        this.datolabel8 = this.arrescala;
        this.datonum8 = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen9 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '2')
        this.cantrecom = this.recomen9.length;
        this.arrescala = this.recomen9[0].escalaRecomendacion;
        this.datolabel9 = this.arrescala;
        this.datonum9 = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);

        this.recomen10 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '1')
        this.cantrecom = this.recomen10.length;
        this.arrescala = this.recomen10[0].escalaRecomendacion;
        this.datolabel10 = this.arrescala;
        this.datonum10 = this.cantrecom;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);
      })
  }
  getporcentaje(dato: number) {
    return ((dato * 100) / this.listencuesta).toFixed(2) + '%';
  }
  getporcentajeescala(dato: number) {
    return ((dato * 100) / this.escalatotal.length).toFixed(2) + '%';
  }
  getporcentajesati(dato: number) {
    return ((dato * 100) / this.satistotal.length).toFixed(2) + '%';
  }
  //SEDE LIMA
  getRegisterSedeLima() {

    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);
        this.data = res.body;
        let Lima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal == 'Lima');
        this.listlima = Lima.length;

        console.log(900, this.listlima);
      }
    )
  }

  getmodalidadLima() {
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);
        // this.listencuesta = res.data.body[0].length > 0 ? res.data.body : []; 
        this.data = res.body;

        this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Lima')
        for (var i = 0; i < this.listlima.length; i++) {
          //this.tipopacientelima.push(this.listlima[i].modalidad)
        }
        //console.log(20, this.tipopacientelima);
        //console.log(1000, this.data);
      })
  }
  gettipopacienteLima() {
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);

        this.data = res.body;
        console.log(this.data);

        this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Lima')
        for (var i = 0; i < this.listlima.length; i++) {
          this.modalima.push(this.listlima[i].paciente)
        }
        console.log(10, this.modalima);
        //console.log(1000, this.data);
      })
  }
  getexperienciaLima() {
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);
        this.data = res.body;
        console.log(this.data);
        this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Lima')
        for (var i = 0; i < this.listlima.length; i++) {
          this.satisfaccionlima.push(this.listlima[i].SS_doctor);
          this.satisfaccionlima.push(this.listlima[i].SS_enfermera);
          this.satisfaccionlima.push(this.listlima[i].SS_tecnica);
          this.satisfaccionlima.push(this.listlima[i].SA_farmacia);
          this.satisfaccionlima.push(this.listlima[i].SA_laboratorio);
          this.satisfaccionlima.push(this.listlima[i].SA_imagenes);
          this.satisfaccionlima.push(this.listlima[i].SA_admision);
          this.satisfaccionlima.push(this.listlima[i].SA_convenios);
          this.satisfaccionlima.push(this.listlima[i].SA_atencionCliente);
          this.satisfaccionlima.push(this.listlima[i].SI_limpieza);
          this.satisfaccionlima.push(this.listlima[i].SI_modernidad);
          this.satisfaccionlima.push(this.listlima[i].SI_comodidad);
        }
        console.log(30, this.satisfaccionlima);
        //console.log(1000, this.data);
      })
  }
  getrecomedacionLima() {
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);

        this.data = res.body;
        console.log(this.data);

        this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Lima')
        for (var i = 0; i < this.listlima.length; i++) {
          this.escalalima.push(this.listlima[i].escalaRecomendacion);
        }
        console.log(10, this.escalalima);
        //console.log(1000, this.data);
      })
  }

  //SEDE CHORRILLOS
  getRegisterSedeSurco() {
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);

        this.data = res.body;
        let surco = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Surco');
        this.listsurco = surco.length;
        console.log(1000, this.listsurco);
        //console.log(1000, this.data);
      })
  }
  //SEDE SURCO
  getRegisterSedeChorrillos() {
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);

        this.data = res.body;
        let chorrillos = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Chorrillos');
        this.listchorrillos = chorrillos.length;
        console.log(1100, this.listchorrillos);
        //console.log(this.data);
      })
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

    this.getRegisterSedeLima();
    /* this.getRegisteredClaims(data);
    this.getResolvedClaims(data);
    this.getPendingClaims(data);
    this.getOthersClaims(data);
    this.getReceptionModeClaims(data);
    this.getClaimsTimepoDestiempo(data);
    this.getClaimsMeses(data);
    this.getClaimsEstado(data); */
  }
  onChange(event: { target: { value: string; }; }) {
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


  showTableDasboard(id: number, position: number) {
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
    } else if (id == 5) {
      if (position == 1) {
        this.isPosition5 = true;
      } else {
        this.isPosition5 = false;
      }
    } else if (id == 6) {
      if (position == 1) {
        this.isPosition6 = true;
      } else {
        this.isPosition6 = false;
      }
    }
  }
}



