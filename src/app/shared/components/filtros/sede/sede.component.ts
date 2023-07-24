import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { SharedService } from '../../../../Layout/shared.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss']
})
export class SedeComponent implements OnInit {
  filtroForm: FormGroup;
  // mes = moment(new Date()).format('MM');
  // anio = moment(new Date()).format('YYYY');
  // anioAnterior = moment(new Date()).subtract(1, 'years').format('YYYY');
  // periodo = this.anio + this.mes;
  // optionsMes = [
  //   { value: '01', label: 'Enero' },
  //   { value: '02', label: 'Febrero' },
  //   { value: '03', label: 'Marzo' },
  //   { value: '04', label: 'Abril' },
  //   { value: '05', label: 'Mayo' },
  //   { value: '06', label: 'Junio' },
  //   { value: '07', label: 'Julio' },
  //   { value: '08', label: 'Agosto' },
  //   { value: '09', label: 'Setiembre' },
  //   { value: '10', label: 'Octubre' },
  //   { value: '11', label: 'Noviembre' },
  //   { value: '12', label: 'Diciembre' },
  // ];
  // optionsAnio = [];
  @Input() isRangoFecha:boolean;
  @Input() filtro_grupo:string;
  @Input() tabla_cms:string;
  @Input() campo_solicitado:string;
  @Input() campo_comprado:string;
  @Input() option:string;
  @Output() parameters = new EventEmitter();
  isFuncionario: string;
  public menuItems: any = [];
  public subMenuItems: any = [];
  id_sede: string = '000';
  f_inicio = moment(this.restarDias(new Date, -30)).format('YYYY-MM-DD');
  f_fin = moment(new Date()).format('YYYY-MM-DD');
  constructor(private apiService:SharedService , private datePipe: DatePipe) { 
    // if(this.isRangoFecha){
    //   console.log('hola rango fecha')
    //   this.filtroForm = new FormGroup({
    //     id_sede: new FormControl(this.id_sede),
    //     f_inicio: new FormControl(this.f_inicio),
    //     f_fin: new FormControl(this.f_fin),
  
    //   });
    // }else {
    //   this.filtroForm = new FormGroup({
    //     id_sede: new FormControl(this.id_sede),
    //     // mes: new FormControl(this.mes),
  
    //   });
    // }
    this.filtroForm = new FormGroup({
      id_sede: new FormControl(this.id_sede),
      f_inicio: new FormControl(this.f_inicio),
      f_fin: new FormControl(this.f_fin),

    });
    // var anioOp = Number(this.anio);
    // while ( Number(anioOp) > 2017 ) {
    //   console.log(275, anioOp);
      
    //   const anioNew = {
    //      value: anioOp.toString(), label: anioOp.toString() 
    //   }
    //   this.optionsAnio.push(anioNew);
    //   anioOp--;
    // }
  }

  ngOnInit(): void {
    

  }
  restarDias(fecha, dias) {
    var fechalim = fecha.setDate(fecha.getDate() + dias);
    var fechas = this.datePipe.transform(fechalim, 'yyyy-MM-dd');
    return fechas;
  }
  // public onAnioChange(anio: any): void {
  //   this.anio = anio;
  //   this.periodo = this.anio + this.mes;
  //   // this.setPage({ offset: 0 });
  // }
  // public onMesChange(mes: any): void {
  //   this.mes = mes;
  //   this.periodo = this.anio + this.mes;
  //   // this.setPage({ offset: 0 });
  // }
  // getModelsAdmin() {
  //   console.log(localStorage.getItem('idrol'))
  //   this.apiService.getMenuSidebarAdminService(localStorage.getItem('idrol')).then((response: any) => {

  //     this.subMenuItems = [];
  //      this.menuItems = response.data.length > 0 ? response.data : [];
  //      this.menuItems.map(item => {
  //         if(item.name_model === 'RRHH'){
  //           item.rides.map(submenu =>{
  //             if(submenu.name === 'Estad. Planilla - IndicadoresFuncionarios'){
  //               this.isFuncionario = '1';
  //             }else{
  //               this.isFuncionario = '0';
  //             }
  //           });
            
  //         }
         
  //      }) 

  //   });
  // }
  // getModelsUsers() {
  //   this.apiService.getMenuSidebarPermissionRoleService(localStorage.getItem('idrol')).then((response: any) => {

  //     this.subMenuItems = [];
  //      this.menuItems = response.data.length > 0 ? response.data : [];
  //      this.menuItems.map(item => {
  //       if(item.name_model === 'RRHH'){
  //         item.rides.map(submenu =>{
  //           if(submenu.name === 'Estad. Planilla - IndicadoresFuncionarios'){
  //             this.isFuncionario = '1';
  //           }else{
  //             this.isFuncionario = '0';
  //           }
  //         });
          
  //       }
       
  //    }) 

  //   });
  //   // this.categories.sort((a, b) => a.id - b.id);
    
  // }
  filter() {
    console.log('hola filtro',this.filtro_grupo, this.tabla_cms, this.campo_solicitado, this.campo_comprado)
    
    // this.removeData(this.grafico1);
    // this.action = true;
    const form = this.filtroForm.value;
    if (this.isRangoFecha){
      const parameters = {
        // periodo: this.periodo,
        id_sede : form.id_sede,
        f_inicio : form.f_inicio,
        f_fin : form.f_fin,
      }
      this.parameters.emit(parameters);
    }else{
      const parameters = {
        // periodo: this.periodo,
        sede : form.id_sede,
        sedeTXT : form.id_sede === '0000' ? 'Todos' : form.id_sede === '0001' ? 'Lima' :  form.id_sede === '0002' ? 'Chorrillos' : 'Surco'
        // anio : form.anio,
      }
      this.parameters.emit(parameters);
    }
    
    
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
