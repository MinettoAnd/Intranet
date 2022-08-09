import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../formulario.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
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
  title = "TOTAL DE LOS REGISTROS DE LA ENCUESTA";
  etiquetas = ["Lima", "Chorrillos", "Surco"];
  dataLima = {
    label: "Registros en Lima",
    data: this.getRegisterSedeLima(),
  }
  dataChorrillos = {
    label: "Registros en Chorrillos",
    data: this.getRegisterSedeChorrillos(),
  }
  dataSurco = {
    label: "Registros en Surco",
    data: this.getRegisterSedeSurco(),
  }
  //CANVAS



  getRegisteredEncuesta() {
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);
        this.listencuesta = res.body.length;

        let Lima = this.data.filter(sede => sede.sucursal == 'Lima');
        this.listlima = Lima.length;
        console.log(800, this.listencuesta);

        this.char = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: ['Lima', 'Chorrillos', 'Surco'],
            datasets: [
              {
                data: this.listlima,
                borderColor: 'rgba(67,168,128,0.3)',
                borderWidth: 3,
                backgroundColor: 'rgba(67,168,128,1)'

              }
            ]
          },
          options: {
            legend: {
              display: true,
            }
          }
        })
      }
    )
  }

  //SEDE LIMA
  getRegisterSedeLima() {
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);
        this.data = res.body;
        let Lima = this.data.filter(sede => sede.sucursal == 'Lima');
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

        this.listlima = this.data.filter(sede => sede.sucursal === 'Lima')
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

        this.listlima = this.data.filter(sede => sede.sucursal === 'Lima')
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
        this.listlima = this.data.filter(sede => sede.sucursal === 'Lima')
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

        this.listlima = this.data.filter(sede => sede.sucursal === 'Lima')
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
        let surco = this.data.filter(sede => sede.sucursal === 'Surco');
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
        let chorrillos = this.data.filter(sede => sede.sucursal === 'Chorrillos');
        this.listchorrillos = chorrillos.length;
        console.log(1100, this.listchorrillos);
        //console.log(this.data);
      })
  }

  sucursal;

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
    this.formularioService.getFormulario().subscribe(
      (res: any) => {
        console.log(res);
        this.listencuesta = res.body.length;

        let Lima = this.data.filter(sede => sede.sucursal == 'Lima');
        this.listlima = Lima.length;
        console.log(800, this.listencuesta);

        this.char = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: ['Lima', 'Chorrillos', 'Surco'],
            datasets: [
              {
                data: this.listlima,
                borderColor: 'rgba(67,168,128,0.3)',
                borderWidth: 3,
                fill: false,
                backgroundColor: 'rgba(67,168,128,1)'

              }
            ]
          },
          options: {
            legend: {
              display: true,
            }
          }
        })
      }
    )
  };


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



