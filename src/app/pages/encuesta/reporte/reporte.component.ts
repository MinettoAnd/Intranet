import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormularioService } from '../formulario.service';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import { Label } from 'ng2-charts';
// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ValueCache } from 'ag-grid-community';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  myDateValue:Date;
  private baseChart: ElementRef;
  isPosition1 = true;
  isPosition2 = true;
  isPosition3 = true;
  isPosition4 = true;
  isPosition5 = true;
  isPosition6 = true;
  public barChartLabels = [];
  public barChartData = [];
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartLabels2 = [];
  public pieChartData2 = [];
  public pieChartLabels22 = [];
  public pieChartData22 = [];

  public pieChartLabels23 = [];
  public pieChartData23 = [];
  public pieChartLabels24 = [];
  public pieChartData24 = [];
  public pieChartLabels3 = [];
  public pieChartData3 = [];
  public pieChartLabels4 = ['Médico', 'Enfermera', 'Técnica', 'Farmacia', 'Laboratorio', 'Imágenes', 'Admisión', 'Convenios', 'Atención al Cliente', 'Aseo y Limpieza', 'Modernidad', 'Comodidad'];
  public pieChartData4 = [];
minDate: any;
maxDate: any;
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      
      // initially setter gets called with undefined
      this.baseChart = content;
      this.getBarChart(this.barChartLabels, this.barChartData, 'chart-1', 'Sucursales', this.totales, 'bar');
      this.getBarChart(this.pieChartLabels, this.pieChartData, 'chart-2', 'Origen de ingreso', this.listencuesta, 'pie');
      this.getBarChart(this.pieChartLabels2, this.pieChartData2, 'chart-3', 'Tipo de paciente', this.listencuesta, 'bar');
      this.getBarChart(this.pieChartLabels22, this.pieChartData22, 'chart-4', 'Plan de salud', this.sumtarjeta, 'pie');
      this.getBarChart(this.pieChartLabels23, this.pieChartData23, 'chart-5', 'Convenio', this.sumconvenio, 'bar');
      this.getBarChart(this.pieChartLabels24, this.pieChartData24, 'chart-6', 'Compañía Seguro', this.companyTotals, 'doughnut');
      this.getBarChart(this.pieChartLabels3, this.pieChartData3, 'chart-8', 'Escala de Recomendación', this.recomendacionTotal, 'doughnut');
    }
  }
  data: any = [];
  char: any = [];
  totales;
  companyTotals;
  satisfaccionTotal;
  recomendacionTotal;
  dataSelect;
  dataMuyBueno: any = [];
  dataBueno: any = [];
  dataRegular: any = [];
  dataMalo: any = [];
  dataMuyMalo: any = [];
  dataNa: any = [];
  totalMedico;
  totalEnfermera;
  totalTecnica;
  totalFarmacia;
  totalLaboratorio;
  totalImagenes;
  totalAdmision;
  totalConvenios;
  totalAtencionCliente;
  totalAseoLimpieza;
  totalModernidad;
  totalComodidad;
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
  public company: any = [];
  public madrenino: any = [];
  public otross: any = [];

  public listadmi: any = [];
  public arrmoda: any = [];
  public arrsucursal: any = [];
  public cantsucursal: any = [];
  public recomen1: any = [];
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
  isRangoFecha = false;



  model: NgbDateStruct;
  //CANVAS

getChart(context, chartType, data, options?) {
  return new Chart(context, {
    data,
    options,
    type: chartType,
    plugins: [ChartDataLabels]
  });
}

getBarChart(barChartLabels, barChartData, chartNum, title, totales, typeChart) {
  const data = {
    labels: barChartLabels,
    datasets: [
      {
        label: title,
        // borderColor: 'rgba(99, 255, 132, 1)',
        borderWidth: 1,
        data: barChartData,
        backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
      }]
  };
  const options = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
    plugins: {
      datalabels: {
        /* anchor puede ser "start", "center" o "end" */
        anchor: 'center',
        /* Podemos modificar el texto a mostrar */
        formatter: (dato) => ((dato * 100) / totales).toFixed(2) + '%',
        // formatter: (dato) => Math.floor((dato / totales) * 100) + '%',
        /* Color del texto */
        color: '#ffffff',
        /* Formato de la fuente */
        font: {
          // family: '"Times New Roman", Times, serif',
          size: '11',
          weight: 'bold',
        },
        /* Formato de la caja contenedora */
        // padding: '4',
        // borderWidth: 2,
        // borderColor: 'darkblue',
        // borderRadius: 8,
        // backgroundColor: 'lightblue'
      }
    }
  };
  return this.getChart(chartNum, typeChart, data, options);
  
}
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
      opselect: ['1'],
      periodo: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      sede: ['0'],
    });
  }


  ngOnInit() {
    this.myDateValue = new Date();
    if (parseInt(localStorage.getItem('idrol')) == 1) {
      this.sucursal = 0;
    } else {
      this.sucursal = parseInt(localStorage.getItem('sede'));
    }
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.listencuesta = 0;
        // console.log(res.body)
        this.escalatotal = res.body.map((item: { escalaRecomendacion: any; }) => {
          let dato = item.escalaRecomendacion;
          return dato;
        });
        // console.log(44, this.escalatotal)
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

        // console.log(24, this.satistotal.length);

      })
      const hoy =  new Date();
      const mesActual = hoy.getMonth() + 1;
      this.ngperiodo = moment(hoy).format("YYYY-MM-DD");
      const data = {
        periodo: this.ngperiodo,
        onSelect: 1,
        fecha_inicio: '',
        fecha_fin: '',
        mes: mesActual,
        sede: 0,
        idrol: parseInt(localStorage.getItem('idrol')),
        empresa: this.TIPO_RECLAMO
      };
    this.getSucursal(data);
    this.getModalidad(data);
    this.getTipoPaciente(data);
    this.getTarjetaClasica(data);
    this.getConvenio(data);
    this.getCompany(data);
    this.getsatisfaccion(data);
    this.getrecomendacion(data);
  };

  getSucursal(data) {
    console.log(data);
    //this.isLoading = true;
    this.barChartLabels = [];
    this.barChartData = [];
    let dato = []

    this.formularioService.getFormulario().subscribe(
      (res: any) => {

        this.data = res.body.length > 0 ? res.body : [];
        // this.listencuesta = res.body;
        if(data.sede === 0){
          // console.log(data.onSelect)
            if(data.onSelect < 3 && data.periodo !== null){

              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Lima' && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);

              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Chorrillos' && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);

              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Surco' && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              console.log(this.listencuesta);

            }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){

              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Lima' && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));

              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Chorrillos' && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));

              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Surco' && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));

              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              console.log(this.listencuesta);

            }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){

              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Lima' && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());

              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Chorrillos' && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());

              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Surco' && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              console.log(this.listencuesta);
            }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){

              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Lima' && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);

              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Chorrillos' && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);

              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => sede.sucursal == 'Surco' && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);

              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              console.log(this.listencuesta);
            }
          if(this.listlima[0] !== undefined ){
            this.arrsucursal = this.listlima[0].sucursal;
            dato.push(this.listlima.length);
            this.cantsucursal = dato;
            this.barChartData = [{ data: this.cantsucursal, label: 'Lima' }]
            this.barChartLabels.push(this.listlima[0].sucursal);
          }
          console.log(this.listlima)
          // console.log(223, this.barChartLabels)
          // console.log(222, this.barChartData)

          if(this.listchorrillos[0] !== undefined ){
            this.arrsucursal = this.listchorrillos[0].sucursal;
            dato.push(this.listchorrillos.length);
            this.cantsucursal = dato;
            this.barChartData = [{ data: this.cantsucursal, label: 'Chorrillos' }]
            this.barChartLabels.push(this.listchorrillos[0].sucursal);
          }
          console.log(this.listchorrillos)

          if(this.listsurco[0] !== undefined ){
            this.arrsucursal = this.listsurco[0].sucursal;
            dato.push(this.listsurco.length);
            this.cantsucursal = dato;
            this.barChartData = [{ data: this.cantsucursal, label: 'Surco' }]
            this.barChartLabels.push(this.listsurco[0].sucursal);
          }
          console.log(this.listsurco)
          this.totales = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
          this.barChartData = dato;
          // console.log(this.barChartData);
          this.getBarChart(this.barChartLabels, this.barChartData, 'chart-1', 'Sucursales',  this.totales, 'bar');
        }
      }
    )
  }
  getModalidad(data) {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];

      if(data.sede === 0){

          if(data.onSelect < 3 && data.periodo !== null){

            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);

            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
    
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listemergencia = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Hospitalización');
              
              this.listencuesta = this.listemergencia.length + this.listconsultorio.length + this.listhospita.length;
              console.log(this.listencuesta);
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){

            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));

            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
    
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listemergencia = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.modalidad === 'Hospitalización');
      
              this.listencuesta = this.listemergencia.length + this.listconsultorio.length + this.listhospita.length;
              console.log(this.listencuesta);
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){

            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());

            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
    
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listemergencia = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Hospitalización');
              
              this.listencuesta = this.listemergencia.length + this.listconsultorio.length + this.listhospita.length;
              console.log(this.listencuesta);
              
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);

            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
    
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) =>(sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);

              this.listemergencia = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { registro_fecha: string; modalidad:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Hospitalización');
      
              this.listencuesta = this.listemergencia.length + this.listconsultorio.length + this.listhospita.length;
              
          }
          
      } else if(data.sede === 1){

          if(data.onSelect < 3 && data.periodo !== null){

            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);

            this.listchorrillos = [];
    
            this.listsurco = [];
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;

              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Emergencia');
              
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Hospitalización');
              
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){

            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));

            this.listchorrillos = [];
    
            this.listsurco = [];
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;

              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.modalidad === 'Emergencia');
              
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.modalidad === 'Hospitalización');
              
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){

            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());

            this.listchorrillos = [];
    
            this.listsurco = [];
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Emergencia');
              
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Hospitalización');
              
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){

            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);

            this.listchorrillos = [];
    
            this.listsurco = [];
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
            console.log(this.listlima);
              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Emergencia');
              
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Hospitalización');
              console.log(this.listemergencia, this.listconsultorio, this.listhospita);
              
          }
      } else if(data.sede === 2){
      
          if(data.onSelect < 3 && data.periodo !== null){
      
            this.listlima = [];

            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
    
            this.listsurco = [];
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;

              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Emergencia');
              
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Hospitalización');
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
      
            this.listlima = [];

            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
    
            this.listsurco = [];
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;

              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.modalidad === 'Hospitalización');
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
      
            this.listlima = [];

            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
    
            this.listsurco = [];
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;

              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Hospitalización');
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
            this.listlima = [];

            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
    
            this.listsurco = [];
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;

              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Hospitalización');
      
          }
      
      } else if(data.sede === 4){
          if(data.onSelect < 3 && data.periodo !== null){
      
            this.listlima = [];

            this.listchorrillos = [];
    
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;

              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Emergencia');
              
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.modalidad === 'Hospitalización');
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){

              this.listlima = [];

              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listsurco = [];
              
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.modalidad === 'Hospitalización');
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){

            this.listlima = [];

            this.listchorrillos = [];
    
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.modalidad === 'Hospitalización');
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){

            this.listlima = [];

            this.listchorrillos = [];
    
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
            
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.listemergencia = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Emergencia');
      
              this.listconsultorio = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Consultorio Externo');
      
              this.listhospita = this.data.filter((sede: { sucursal: string; registro_fecha: string; modalidad:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.modalidad === 'Hospitalización');
      
          }
      }     

        // console.log(this.data);
        // this.listemergencia = this.data.filter((item: { modalidad: string }) => item.modalidad === 'Emergencia');
        if(this.listemergencia[0] !== undefined ){
          this.arrmoda = this.listemergencia[0].modalidad;
          this.cantmoda = this.listemergencia.length;
          this.pieChartLabels.push(this.arrmoda);
          this.pieChartData.push(this.cantmoda);
        }
        // console.log(223, this.pieChartLabels)
        // console.log(222, this.pieChartData)

        // this.listconsultorio = this.data.filter((item: { modalidad: string }) => item.modalidad === 'Consultorio Externo');
        if(this.listconsultorio[0] !== undefined ){
          this.arrmoda = this.listconsultorio[0].modalidad;
          this.cantmoda = this.listconsultorio.length;
          this.pieChartLabels.push(this.arrmoda);
          this.pieChartData.push(this.cantmoda);
        }
        // console.log(223, this.pieChartLabels)
        // console.log(222, this.pieChartData)

        // this.listhospita = this.data.filter((item: { modalidad: string }) => item.modalidad === 'Hospitalización');
        if(this.listhospita[0] !== undefined ){
          this.arrmoda = this.listhospita[0].modalidad;
          this.cantmoda = this.listhospita.length;
          this.pieChartLabels.push(this.arrmoda);
          this.pieChartData.push(this.cantmoda);
        }
        // console.log(223, this.pieChartLabels)
        // console.log(222, this.pieChartData)
        this.getBarChart(this.pieChartLabels, this.pieChartData, 'chart-2', 'Plan de salud', this.listencuesta, 'pie');

      })

  }

  sumtipopaciente = [];
  getTipoPaciente(data) {
    this.pieChartLabels2 = [];
    this.pieChartData2 = [];
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        if(data.sede === 0){

          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
            //	Aqui empieza los planes de convenio
            this.plansalud = this.data.filter((sede: { registro_fecha: string; paciente: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { registro_fecha: string; paciente: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { registro_fecha: string; paciente: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { registro_fecha: string; paciente: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { registro_fecha: string; paciente: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Madre Niño');
            
            this.otross = this.data.filter((sede: { registro_fecha: string; paciente: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Otros');
            
            this.listencuesta = this.plansalud.length + this.institucional.length + this.convenio.length + 
                      this.company.length + this.madrenino.length + this.otross.length;
            console.log(this.listencuesta);
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
            
            //			Aqui empieza los planes de convenio
            this.plansalud = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Otros');
        
            this.listencuesta = this.plansalud.length + this.institucional.length + this.convenio.length +
                      this.company.length + this.madrenino.length + this.otross.length;
            console.log(this.listencuesta);
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        //Aqui empiezan los convenios
            this.plansalud = this.data.filter((sede: { registro_fecha: string; paciente:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { registro_fecha: string; paciente:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { registro_fecha: string; paciente:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { registro_fecha: string; paciente:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { registro_fecha: string; paciente:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { registro_fecha: string; paciente:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Otros');
        
            this.listencuesta = this.plansalud.length + this.institucional.length + this.convenio.length +
              this.company.length + this.madrenino.length + this.otross.length;
            console.log(this.listencuesta);
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) =>(sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
            //	Aqui empiezan los convenios
            this.plansalud = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Convenios');
        
            this.company = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { registro_fecha: string; paciente:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Otros');
            
            this.listencuesta = this.plansalud.length + this.institucional.length + this.convenio.length +
              this.company.length + this.madrenino.length + this.otross.length;
        
          }
        
        } else if(data.sede === 1){
        
          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Otros');
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Otros');
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
            //Aqui empiezan los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Otros');
            
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
            console.log(this.listlima);
        //Aqui empiezan los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Otros');
        
          }
        } else if(data.sede === 2){
        
          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Otros');
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Otros');
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Otros');
            
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Convenios');
        
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Otros');
          }
        
        } else if(data.sede === 4){
          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = [];
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.paciente === 'Otros');
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.paciente === 'Otros');
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = [];
        
            this.listchorrillos = [];
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.paciente === 'Otros');
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = [];
        
            this.listchorrillos = [];
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los convenios
            this.plansalud = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Plan Salud');
        
            this.institucional = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Institucional');
        
            this.convenio = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Convenios');
            
            this.company = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Compañia Seguro');
        
            this.madrenino = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Madre Niño');
        
            this.otross = this.data.filter((sede: { sucursal: string; registro_fecha: string; paciente:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.paciente === 'Otros');
        
          }
        }
        // this.plansalud = this.data.filter((item: { paciente: string; }) => item.paciente === 'Plan Salud');
        if(this.plansalud[0] !== undefined ){
          this.arrLima = this.plansalud[0].paciente;
          this.cantidad = this.plansalud.length
          this.pieChartLabels2.push(this.arrLima);
          this.pieChartData2.push(this.cantidad);
        // console.log(111, this.arrLima)
        }

        // this.institucional = this.data.filter((item: { paciente: string; }) => item.paciente === 'Institucional');
        if(this.institucional[0] !== undefined ){
          this.arrLima = this.institucional[0].paciente;
          this.cantidad = this.institucional.length;
          this.pieChartLabels2.push(this.arrLima);
          this.pieChartData2.push(this.cantidad);
        }
        // this.convenio = this.data.filter((item: { paciente: string; }) => item.paciente === 'Convenios');
        if(this.convenio[0] !== undefined ){
          this.arrLima = this.convenio[0].paciente;
          this.cantidad = this.convenio.length;
          this.pieChartLabels2.push(this.arrLima);
          this.pieChartData2.push(this.cantidad);
        }
        // this.company = this.data.filter((item: { paciente: string; }) => item.paciente === 'Compañia Seguro');
        if(this.company[0] !== undefined ){
          this.arrLima = this.company[0].paciente;
          this.cantidad = this.company.length;
          this.pieChartLabels2.push(this.arrLima);
          this.pieChartData2.push(this.cantidad);
        }
        // this.madrenino = this.data.filter((item: { paciente: string; }) => item.paciente === 'Madre Niño');
        if(this.madrenino[0] !== undefined ){
          this.arrLima = this.madrenino[0].paciente;
          this.cantidad = this.madrenino.length;
          this.pieChartLabels2.push(this.arrLima);
          this.pieChartData2.push(this.cantidad);
        }
        // this.otross = this.data.filter((item: { paciente: string; }) => item.paciente === 'Otros');
        if(this.otross[0] !== undefined ){
          this.arrLima = this.otross[0].paciente;
          this.cantidad = this.otross.length;
          this.pieChartLabels2.push(this.arrLima);
          this.pieChartData2.push(this.cantidad);
        }
        this.sumtipopaciente = this.plansalud.length + this.institucional.length + this.convenio.length
          + this.company.length + this.madrenino.length + this.otross.length;
          this.getBarChart(this.pieChartLabels2, this.pieChartData2, 'chart-3', 'Plan de salud', this.listencuesta, 'bar');
      })
  }
  clasica = [];
  dorada = [];
  diamante = [];
  arrpaciente = [];
  arrcantpa = 0;
  sumtarjeta = 0;  
  getTarjetaClasica(data) {
    this.pieChartLabels22 = [];
    this.pieChartData22 = [];
    let dato = 0;
    this.totales = 0;
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        if(data.sede === 0){

          if(data.onSelect < 3 && data.periodo !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.clasica = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
              this.listencuesta = this.clasica.length + this.dorada.length + this.diamante.length;
              console.log(this.listencuesta);
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.clasica = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
              this.listencuesta = this.clasica.length + this.dorada.length + this.diamante.length;
              console.log(this.listencuesta);
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.clasica = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
              this.listencuesta = this.clasica.length + this.dorada.length + this.diamante.length;
              console.log(this.listencuesta);
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) =>(sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.clasica = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { registro_fecha: string; tipoPaciente:string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
              this.listencuesta = this.clasica.length + this.dorada.length + this.diamante.length;
      
          }
      
      } else if(data.sede === 1){
      
          if(data.onSelect < 3 && data.periodo !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listchorrillos = [];
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listchorrillos = [];
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listchorrillos = [];
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listchorrillos = [];
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              console.log(this.listlima);
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta DIAMANTE');
              console.log(this.clasica, this.dorada, this.diamante);
      
          }
      } else if(data.sede === 2){
      
          if(data.onSelect < 3 && data.periodo !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }
      
      } else if(data.sede === 4){
          if(data.onSelect < 3 && data.periodo !== null){
      
              this.listlima = [];
      
              this.listchorrillos = [];
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
      
              this.listlima = [];
      
              this.listchorrillos = [];
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
              this.listlima = [];
      
              this.listchorrillos = [];
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.clasica = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta CLASICA');
      
              this.dorada = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta DORADA');
      
              this.diamante = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoPaciente:string;}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoPaciente === 'Tarjeta DIAMANTE');
      
          }
      }     
        //TARJETA CLASICA
        // this.clasica = this.data.filter((item: { tipoPaciente: string; }) => item.tipoPaciente === 'Tarjeta CLASICA');
        if(this.clasica[0] !== undefined ){
          this.arrpaciente = this.clasica[0].tipoPaciente;
          this.arrcantpa = this.clasica.length;
          // console.log(67, this.arrpaciente)
          this.pieChartLabels22.push(this.arrpaciente);
          this.pieChartData22.push(this.arrcantpa);
        }
        //TARJETA DORADA
        // this.dorada = this.data.filter((item: { tipoPaciente: string; }) => item.tipoPaciente === 'Tarjeta DORADA');
        if(this.dorada[0] !== undefined ){
          this.arrpaciente = this.dorada[0].tipoPaciente;
          this.arrcantpa = this.dorada.length;
          this.pieChartLabels22.push(this.arrpaciente);
          this.pieChartData22.push(this.arrcantpa);
        }
        //TARJETA DIAMANTE
        // this.diamante = this.data.filter((item: { tipoPaciente: string; }) => item.tipoPaciente === 'Tarjeta DIAMANTE');
        if(this.diamante[0] !== undefined ){
          this.arrpaciente = this.diamante[0].tipoPaciente;
          this.arrcantpa = this.diamante.length;
          this.pieChartLabels22.push(this.arrpaciente);
          this.pieChartData22.push(this.arrcantpa);
        }
        dato = this.clasica.length + this.dorada.length + this.diamante.length;
        // console.log(120,dato)
        this.sumtarjeta = dato;
        
        this.getBarChart(this.pieChartLabels22, this.pieChartData22, 'chart-4', 'Plan de salud', this.sumtarjeta, 'pie');
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
  sumconvenio = 0;
getConvenio(data) {
    this.pieChartLabels23 = [];
    this.pieChartData23 = [];
    let dato = 0;
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        // console.log(this.data);
        if(data.sede === 0){

          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
            //	Aqui empieza los planes de sedapal
            this.saludpol = this.data.filter((sede: { registro_fecha: string; tipoConvenio: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { registro_fecha: string; tipoConvenio: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { registro_fecha: string; tipoConvenio: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { registro_fecha: string; tipoConvenio: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { registro_fecha: string; tipoConvenio: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'CRECER');
            
            this.cmp = this.data.filter((sede: { registro_fecha: string; tipoConvenio: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { registro_fecha: string; tipoConvenio: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { registro_fecha: string; tipoConvenio: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'OTROS');
            
            this.listencuesta = this.saludpol.length + this.fopasef.length + this.sedapal.length + 
                      this.petroperu.length + this.crecer.length + this.cmp.length +
              this.bcrp.length + this.otrocon.length;
            console.log(this.listencuesta);
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
            
            //			Aqui empieza los planes de sedapal
            this.saludpol = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'CMP');
        
            this.bcrp = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'OTROS');
            
            this.listencuesta = this.saludpol.length + this.fopasef.length + this.sedapal.length +
              this.petroperu.length + this.crecer.length + this.cmp.length +
              this.bcrp.length + this.otrocon.length;
            console.log(this.listencuesta);
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        //Aqui empiezan los sedapals
            this.saludpol = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'OTROS');
        
            this.listencuesta = this.saludpol.length + this.fopasef.length + this.sedapal.length +
              this.petroperu.length + this.crecer.length + this.cmp.length +
              this.bcrp.length + this.otrocon.length;
            console.log(this.listencuesta);
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) =>(sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
            //	Aqui empiezan los sedapals
            this.saludpol = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'SEDAPAL');
        
            this.petroperu = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { registro_fecha: string; tipoConvenio:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'OTROS');
            
            this.listencuesta = this.saludpol.length + this.fopasef.length + this.sedapal.length +
              this.petroperu.length + this.crecer.length + this.cmp.length +
              this.bcrp.length + this.otrocon.length;
        
          }
        
        } else if(data.sede === 1){
        
          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'OTROS');
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'OTROS');
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
            //Aqui empiezan los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'OTROS');
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
            console.log(this.listlima);
        //Aqui empiezan los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'CMP');
        
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'OTROS');
          }
        } else if(data.sede === 2){
        
          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'OTROS');
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'OTROS');
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'OTROS');
            
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'SEDAPAL');
        
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'OTROS');
          }
        
        } else if(data.sede === 4){
          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = [];
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'CMP');
        
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoConvenio === 'OTROS');
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoConvenio === 'OTROS');
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = [];
        
            this.listchorrillos = [];
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoConvenio === 'OTROS');
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = [];
        
            this.listchorrillos = [];
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los sedapals
            this.saludpol = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'SALUDPOL');
        
            this.fopasef = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'FOPASEF');
        
            this.sedapal = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'SEDAPAL');
            
            this.petroperu = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'PETROPERU');
        
            this.crecer = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'CRECER');
        
            this.cmp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'CMP');
            
            this.bcrp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'BCRP');
        
            this.otrocon = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoConvenio:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoConvenio === 'OTROS');
        
          }
        }
        //SALUDPOL
        // this.saludpol = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'SALUDPOL');
        if(this.saludpol[0] !== undefined ){
          this.arrconvenio = this.saludpol[0].tipoConvenio;        
          this.arrcantco = this.saludpol.length;
          // console.log(68, this.arrconvenio)
          // console.log(69, this.arrcantco)
          this.pieChartLabels23.push(this.arrconvenio);
          this.pieChartData23.push(this.arrcantco);
        }
        //FOPASEF
        // this.fopasef = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'FOPASEF');
        if(this.fopasef[0] !== undefined ){
          this.arrconvenio = this.fopasef[0].tipoConvenio;
          this.arrcantco = this.fopasef.length;
          this.pieChartLabels23.push(this.arrconvenio);
          this.pieChartData23.push(this.arrcantco);
        }
        //SEDAPAL
        // this.sedapal = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'SEDAPAL');

        if(this.sedapal[0] !== undefined ){
          this.arrconvenio = this.sedapal[0].tipoConvenio;
          this.arrcantco = this.sedapal.length;
          this.pieChartLabels23.push(this.arrconvenio);
          this.pieChartData23.push(this.arrcantco);
        }
        //PETROPERU
        // this.petroperu = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'PETROPERU');
        if(this.petroperu[0] !== undefined ){
          this.arrconvenio = this.petroperu[0].tipoConvenio;
          this.arrcantco = this.petroperu.length;
          this.pieChartLabels23.push(this.arrconvenio);
          this.pieChartData23.push(this.arrcantco);
        }
        //CRECER
        // this.crecer = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'CRECER');
        if(this.crecer[0] !== undefined ){
          this.arrconvenio = this.crecer[0].tipoConvenio;
          this.arrcantco = this.crecer.length;
          this.pieChartLabels23.push(this.arrconvenio);
          this.pieChartData23.push(this.arrcantco);
        }
        //CMP
        // this.cmp = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'CMP');
        if(this.cmp[0] !== undefined ){
          this.arrconvenio = this.cmp[0].tipoConvenio;
          this.arrcantco = this.cmp.length;
          this.pieChartLabels23.push(this.arrconvenio);
          this.pieChartData23.push(this.arrcantco);
        }
        
        
        //BCRP
        // this.bcrp = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'BCRP');
        if(this.bcrp[0] !== undefined ){
          this.arrconvenio = this.bcrp[0].tipoConvenio;
          this.arrcantco = this.bcrp.length;
          this.pieChartLabels23.push(this.arrconvenio);
          this.pieChartData23.push(this.arrcantco);
        }
        
        
        //OTROS
        // this.otrocon = this.data.filter((item: { tipoConvenio: string; }) => item.tipoConvenio === 'OTROS');
        if(this.otrocon[0] !== undefined ){
          this.arrconvenio = this.otrocon[0].tipoConvenio;
          this.arrcantco = this.otrocon.length;
          this.pieChartLabels23.push(this.arrconvenio);
          this.pieChartData23.push(this.arrcantco);
        }
        
        dato = this.saludpol.length + this.fopasef.length + this.sedapal.length 
          + this.petroperu.length + this.crecer.length + this.cmp.length + this.bcrp.length
          + this.otrocon.length;
        
          this.sumconvenio = dato;
          // console.log(dato);
          this.getBarChart(this.pieChartLabels23, this.pieChartData23, 'chart-5', 'Convenio', this.sumconvenio, 'bar');

        
      })
}
  rimac = [];
  pacifico = [];
  positiva = [];
  mapfre = [];
  sanitas = [];
  interseguro = [];
  otrocomp = [];   
  arrCompany = [];
  arrcantcomp = 0;
  getCompany(data) {
    this.pieChartLabels24 = [];
    this.pieChartData24 = [];
    
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        //SALUDPOL
        console.log(this.data);
        if(data.sede === 0){

          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
            //	Aqui empieza los planes de convenio
            this.rimac = this.data.filter((sede: { registro_fecha: string; tipoSeguro: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { registro_fecha: string; tipoSeguro: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { registro_fecha: string; tipoSeguro: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { registro_fecha: string; tipoSeguro: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { registro_fecha: string; tipoSeguro: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'SANITAS');
            
            this.interseguro = this.data.filter((sede: { registro_fecha: string; tipoSeguro: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { registro_fecha: string; tipoSeguro: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'OTROS');
            
            this.listencuesta = this.rimac.length + this.pacifico.length + this.positiva.length + 
                      this.mapfre.length + this.sanitas.length + this.interseguro.length +
               this.otrocomp.length;
            console.log(this.listencuesta);
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
            
            //			Aqui empieza los planes de positiva
            this.rimac = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'INTERSEGURO');
        
            
        
            this.otrocomp = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'OTROS');
            
            this.listencuesta = this.rimac.length + this.pacifico.length + this.positiva.length +
              this.mapfre.length + this.sanitas.length + this.interseguro.length +
               this.otrocomp.length;
            console.log(this.listencuesta);
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        //Aqui empiezan los positivas
            this.rimac = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'OTROS');
        
            this.listencuesta = this.rimac.length + this.pacifico.length + this.positiva.length +
              this.mapfre.length + this.sanitas.length + this.interseguro.length +
               this.otrocomp.length;
            console.log(this.listencuesta);
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) =>(sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
            //	Aqui empiezan los positivas
            this.rimac = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'LA POSITIVA');
        
            this.mapfre = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { registro_fecha: string; tipoSeguro:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'OTROS');
            
            this.listencuesta = this.rimac.length + this.pacifico.length + this.positiva.length +
              this.mapfre.length + this.sanitas.length + this.interseguro.length +
               this.otrocomp.length;
        
          }
        
        } else if(data.sede === 1){
        
          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'OTROS');
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'OTROS');
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
            //Aqui empiezan los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'OTROS');
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listchorrillos = [];
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
            console.log(this.listlima);
        //Aqui empiezan los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'INTERSEGURO');
        
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'OTROS');
          }
        } else if(data.sede === 2){
        
          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'OTROS');
        
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'OTROS');
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezan los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'OTROS');
            
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'LA POSITIVA');
        
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'OTROS');
          }
        
        } else if(data.sede === 4){
          if(data.onSelect < 3 && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = [];
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'INTERSEGURO');
        
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.tipoSeguro === 'OTROS');
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
        
            this.listlima = [];
        
            this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
        
            this.listsurco = [];
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.tipoSeguro === 'OTROS');
        
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
        
            this.listlima = [];
        
            this.listchorrillos = [];
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'INTERSEGURO');
            
            
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.tipoSeguro === 'OTROS');
        
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
        
            this.listlima = [];
        
            this.listchorrillos = [];
        
            this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
        
            this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
        //Aqui empiezam los positivas
            this.rimac = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'RIMAC');
        
            this.pacifico = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'PACIFICO');
        
            this.positiva = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'LA POSITIVA');
            
            this.mapfre = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'MAPFRE');
        
            this.sanitas = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'SANITAS');
        
            this.interseguro = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'INTERSEGURO');
            
            
        
            this.otrocomp = this.data.filter((sede: { sucursal: string; registro_fecha: string; tipoSeguro:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.tipoSeguro === 'OTROS');
        
          }
        }
        // this.rimac = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'RIMAC');
        if(this.rimac[0] !== undefined ){
          this.arrCompany = this.rimac[0].tipoSeguro;
          // console.log(701,this.arrCompany)        
          this.arrcantcomp = this.rimac.length;        
          this.pieChartLabels24.push(this.arrCompany);
          this.pieChartData24.push(this.arrcantcomp);
        }
        // this.pacifico = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'PACIFICO');
        if(this.pacifico[0] !== undefined ){
          this.arrCompany = this.pacifico[0].tipoSeguro;              
          this.arrcantcomp = this.pacifico.length;        
          this.pieChartLabels24.push(this.arrCompany);
          this.pieChartData24.push(this.arrcantcomp);
        }
        // this.positiva = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'LA POSITIVA');
        if(this.positiva[0] !== undefined ){
          this.arrCompany = this.positiva[0].tipoSeguro;        
          this.arrcantcomp = this.positiva.length;        
          this.pieChartLabels24.push(this.arrCompany);
          this.pieChartData24.push(this.arrcantcomp);
        }
        // this.mapfre = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'MAPFRE');
        if(this.mapfre[0] !== undefined ){
          this.arrCompany = this.mapfre[0].tipoSeguro;        
          this.arrcantcomp = this.mapfre.length;        
          this.pieChartLabels24.push(this.arrCompany);
          this.pieChartData24.push(this.arrcantcomp);
        }
        // this.sanitas = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'SANITAS');
        if(this.sanitas[0] !== undefined ){
          this.arrCompany = this.sanitas[0].tipoSeguro;        
          this.arrcantcomp = this.sanitas.length;        
          this.pieChartLabels24.push(this.arrCompany);
          this.pieChartData24.push(this.arrcantcomp);
        }
        // this.interseguro = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'INTERSEGURO');
        if(this.interseguro[0] !== undefined ){
          this.arrCompany = this.interseguro[0].tipoSeguro;        
          this.arrcantcomp = this.interseguro.length;        
          this.pieChartLabels24.push(this.arrCompany);
          this.pieChartData24.push(this.arrcantcomp);
        }
        // this.otrocomp = this.data.filter((item: { tipoSeguro: string; }) => item.tipoSeguro === 'OTROS');
        // console.log(76,this.otrocomp);
        if (this.otrocomp[0] !== undefined ){
          this.arrCompany = this.otrocomp[0].tipoSeguro;        
          this.arrcantcomp = this.otrocomp.length;        
          this.pieChartLabels24.push(this.arrCompany);
          this.pieChartData24.push(this.arrcantcomp);
        }
        let dato = this.rimac.length + this.pacifico.length + this.positiva.length 
          + this.mapfre.length + this.sanitas.length + this.interseguro.length
          + this.otrocomp.length;
          this.companyTotals = dato;
        this.getBarChart(this.pieChartLabels24, this.pieChartData24, 'chart-6', 'Compañía Seguro', this.companyTotals, 'doughnut');
      })
  }
  getsatisfaccion(data) {

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
        if(data.sede === 0){
            
            if(data.onSelect < 3 && data.periodo !== null){    
                this.data.map((item: { SA_admision: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;

            }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){

                this.data.map((item: { SA_admision: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
                this.data.map((item: { SA_admision: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth()){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
                
                this.data.map((item: { SA_admision: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            }
        } else if(data.sede === 1){

            if(data.onSelect < 3 && data.periodo !== null){  

                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;

            }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){

                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) 
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;

            }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){

                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Lima' || item.sucursal === '0001')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            }
        } else if(data.sede === 2){

            if(data.onSelect < 3 && data.periodo !== null){  

                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
            
                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;
            
                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;
            
                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;
            
                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            
            }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
            
                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) 
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
            
                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;
            
                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;
            
                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;
            
                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
            
                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;
            
                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;
            
                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;
            
                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            
            }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
            
                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
            
                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;
            
                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;
            
                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;
            
                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0002')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            }
        } else if(data.sede === 4){

            if(data.onSelect < 3 && data.periodo !== null){  

                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if (moment(item.registro_fecha).format('YYYY-MM-DD') === data.periodo && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;

            }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){

                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) 
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(item.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if (new Date(item.registro_fecha).getMonth() === new Date(data.mes).getMonth() && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;

            }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){

                this.data.map((item: { SA_admision: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });

                this.totalAdmision = this.muybueno.length + this.buenoo.length + this.regular.length + this.maloo.length + this.muymalo.length + this.na.length;

                this.data.map((item: { SA_atencionCliente: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalAtencionCliente = this._ACmuybueno.length + this._ACbuenoo.length + this._ACregular.length + this._ACmaloo.length + this._ACmuymalo.length + this._ACna.length;
                this.data.map((item: { SA_convenios: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalConvenios = this._COmuybueno.length + this._CObuenoo.length + this._COregular.length + this._COmaloo.length + this._COmuymalo.length + this._COna.length;
                this.data.map((item: { SA_farmacia: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalFarmacia = this._FAmuybueno.length + this._FAbuenoo.length + this._FAregular.length + this._FAmaloo.length + this._FAmuymalo.length + this._FAna.length;
                this.data.map((item: { SA_imagenes: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalImagenes = this._IMmuybueno.length + this._IMbuenoo.length + this._IMregular.length + this._IMmaloo.length + this._IMmuymalo.length + this._IMna.length;
                this.data.map((item: { SA_laboratorio: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalLaboratorio = this._LAmuybueno.length + this._LAbuenoo.length + this._LAregular.length + this._LAmaloo.length + this._LAmuymalo.length + this._LAna.length;
                this.data.map((item: { SI_comodidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalComodidad = this._COMmuybueno.length + this._COMbuenoo.length + this._COMregular.length + this._COMmaloo.length + this._COMmuymalo.length + this._COMna.length;
                this.data.map((item: { SI_limpieza: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalAseoLimpieza = this._LIMmuybueno.length + this._LIMbuenoo.length + this._LIMregular.length + this._LIMmaloo.length + this._LIMmuymalo.length + this._LIMna.length;
                this.data.map((item: { SI_modernidad: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalModernidad = this._MOmuybueno.length + this._MObuenoo.length + this._MOregular.length + this._MOmaloo.length + this._MOmuymalo.length + this._MOna.length;

                this.data.map((item: { SS_doctor: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalMedico = this._DOCmuybueno.length + this._DOCbuenoo.length + this._DOCregular.length + this._DOCmaloo.length + this._DOCmuymalo.length + this._DOCna.length;

                this.data.map((item: { SS_enfermera: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                this.totalEnfermera = this._ENmuybueno.length + this._ENbuenoo.length + this._ENregular.length + this._ENmaloo.length + this._ENmuymalo.length + this._ENna.length;
                this.data.map((item: { SS_tecnica: any; registro_fecha: string; sucursal: string;}) => {
                    if ((moment(item.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(item.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin)
                    && (item.sucursal === 'Chorrillos' || item.sucursal === '0004')){
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
                    }
                });
                
                this.totalTecnica = this._TECmuybueno.length + this._TECbuenoo.length + this._TECregular.length + this._TECmaloo.length + this._TECmuymalo.length + this._TECna.length;
            }
        }
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
  getrecomendacion(data): void {
    this.pieChartLabels3 = [];
    this.pieChartData3 = [];


    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
console.log(222, this.data);
        if(data.sede === 0){

          if(data.onSelect < 3 && data.periodo !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
              //	Aqui empieza los planes de recomen3
              this.recomen1 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion: string;}) => moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '10');
      
              this.listencuesta = this.recomen1.length + this.recomen2.length + this.recomen3.length + 
                  this.recomen4.length + this.recomen5.length + this.recomen6.length +
                  this.recomen7.length + this.recomen8.length + this.recomen9.length + this.recomen10.length;
              console.log(this.listencuesta);
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              //			Aqui empieza los planes de recomen3
              this.recomen1 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '10');
      
              this.listencuesta = this.recomen1.length + this.recomen2.length + this.recomen3.length +
                  this.recomen4.length + this.recomen5.length + this.recomen6.length +
                  this.recomen7.length + this.recomen8.length + this.recomen9.length + this.recomen10.length;
              console.log(this.listencuesta);
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
              //Aqui empiezan los recomen3s
              this.recomen1 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '10');
      
              this.listencuesta = this.recomen1.length + this.recomen2.length + this.recomen3.length +
                  this.recomen4.length + this.recomen5.length + this.recomen6.length +
                  this.recomen7.length + this.recomen8.length + this.recomen9.length + this.recomen10.length;
              console.log(this.listencuesta);
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos'  || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) =>(sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
              //	Aqui empiezan los recomen3s
              this.recomen1 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { registro_fecha: string; escalaRecomendacion:string}) => moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '10');
      
              this.listencuesta = this.recomen1.length + this.recomen2.length + this.recomen3.length +
                  this.recomen4.length + this.recomen5.length + this.recomen6.length +
                  this.recomen7.length + this.recomen8.length + this.recomen9.length + this.recomen10.length;
      
          }
      
      } else if(data.sede === 1){
      
          if(data.onSelect < 3 && data.periodo !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listchorrillos = [];
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezan los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '10');
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listchorrillos = [];
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
      
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '8');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '9');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '10');
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listchorrillos = [];
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezan los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '10');
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
              this.listlima = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listchorrillos = [];
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              console.log(this.listlima);
              //Aqui empiezan los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal === 'Lima' || sede.sucursal === '0001') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '10');
          }
      } else if(data.sede === 2){
      
          if(data.onSelect < 3 && data.periodo !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezan los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '10');
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezan los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '10');
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezan los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '10');
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezam los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Chorrillos' || sede.sucursal === '0002') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '10');
          }
      
      } else if(data.sede === 4){
          if(data.onSelect < 3 && data.periodo !== null){
      
              this.listlima = [];
      
              this.listchorrillos = [];
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo);
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezam los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') === data.periodo && sede.escalaRecomendacion === '10');
      
          }else if((data.onSelect === '3' || data.onSelect === '4') && data.periodo !== null){
      
              this.listlima = [];
      
              this.listchorrillos = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      
              this.listsurco = [];
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezam los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.periodo && moment(sede.registro_fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')  && sede.escalaRecomendacion === '10');
      
          }else if((data.onSelect === '5' || data.onSelect === '6') && data.mes !== null){
      
              this.listlima = [];
      
              this.listchorrillos = [];
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth());
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezam los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && new Date(sede.registro_fecha).getMonth() === new Date(data.mes).getMonth() && sede.escalaRecomendacion === '10');
      
          }else if(data.onSelect === '7' && data.fecha_inicio !== null && data.fecha_fin !== null){
      
              this.listlima = [];
      
              this.listchorrillos = [];
      
              this.listsurco = this.data.filter((sede: { sucursal: string; registro_fecha: string;}) => (sede.sucursal === 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin);
      
              this.listencuesta = this.listlima.length + this.listchorrillos.length + this.listsurco.length;
              //Aqui empiezam los recomen3s
              this.recomen1 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '1');
      
              this.recomen2 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '2');
      
              this.recomen3 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '3');
      
              this.recomen4 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '4');
      
              this.recomen5 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '5');
      
              this.recomen6 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '6');
      
              this.recomen7 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '7');
      
              this.recomen8 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '8');
      
              this.recomen9 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '9');
      
              this.recomen10 = this.data.filter((sede: { sucursal: string; registro_fecha: string; escalaRecomendacion:string}) => (sede.sucursal == 'Surco' || sede.sucursal === '0004') && moment(sede.registro_fecha).format('YYYY-MM-DD') >= data.fecha_inicio && moment(sede.registro_fecha).format('YYYY-MM-DD') <= data.fecha_fin && sede.escalaRecomendacion === '10');
          }
      }


        // this.recomen1 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '10');
        
        if (this.recomen1[0] !== undefined ){
          this.cantrecom = this.recomen1.length;
          // console.log(55, this.recomen1)
          this.arrescala = this.recomen1[0].escalaRecomendacion;
          this.datolabel = this.arrescala;
          this.datonum = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }

        // this.recomen2 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '9');
        if (this.recomen2[0] !== undefined ){
          this.cantrecom = this.recomen2.length;
          this.arrescala = this.recomen2[0].escalaRecomendacion;
          this.datolabel2 = this.arrescala;
          this.datonum2 = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }

        // this.recomen3 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '8');
        if (this.recomen3[0] !== undefined ){
          this.cantrecom = this.recomen3.length;
          this.arrescala = this.recomen3[0].escalaRecomendacion;
          this.datolabel3 = this.arrescala;
          this.datonum3 = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }

        // this.recomen4 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '7');
        if (this.recomen4[0] !== undefined ){
          this.cantrecom = this.recomen4.length;
          this.arrescala = this.recomen4[0].escalaRecomendacion;
          this.datolabel4 = this.arrescala;
          this.datonum4 = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }

        // this.recomen5 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '6');
        if (this.recomen5[0] !== undefined ){
          this.cantrecom = this.recomen5.length;
          this.arrescala = this.recomen5[0].escalaRecomendacion;
          this.datolabel5 = this.arrescala;
          this.datonum5 = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }

        // this.recomen6 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '5');
        if (this.recomen6[0] !== undefined ){
          this.cantrecom = this.recomen6.length;
          this.arrescala = this.recomen6[0].escalaRecomendacion;
          this.datolabel6 = this.arrescala;
          this.datonum6 = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }

        // this.recomen7 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '4');
        if (this.recomen7[0] !== undefined ){
          this.cantrecom = this.recomen7.length;
          this.arrescala = this.recomen7[0].escalaRecomendacion;
          this.datolabel7 = this.arrescala;
          this.datonum7 = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }

        // this.recomen8 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '3');
        if (this.recomen8[0] !== undefined ){
          this.cantrecom = this.recomen8.length;
          this.arrescala = this.recomen8[0].escalaRecomendacion;
          this.datolabel8 = this.arrescala;
          this.datonum8 = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }

        // this.recomen9 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '2');
        if (this.recomen9[0] !== undefined ){
          this.cantrecom = this.recomen9.length;
          this.arrescala = this.recomen9[0].escalaRecomendacion;
          this.datolabel9 = this.arrescala;
          this.datonum9 = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }
        // this.recomen10 = this.data.filter((item: { escalaRecomendacion: string; }) => item.escalaRecomendacion === '1');
        if (this.recomen10[0] !== undefined ){
          this.cantrecom = this.recomen10.length;
          this.arrescala = this.recomen10[0].escalaRecomendacion;
          this.datolabel10 = this.arrescala;
          this.datonum10 = this.cantrecom;
          this.pieChartData3.push(this.cantrecom);
          this.pieChartLabels3.push(this.arrescala);
        }
        this.recomendacionTotal = this.recomen1.length + this.recomen2.length + this.recomen3.length + this.recomen4.length + this.recomen5.length +
        this.recomen6.length + this.recomen7.length + this.recomen8.length + this.recomen9.length + this.recomen10.length;
        this.getBarChart(this.pieChartLabels3, this.pieChartData3, 'chart-8', 'Escala de Recomendación', this.recomendacionTotal, 'doughnut');
      })
  }
  getporcentaje(dato: number) {
    // console.log(99, dato);
    // return ((dato * 100) / this.listencuesta).toFixed(2) + '%';
    return (!Number.isFinite((dato * 100) / this.listencuesta) ? (0).toFixed(2) : ((dato * 100) / this.listencuesta).toFixed(2) + '%');
  }
  getporcentajetarjeta(dato: number) {
    console.log(100, dato);
    // return ((dato * 100) / this.sumtarjeta).toFixed(2) + '%';
    return (!Number.isFinite((dato * 100) / this.sumtarjeta) ? (0).toFixed(2) : ((dato * 100) / this.sumtarjeta).toFixed(2) + '%');
  }
  getporcentajeconvenio(dato: number) {
    // console.log(101, dato);
    // return ((dato * 100) / this.sumconvenio).toFixed(2) + '%';
    return (!Number.isFinite((dato * 100) / this.sumconvenio) ? (0).toFixed(2) : ((dato * 100) / this.sumconvenio).toFixed(2) + '%');
  }
  getporcentajeCompany(dato: number) {
    // console.log(102, dato);
    // return ((dato * 100) / this.companyTotals).toFixed(2) + '%';
    return (!Number.isFinite((dato * 100) / this.companyTotals) ? (0).toFixed(2) : ((dato * 100) / this.companyTotals).toFixed(2) + '%');
  }
  getporcentajeescala(dato: number) {
    // console.log(103, dato);
    // return ((dato * 100) / this.recomendacionTotal).toFixed(2) + '%';
    return (!Number.isFinite((dato * 100) / this.recomendacionTotal) ? (0).toFixed(2) : ((dato * 100) / this.recomendacionTotal).toFixed(2) + '%');
  }
  getporcentajesati(dato: number) {
    // if (dato === undefined){
    //     dato = 0;
    // }
    // if (!Number.isFinite((dato * 100) / this.listencuesta)){
    //     console.log(104, (dato * 100) / 0);
    //     return (0).toFixed(2) + '%';
    // }
    return (!Number.isFinite((dato * 100) / this.listencuesta) ? (0).toFixed(2) : ((dato * 100) / this.listencuesta).toFixed(2) + '%');
  }

  onChange(event: { target: { value: string; }; }) {
    if (parseInt(event.target.value) === 7) {
      // this.isPeriodo = true;
      this.isRangoFecha = true;
      this.ngfecha01 = null;
      this.ngfecha02 = null;
    } else {
      this.isPeriodo = false;
      this.isRangoFecha = false;
      this.ngperiodo = null;

    }
  }
  search() {
    let periodo;
    let mes;
    const formValue = this.seachForm.value;
    if (this.isPeriodo) {
      this.ngperiodo = this.datePipe.transform(formValue.periodo, 'yyyyMM');
    }

    if(formValue.opselect === '1'){
      periodo =  new Date;
      this.ngperiodo = moment(periodo).format("YYYY-MM-DD");
    }else if(formValue.opselect === '2'){
      this.ngperiodo = moment(periodo).subtract(1, 'days').format("YYYY-MM-DD");
    }else if(formValue.opselect === '3'){
      this.ngperiodo = moment(periodo).subtract(7, 'days').format("YYYY-MM-DD");
    }else if(formValue.opselect === '4'){
      this.ngperiodo = moment(periodo).subtract(30, 'days').format("YYYY-MM-DD");
    }else if(formValue.opselect === '5'){
      mes = moment().month().toString();
    }else if(formValue.opselect === '6'){
      let mesAnterior = moment().month()-1
      mes = mesAnterior.toString();
    }else if(formValue.opselect === '7'){
      if (this.isRangoFecha) {
        this.ngfecha01 = this.datePipe.transform(formValue.fecha_inicio, 'yyyy-MM-dd');
        this.ngfecha02 = this.datePipe.transform(formValue.fecha_fin, 'yyyy-MM-dd');
      }
    }
    // console.log(this.ngfecha01 , this.ngfecha02);
    const data = {
      periodo: this.ngperiodo,
      onSelect: formValue.opselect,
      fecha_inicio: this.ngfecha01,
      fecha_fin: this.ngfecha02,
      mes: mes,
      sede: parseInt(formValue.sede),
      idrol: parseInt(localStorage.getItem('idrol')),
      empresa: this.TIPO_RECLAMO
    };
    this.dataSelect = data
    this.getRegisterSede(this.dataSelect);
    this.getSucursal(this.dataSelect);
    this.getModalidad(this.dataSelect);
    this.getTipoPaciente(this.dataSelect);
    this.getTarjetaClasica(this.dataSelect);
    this.getConvenio(this.dataSelect);
    this.getCompany(this.dataSelect);
    this.getsatisfaccion(this.dataSelect);
    this.getrecomendacion(this.dataSelect);

    // this.getModality(data);
    // this.getPatientType(data);
    // this.getHealthPlan(data);
    // this.getConveny(data);
    // this.getCompanySg(data);
    // this.getExperience(data);
    // this.getRecomendation(data);

  }

    getRegisterSede(data) {
      
      this.formularioService.getFormulario().subscribe(
        (res: any) => {
          this.data = res.body;
          if(data.sede == 1){
            this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal == 'Lima');
          }else if(data.sede === 2){
            this.listchorrillos = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Chorrillos');
          }else if(data.sede === 3){
            this.listsurco = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Surco');
          }else{
            this.listchorrillos = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Chorrillos');
            this.listsurco = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Surco');
            this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal == 'Lima');
          }
        })
    }

  // Origen de ingreso
  getModality(data) {
    let sucursal;
    if(data.sede === 1){
      sucursal = 'Lima'
    }else if(data.sede === 2){
      sucursal = 'Chorrillos'
    }else if(data.sede === 3){
      sucursal = 'Surco'
    }else{
      sucursal = '';
    }
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        // console.log(res);
        // this.listencuesta = res.data.body[0].length > 0 ? res.data.body : []; 
        this.data = res.body;
        if(sucursal){
          this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === sucursal)
          for (var i = 0; i < this.listlima.length; i++) {
            //this.tipopacientelima.push(this.listlima[i].modalidad)
          }
        }else{
          // console.log(sucursal)
        }
      })
  }
  // Por tipo de paciente 
  getPatientType(data) {
    let sucursal;
    if(data.sede === 1){
      sucursal = 'Lima'
    }else if(data.sede === 2){
      sucursal = 'Chorrillos'
    }else if(data.sede === 3){
      sucursal = 'Surco'
    }else{
      sucursal = '';
    }
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        // console.log(res);

        this.data = res.body;
        // console.log(this.data);
        if(sucursal){
          this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === sucursal)
          for (var i = 0; i < this.listlima.length; i++) {
            this.modalima.push(this.listlima[i].paciente)
          }
        }else{
          // console.log('first')
        }
        // console.log(10, this.modalima);
        //console.log(1000, this.data);
      })
  }

  // Plan de salud
  getHealthPlan(data){
    let sucursal;
    if(data.sede === 1){
      sucursal = 'Lima'
    }else if(data.sede === 2){
      sucursal = 'Chorrillos'
    }else if(data.sede === 3){
      sucursal = 'Surco'
    }else{
      sucursal = '';
    }
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        // console.log(res);

        this.data = res.body;
        // console.log(this.data);
        if(sucursal){
          this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === sucursal)
          for (var i = 0; i < this.listlima.length; i++) {
            this.escalalima.push(this.listlima[i].escalaRecomendacion);
          }
        }else{

        }
        
        // console.log(10, this.escalalima);
        //console.log(1000, this.data);
      })
  }
  // Convenio
  getConveny(data){
    let sucursal;
    if(data.sede === 1){
      sucursal = 'Lima'
    }else if(data.sede === 2){
      sucursal = 'Chorrillos'
    }else if(data.sede === 3){
      sucursal = 'Surco'
    }else{
      sucursal = '';
    }
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        // console.log(res);

        this.data = res.body;
        // console.log(this.data);
        if(sucursal){
          this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === sucursal)
          for (var i = 0; i < this.listlima.length; i++) {
            this.escalalima.push(this.listlima[i].escalaRecomendacion);
          }
        }else{

        }
        
        // console.log(10, this.escalalima);
        //console.log(1000, this.data);
      })
  }
  // Compania de seguros
  getCompanySg(data){
    let sucursal;
    if(data.sede === 1){
      sucursal = 'Lima'
    }else if(data.sede === 2){
      sucursal = 'Chorrillos'
    }else if(data.sede === 3){
      sucursal = 'Surco'
    }else{
      sucursal = '';
    }
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        // console.log(res);

        this.data = res.body;
        // console.log(this.data);
        if(sucursal){
          this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === sucursal)
          for (var i = 0; i < this.listlima.length; i++) {
            this.escalalima.push(this.listlima[i].escalaRecomendacion);
          }
        }else{

        }
        
        // console.log(10, this.escalalima);
        //console.log(1000, this.data);
      })
  }
  // Satisfacción por servicio
  getExperience(data) {
    let sucursal;
    if(data.sede === 1){
      sucursal = 'Lima'
    }else if(data.sede === 2){
      sucursal = 'Chorrillos'
    }else if(data.sede === 3){
      sucursal = 'Surco'
    }else{
      sucursal = '';
    }
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        // console.log(res);
        this.data = res.body;
        if(sucursal){
          this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === sucursal)
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
        }else{

        }
        
        // console.log(30, this.satisfaccionlima);
        //console.log(1000, this.data);
      })
  }

  // Registro de recomendacion
  getRecomendation(data) {
    let sucursal;
    if(data.sede === 1){
      sucursal = 'Lima'
    }else if(data.sede === 2){
      sucursal = 'Chorrillos'
    }else if(data.sede === 3){
      sucursal = 'Surco'
    }else{
      sucursal = '';
    }
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        // console.log(res);

        this.data = res.body;
        // console.log(this.data);
        if(sucursal){
          this.listlima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === sucursal)
          for (var i = 0; i < this.listlima.length; i++) {
            this.escalalima.push(this.listlima[i].escalaRecomendacion);
          }
        }else{

        }
        
        // console.log(10, this.escalalima);
        //console.log(1000, this.data);
      })
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
