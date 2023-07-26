import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuscarColaboradorComponent } from 'src/app/modals/rrhh/buscar-colaborador/buscar-colaborador.component';

@Component({
  selector: 'app-filter-envio-correos',
  templateUrl: './envio-correos.component.html',
  styleUrls: ['./envio-correos.component.scss']
})
export class FilterEnvioCorreosComponent implements OnInit {
  filtroForm: FormGroup;
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  anioAnterior = moment(new Date()).subtract(1, 'years').format('YYYY');
  periodo = this.anio + this.mes;
  cod_empresa: string = 'TODAS';
  cod_tipo_planilla: string = '01';
  id_sede:string = '001';
  cod_colaborador:string;
  C_NOM_PERSONAL:string;
  optionsMes = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];
  optionsAnio = [];
  @Input() filtro_grupo:string;
  @Input() tabla_cms:string;
  @Input() campo_solicitado:string;
  @Input() campo_comprado:string;

  @Output() parameters = new EventEmitter();
  constructor(private modalService: NgbModal) { 
    this.filtroForm = new FormGroup({
      id_sede: new FormControl(this.id_sede),
      anio: new FormControl(this.anio),
      mes: new FormControl(this.mes),
      cod_tipo_planilla: new FormControl(this.cod_tipo_planilla),
      cod_empresa: new FormControl(this.cod_empresa),
      cod_colaborador: new FormControl(this.cod_colaborador),
      C_NOM_PERSONAL: new FormControl(this.C_NOM_PERSONAL),
    });
    var anioOp = Number(this.anio);
    while ( Number(anioOp) > 2017 ) {
      console.log(275, anioOp);
      
      const anioNew = {
         value: anioOp.toString(), label: anioOp.toString() 
      }
      this.optionsAnio.push(anioNew);
      anioOp--;
    }
  }

  ngOnInit(): void {
    console.log('hola filtro',this.filtro_grupo, this.tabla_cms, this.campo_solicitado, this.campo_comprado)
  }
  public onAnioChange(anio: any): void {
    this.anio = anio;
    this.periodo = this.anio + this.mes;
    // this.setPage({ offset: 0 });
  }
  public onMesChange(mes: any): void {
    this.mes = mes;
    this.periodo = this.anio + this.mes;
    // this.setPage({ offset: 0 });
  }
  filter() {
    console.log('hola filtro',this.filtro_grupo, this.tabla_cms, this.campo_solicitado, this.campo_comprado)

    // this.removeData(this.grafico1);
    // this.action = true;
    const form = this.filtroForm.value;
    const parameters = {

      cod_tipo_planilla: form.cod_tipo_planilla,
      cod_empresa : form.cod_empresa,
      cod_sucursal : form.id_sede,
      anio_proceso : form.anio,
      mes_proceso : form.mes,
      cod_colaborador: '',
      f_proceso: '',
      tipo_proceso: '',
      page: '1',
      start: '0',
      limit: '2500'

    }
    console.log(89, parameters)
    this.parameters.emit(parameters);
          // this.setPage({ offset: 0 });
  }
  enviar() {
    console.log('hola filtro',this.filtro_grupo, this.tabla_cms, this.campo_solicitado, this.campo_comprado)

    // this.removeData(this.grafico1);
    // this.action = true;
    const form = this.filtroForm.value;
    const parameters = {
      anio : form.anio,
      mes : form.mes,
      periodo: this.periodo,
      sede : form.id_sede,
      area : 'Todo',
      tipo: form.cod_tipo_planilla,
      origen : form.cod_empresa,

    }
    console.log(89, parameters)
    this.parameters.emit(parameters);
          // this.setPage({ offset: 0 });
  }
  buscar() {
    const  modalRef =  this.modalService.open(BuscarColaboradorComponent, {
      size: <any>"lg",
    }).result.then((result) => {
      this.filtroForm.controls['cod_colaborador'].setValue(result[0].COD_PERSONAL) 
      this.filtroForm.controls['C_NOM_PERSONAL'].setValue(result[0].C_NOM_PERSONAL)
      console.log(124, result);
    }, (reason) => {
      console.log(126, reason);
    });

  }
  async loading() {
        Swal.fire({
            html: "<div>Filtrando ...</div>",
            width: "200px",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
                Swal.showLoading();
            },
        });
  }
}

