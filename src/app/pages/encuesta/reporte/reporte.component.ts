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
  char: any = [];
  public listencuesta: any = [];
  public listlima: any = [];
  public listchorrillos: any = [];
  public listsurco: any = [];
  public modalima: any = [];
  public tipopacientelima: any = [];
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
  public muymalo: any = [];
  public maloo: any = [];
  public regular: any = [];
  public buenoo: any = [];
  public muybueno: any = [];
  public listadmi: any = [];


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
  arrLima: any = [];
  model: NgbDateStruct; 
  //CANVAS
  barChartOptions: ChartOptions = {
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
  ];
  

  public pieChartOptions: ChartOptions = {
    responsive: true,
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
  }],
  },
    legend: {
      position: 'top',
      
    },
    
  };
  
  public pieChartData = [];
  public pieChartType: ChartType = 'horizontalBar';
  public pieChartLegend = true;
  
  public pieChartColors = [
    {
      backgroundColor: [' ', 'rgba(22,73,126,1)', 'rgba(100,22,157,1)', 'rgba(159, 24, 0, 1)', 'rgba(67,168,128,1)'],

    },

  ];

  sucursal: number;

  //public title: string = ""
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
    if (parseInt(localStorage.getItem('idrol')) == 1) {
      this.sucursal = 0;
    } else {
      this.sucursal = parseInt(localStorage.getItem('sede'));
    }
    this.getRegisteredEncuesta()
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        this.data = res.body.length > 0 ? res.body : [];
        let Lima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal == 'Lima');  
        //this.listlima = Lima;
        
        //this.barChartData.push();
        console.log(2020,this.data);
        //console.log(2021,this.barChartData);
      }
    )
  };

  getRegisteredEncuesta() {
    this.isLoading = true;
    //this.barChartLabels = [];
    //this.barChartData= [];
    let dato = []
    let dato2 = []
    let dato3 = []
    let moda = []
    let moda2 = []
    let moda3 = []
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);
        this.listencuesta = res.body.length;
        this.data = res.body;
        this.isLoading = false;
        //POR SEDE
        let Lima = this.data.filter((sede: { sucursal: string; }) => sede.sucursal == 'Lima');       
        dato.push(Lima.length);
        this.listlima = dato;        

        let surco = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Surco');
        dato2.push(surco.length);
        this.listsurco = dato2;

        let chorrillos = this.data.filter((sede: { sucursal: string; }) => sede.sucursal === 'Chorrillos');
        dato3.push(chorrillos.length);
        this.listchorrillos = dato3;

        this.chartData = 
        [
          {data: this.listlima , label: 'Lima'},
          {data: this.listchorrillos, label: 'Chorrillos'},
          {data: this.listsurco, label: 'Surco'}
        ];
        
        
        console.log(800, this.listencuesta); 
        //POR MODALIDAD
        let emergencia = this.data.filter((moda: { modalidad: string; }) => moda.modalidad == 'Emergencia');
        moda.push(emergencia.length);
        this.listemergencia = moda;
       
        let consultorio = this.data.filter((moda: { modalidad: string; }) => moda.modalidad == 'Consultorio Externo');
        moda2.push(consultorio.length);
        this.listconsultorio = moda2;        

        let hospitalizacion = this.data.filter((moda: { modalidad: string; }) => moda.modalidad == 'Hospitalización');
        moda3.push(hospitalizacion.length);
        this.listhospita = moda3;

        this.pieChartData = 
        [
          {data: this.listemergencia, label: 'Emergencia'},
          {data: this.listhospita, label: 'Hospitalizacón'},
          {data: this.listconsultorio, label: 'Consultorio'}
        ]
          
        //this.pieChartLabels.push(hospitalizacion[0].modalidad);

        //console.log(500, this.pieChartData);
        //console.log(400, this.pieChartLabels);
        
        let tipo = this.data.filter((item: { paciente: string; }) => item.paciente === 'Plan Salud');
        this.plansalud = tipo.length;
        let inst = this.data.filter((item: { paciente: string; }) => item.paciente === 'Institucional');
        this.institucional = inst.length;
        let conv = this.data.filter((item: { paciente: string; }) => item.paciente === 'Convenios');
        this.convenio = conv.length;
        let compa = this.data.filter((item: { paciente: string; }) => item.paciente === 'Compañia Seguro');
        this.compania = compa.length;
        let madre = this.data.filter((item: { paciente: string; }) => item.paciente === 'Madre Niño');
        this.madrenino = madre.length;
        let otro =this.data.filter((item: { paciente: string; }) => item.paciente === 'Otros');
        this.otross = otro.length;
        
        console.log(1,this.convenio);
        console.log(1,conv)
        console.log(1,this.getporcentaje(this.convenio));

        let admi1 = this.data.filter((item: { SA_admision: string; }) => item.SA_admision === '1');
        let admi2 = this.data.filter((item: { SA_admision: string; }) => item.SA_admision === '2');
        let admi3 = this.data.filter((item: { SA_admision: string; }) => item.SA_admision === '3');
        let admi4 = this.data.filter((item: { SA_admision: string; }) => item.SA_admision === '4');
        let admi5 = this.data.filter((item: { SA_admision: string; }) => item.SA_admision === '5');
        this.muymalo.push(admi1);
        this.maloo.push(admi2.length);
        this.regular.push(admi3.length);
        this.buenoo.push(admi4.length);
        this.muybueno.push(admi5.length);

        let cliente1 = this.data.filter((item: { SA_atencionCliente: string; }) => item.SA_atencionCliente === '1');
        let cliente2 = this.data.filter((item: { SA_atencionCliente: string; }) => item.SA_atencionCliente === '2');
        let cliente3 = this.data.filter((item: { SA_atencionCliente: string; }) => item.SA_atencionCliente === '3');
        let cliente4 = this.data.filter((item: { SA_atencionCliente: string; }) => item.SA_atencionCliente === '4');
        let cliente5 = this.data.filter((item: { SA_atencionCliente: string; }) => item.SA_atencionCliente === '5');
        this.muymalo.push(cliente1);
        this.maloo.push(cliente2.length);
        this.regular.push(cliente3.length);
        this.buenoo.push( cliente4.length);
        this.muybueno.push(cliente5.length);

        let convenio1 = this.data.filter((item: { SA_convenios: string; }) => item.SA_convenios === '1');
        let convenio2 = this.data.filter((item: { SA_convenios: string; }) => item.SA_convenios === '2');
        let convenio3 = this.data.filter((item: { SA_convenios: string; }) => item.SA_convenios === '3');
        let convenio4 = this.data.filter((item: { SA_convenios: string; }) => item.SA_convenios === '4');
        let convenio5 = this.data.filter((item: { SA_convenios: string; }) => item.SA_convenios === '5');
        this.muymalo.push ( convenio1);
        this.maloo.push   ( convenio2.length);
        this.regular.push ( convenio3.length);
        this.buenoo.push  ( convenio4.length);
        this.muybueno.push( convenio5.length);

        let farmacia1 = this.data.filter((item: { SA_farmacia: string; }) => item.SA_farmacia === '1');
        let farmacia2 = this.data.filter((item: { SA_farmacia: string; }) => item.SA_farmacia === '2');
        let farmacia3 = this.data.filter((item: { SA_farmacia: string; }) => item.SA_farmacia === '3');
        let farmacia4 = this.data.filter((item: { SA_farmacia: string; }) => item.SA_farmacia === '4');
        let farmacia5 = this.data.filter((item: { SA_farmacia: string; }) => item.SA_farmacia === '5');
        this.muymalo.push ( farmacia1);
        this.maloo.push   ( farmacia2.length);
        this.regular.push ( farmacia3.length);
        this.buenoo.push  ( farmacia4.length);
        this.muybueno.push( farmacia5.length);

        let imagenes1 = this.data.filter((item: { SA_imagenes: string; }) => item.SA_imagenes === '1');
        let imagenes2 = this.data.filter((item: { SA_imagenes: string; }) => item.SA_imagenes === '2');
        let imagenes3 = this.data.filter((item: { SA_imagenes: string; }) => item.SA_imagenes === '3');
        let imagenes4 = this.data.filter((item: { SA_imagenes: string; }) => item.SA_imagenes === '4');
        let imagenes5 = this.data.filter((item: { SA_imagenes: string; }) => item.SA_imagenes === '5');
        this.muymalo.push ( imagenes1);
        this.maloo.push   ( imagenes2.length);
        this.regular.push ( imagenes3.length);
        this.buenoo.push  ( imagenes4.length);
        this.muybueno.push( imagenes5.length);

        let laboratorio1 = this.data.filter((item: { SA_laboratorio: string; }) => item.SA_laboratorio === '1');
        let laboratorio2 = this.data.filter((item: { SA_laboratorio: string; }) => item.SA_laboratorio === '2');
        let laboratorio3 = this.data.filter((item: { SA_laboratorio: string; }) => item.SA_laboratorio === '3');
        let laboratorio4 = this.data.filter((item: { SA_laboratorio: string; }) => item.SA_laboratorio === '4');
        let laboratorio5 = this.data.filter((item: { SA_laboratorio: string; }) => item.SA_laboratorio === '5');
        this.muymalo.push ( laboratorio1);
        this.maloo.push   ( laboratorio2.length);
        this.regular.push ( laboratorio3.length);
        this.buenoo.push  ( laboratorio4.length);
        this.muybueno.push( laboratorio5.length);
        
        
        let comodidad1 = this.data.filter((item: { SI_comodidad: string; }) => item.SI_comodidad === '1');
        let comodidad2 = this.data.filter((item: { SI_comodidad: string; }) => item.SI_comodidad === '2');
        let comodidad3 = this.data.filter((item: { SI_comodidad: string; }) => item.SI_comodidad === '3');
        let comodidad4 = this.data.filter((item: { SI_comodidad: string; }) => item.SI_comodidad === '4');
        let comodidad5 = this.data.filter((item: { SI_comodidad: string; }) => item.SI_comodidad === '5');
        this.muymalo.push ( comodidad1);
        this.maloo.push   ( comodidad2.length);
        this.regular.push ( comodidad3.length);
        this.buenoo.push  ( comodidad4.length);
        this.muybueno.push( comodidad5.length);

        let limpieza1 = this.data.filter((item: { SI_limpieza: string; }) => item.SI_limpieza === '1');
        let limpieza2 = this.data.filter((item: { SI_limpieza: string; }) => item.SI_limpieza === '2');
        let limpieza3 = this.data.filter((item: { SI_limpieza: string; }) => item.SI_limpieza === '3');
        let limpieza4 = this.data.filter((item: { SI_limpieza: string; }) => item.SI_limpieza === '4');
        let limpieza5 = this.data.filter((item: { SI_limpieza: string; }) => item.SI_limpieza === '5');
        this.muymalo.push ( limpieza1);
        this.maloo.push   ( limpieza2.length);
        this.regular.push ( limpieza3.length);
        this.buenoo.push  ( limpieza4.length);
        this.muybueno.push( limpieza5.length);

        let modernidad1 = this.data.filter((item: { SI_modernidad: string; }) => item.SI_modernidad === '1');
        let modernidad2 = this.data.filter((item: { SI_modernidad: string; }) => item.SI_modernidad === '2');
        let modernidad3 = this.data.filter((item: { SI_modernidad: string; }) => item.SI_modernidad === '3');
        let modernidad4 = this.data.filter((item: { SI_modernidad: string; }) => item.SI_modernidad === '4');
        let modernidad5 = this.data.filter((item: { SI_modernidad: string; }) => item.SI_modernidad === '5');
        this.muymalo.push ( modernidad1);
        this.maloo.push   ( modernidad2.length);
        this.regular.push ( modernidad3.length);
        this.buenoo.push  ( modernidad4.length);
        this.muybueno.push( modernidad5.length);

        let doc1 = this.data.filter((item: { SS_doctor: string; }) => item.SS_doctor === '1');
        let doc2 = this.data.filter((item: { SS_doctor: string; }) => item.SS_doctor === '2');
        let doc3 = this.data.filter((item: { SS_doctor: string; }) => item.SS_doctor === '3');
        let doc4 = this.data.filter((item: { SS_doctor: string; }) => item.SS_doctor === '4');
        let doc5 = this.data.filter((item: { SS_doctor: string; }) => item.SS_doctor === '5');
        this.muymalo.push ( doc1.length);
        this.maloo.push   ( doc2.length);
        this.regular.push ( doc3.length);
        this.buenoo.push  ( doc4.length);
        this.muybueno.push( doc5.length);

        let enfer1 = this.data.filter((item: { SS_enfermera: string; }) => item.SS_enfermera === '1');
        let enfer2 = this.data.filter((item: { SS_enfermera: string; }) => item.SS_enfermera === '2');
        let enfer3 = this.data.filter((item: { SS_enfermera: string; }) => item.SS_enfermera === '3');
        let enfer4 = this.data.filter((item: { SS_enfermera: string; }) => item.SS_enfermera === '4');
        let enfer5 = this.data.filter((item: { SS_enfermera: string; }) => item.SS_enfermera === '5');
        this.muymalo.push ( enfer1.length);
        this.maloo.push   ( enfer2.length);
        this.regular.push ( enfer3.length);
        this.buenoo.push  ( enfer4.length);
        this.muybueno.push( enfer5.length);

        let tecnica1 = this.data.filter((item: { SS_tecnica: string; }) => item.SS_tecnica === '1');
        let tecnica2 = this.data.filter((item: { SS_tecnica: string; }) => item.SS_tecnica === '2');
        let tecnica3 = this.data.filter((item: { SS_tecnica: string; }) => item.SS_tecnica === '3');
        let tecnica4 = this.data.filter((item: { SS_tecnica: string; }) => item.SS_tecnica === '4');
        let tecnica5 = this.data.filter((item: { SS_tecnica: string; }) => item.SS_tecnica === '5');
        this.muymalo.push ( tecnica1.length);
        this.maloo.push   ( tecnica2.length);
        this.regular.push ( tecnica3.length);
        this.buenoo.push  ( tecnica4.length);
        this.muybueno.push( tecnica5.length);


        console.log(9,admi1.map((item: { SA_admision: { value: any; }; }) => item.SA_admision.value))
        console.log(8,cliente1)
        console.log(7,convenio1)
        console.log(6,farmacia1)
        console.log(5,imagenes1)
        console.log(4,laboratorio1)
        console.log(3,comodidad1)
        console.log(2,limpieza1)
        console.log(1,modernidad1)
        console.log(0,doc1)
        console.log(0.1,enfer1)
        console.log(0.2,tecnica1)

      
        


        


      }
    )
  }

  getporcentaje(dato: number){
    return ((dato * 100) / this.listencuesta).toFixed(2) + '%';
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
          this.tipopacientelima.push(this.listlima[i].modalidad)
        }
        console.log(20, this.tipopacientelima);
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

  /*  this.getRegisteredEncuesta();
   this.getRegisterSedeLima();
   this.getRegisterSedeChorrillos();
   this.getRegisterSedeSurco();
   this.getmodalidadLima();
   this.gettipopacienteLima();
   this.getrecomedacionLima();
   this.getexperienciaLima(); */
  /* if (parseInt(localStorage.getItem('idrol')) == 1) {
    this.sucursal = 0;
  } else {
    this.sucursal = parseInt(localStorage.getItem('sede'));
  }
  this.search(); */



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
  }
}
}



