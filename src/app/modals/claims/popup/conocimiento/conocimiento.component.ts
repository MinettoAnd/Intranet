import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import { IPaciente } from 'src/app/pages/models/claims/IPaciente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conocimiento',
  templateUrl: './conocimiento.component.html',
  styleUrls: ['./conocimiento.component.sass']
})
export class ConocimientoComponent implements OnInit {
  @Input() datapersonal01;
  @Input() datapersonal02;
  @Input() datapersonal03;
  @Input() datapersonal04;
  @Input() datapersonal05;
  page = 1;
  pageSize = 50;
  collectionSize;
  personal: IPaciente[];
  public validarnumero: number = 0;
  public listdetailpersonal: any = [];
  constructor(public activeModal: NgbActiveModal, private apiService: ClaimsService) { }

  ngOnInit(): void {
    this.refreshCountries();
  }
  refreshCountries() {
    if (this.datapersonal01 != undefined) {
      this.validarnumero = 1;
      this.collectionSize = this.datapersonal01.length;
      this.personal = this.datapersonal01
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    if (this.datapersonal02 != undefined) {
      this.validarnumero = 2;
      this.collectionSize = this.datapersonal02.length;
      this.personal = this.datapersonal02
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    if (this.datapersonal03 != undefined) {
      this.validarnumero = 3;
      this.collectionSize = this.datapersonal03.length;
      this.personal = this.datapersonal03
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

    if (this.datapersonal04 != undefined) {
      this.validarnumero = 4;
      this.collectionSize = this.datapersonal04.length;
      this.personal = this.datapersonal04
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    if (this.datapersonal05 != undefined) {
      this.validarnumero = 5;
      this.collectionSize = this.datapersonal05.length;
      this.personal = this.datapersonal05
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

  }

  getPersonal(item, dato) {
    this.loading('Filtrando...');
    if (dato === 1) {
      this.apiService.getDetailInvolucradoService(item.Persona).then((response: any) => {
        this.listdetailpersonal = response.length > 0 ? response : [];
        Swal.close();
        const data = {
          cod: 1,
          persona01: this.listdetailpersonal
        }
        this.activeModal.close(data)
      }, (error) => {
        Swal.close();
      });
    }
    if (dato === 2) {
      this.apiService.getDetailInvolucradoService(item.Persona).then((response: any) => {
        this.listdetailpersonal = response.length > 0 ? response : [];
        const data = {
          cod: 2,
          persona02: this.listdetailpersonal
        }
        this.activeModal.close(data)
        Swal.close();
      }, (error) => {
        Swal.close();
      });
    }
    if (dato === 3) {
      this.apiService.getDetailInvolucradoService(item.Persona).then((response: any) => {
        this.listdetailpersonal = response.length > 0 ? response : [];
        const data = {
          cod: 3,
          persona03: this.listdetailpersonal
        }
        this.activeModal.close(data)
        Swal.close();
      }, (error) => {
        Swal.close();
      });
    }
    if (dato === 4) {
      this.apiService.getDetailInvolucradoService(item.Persona).then((response: any) => {
        this.listdetailpersonal = response.length > 0 ? response : [];
        const data = {
          cod: 4,
          persona04: this.listdetailpersonal
        }
        this.activeModal.close(data)
        Swal.close();
      }, (error) => {
        Swal.close();
      });
    }
    if (dato === 5) {
      const data = {
        cod: 5,
        persona05: item
      }
      this.activeModal.close(data)
      Swal.close();

    }

  }

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

}
