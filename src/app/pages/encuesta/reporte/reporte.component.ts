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

  /* public _ACmuymalo: any = [];
  public _ACmaloo: any = [];
  public _ACregular: any = [];
  public _ACbuenoo: any = [];
  public _ACmuybueno: any = [];
  public _ACna: any = []; */



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
     this.formularioService.getFormulario().subscribe(
      (res: any) => {
     this.data = res.body;
     this.data.map((item: { SA_admision: any; }) => {
      let dato = item.SA_admision;
      switch(dato){
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
      switch(dato){
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

    this.data.map((item: { SA_atencionCliente: any; }) => {
      let dato = item.SA_atencionCliente;
      switch(dato){
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
   
 
     
 
     
      })
  }
  getrecomendacion(): void {
    this.pieChartLabels3 = [];
    this.pieChartData3 = [];

    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        this.recomen = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '10');
        this.cantrecom = this.recomen.length;
        this.arrescala = this.recomen[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen2 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '9');
        this.cantrecom = this.recomen2.length;
        this.arrescala = this.recomen2[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen3 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '8')
        this.cantrecom = this.recomen3.length;
        this.arrescala = this.recomen3[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen4 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '7')
        this.cantrecom = this.recomen4.length;
        this.arrescala = this.recomen4[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen5 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '6')
        this.cantrecom = this.recomen5.length;
        this.arrescala = this.recomen5[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen6 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '5')
        this.cantrecom = this.recomen6.length;
        this.arrescala = this.recomen6[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen7 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '4')
        this.cantrecom = this.recomen7.length;
        this.arrescala = this.recomen7[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen8 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '3')
        this.cantrecom = this.recomen8.length;
        this.arrescala = this.recomen8[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);


        this.recomen9 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '2')
        this.cantrecom = this.recomen9.length;
        this.arrescala = this.recomen9[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);

        this.recomen10 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '1')
        this.cantrecom = this.recomen10.length;
        this.arrescala = this.recomen10[0].escalaRecomendacion;
        this.pieChartData3.push(this.cantrecom);
        this.pieChartLabels3.push(this.arrescala);        
      })
  }
  getporcentaje(dato: number) {
    return ((dato * 100) / this.listencuesta).toFixed(2) + '%';
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
    }else if (id == 5) {
      if (position == 1) {
        this.isPosition5 = true;
      } else {
        this.isPosition5 = false;
      }
    }else if (id == 6) {
      if (position == 1) {
        this.isPosition6 = true;
      } else {
        this.isPosition6 = false;
      }
    }
  }
}



