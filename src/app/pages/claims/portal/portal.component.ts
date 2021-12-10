import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { IClaims } from '../../models/claims/IClaims';
import { ClaimsService } from '../claims.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.sass']
})
export class PortalComponent implements OnInit {
  public listclaims: any = [];
  page = 1;
  pageSize = 20;
  collectionSize;
  submittedsearh = false;
  claimslist: IClaims[];
  formSearchReclamo: FormGroup;
  constructor(private apiService: ClaimsService, private formBuilder: FormBuilder,
    private datePipe: DatePipe, private modalService: NgbModal) {
    this.formSearchReclamo = this.formBuilder.group({
      fechainicio: [this.restarDias(new Date, 7)],
      fechafin: [this.datePipe.transform(new Date, 'yyyy-MM-dd')],
      afectado: [''],
      sede: [''],
      estado: ['3'],

    });
  }

  ngOnInit() {
    this.searhReclamo();
  }


  refreshCountries() {
    this.claimslist = this.listclaims
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  searhReclamo() {
    const form = this.formSearchReclamo.value;
    const data = {
      fecha_registro1: this.datePipe.transform(form.fechainicio, 'yyyy-MM-dd'),
      fecha_registro2: this.datePipe.transform(form.fechafin, 'yyyy-MM-ddy'),
      nombre: form.afectado,
      sede: form.sede,
      estado: parseInt(form.estado),
    }
    console.log(data)
    this.loading('Realizando Busqueda....')
    this.apiService.getListClaimsPortalWebService(data).then((response: any) => {
      Swal.close();
      this.listclaims = response.data.length > 0 ? response.data : [];
      console.log(this.listclaims);
      if (this.listclaims.length >= 1) {
        this.collectionSize = this.listclaims.length;
        this.refreshCountries();
      } else {
        this.collectionSize = this.listclaims.length;
        this.refreshCountries();
        Swal.fire(
          'Info',
          'Busqueda sin ninguna coincidencia con el dato ingresado ',
          'info'
        )
      }

    }, (error) => {
      Swal.close();
      console.log(error);
    });
  }
  rgetFormatFeha(fecha) {
    var fechas = "";
    if (fecha != '0000-00-00 00:00:00') {
      fechas = this.datePipe.transform(fecha, 'dd/MM/yyyy');
    }

    return fechas;
  }
  showClaims(dato) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.dato = dato;

  }
  restarDias(fecha, dias) {
    var fechalim = fecha.setDate(fecha.getDate() - dias);
    var fechas = this.datePipe.transform(fechalim, 'yyyy-MM-dd');
    return fechas;
  }

  //loading
  async loading(searchtxt) {
    Swal.fire({
      html: `<h3 style="font-size:12px;text-align: center;">${searchtxt}</h3>`,
      width: '250px',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      },
    });
  }
  chageContac(celular, telefono) {
    if (celular === '') {
      return telefono;
    } else {
      return celular;
    }
  }
  chameNameSede(sede) {
    if (sede === 'CMS Lima') {
      return 'Lima';
    } else if (sede === 'CMS Chorrillos') {
      return 'Chorrillos';
    } else if (sede === 'CMS Surco') {
      return 'Surco';
    }
  }
}
