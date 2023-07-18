import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filter-procedimientos',
  templateUrl: './filterProcedimientos.component.html',
  styleUrls: ['./filterProcedimientos.component.scss']
})
export class FilterProcedimientosComponent implements OnInit {
  filtroForm: FormGroup;
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  anioAnterior = moment(new Date()).subtract(1, 'years').format('YYYY');
  periodo = this.anio + this.mes;
  origen_atencion: string = '0';
  filter_Tipo: string = '0';
  id_sede:string = '0001'
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
  constructor() { 
    this.filtroForm = new FormGroup({
      id_sede: new FormControl(this.id_sede),
      anio: new FormControl(this.anio),
      mes: new FormControl(this.mes),
      filter_Tipo: new FormControl(this.filter_Tipo),
      origen_atencion: new FormControl(this.origen_atencion),

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
      periodo_consulta: this.periodo,
      mes : form.mes,
      anio : form.anio,
      sede : form.id_sede,
      origen_atencion : form.origen_atencion,
      filter_Tipo : form.filter_Tipo,
      filtro_grupo: this.filtro_grupo,
      tabla_cms: this.tabla_cms,
      campo_solicitado: this.campo_solicitado,
      campo_comprado: this.campo_comprado,
    }
    console.log(89, parameters)
    this.parameters.emit(parameters);
          // this.setPage({ offset: 0 });
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
