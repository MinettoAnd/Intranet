import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import { IPaciente } from 'src/app/pages/models/claims/IPaciente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.sass']
})
export class PersonalComponent implements OnInit {
  @Input() datapersonal;
  page = 1;
  pageSize = 50;
  collectionSize;
  pacientes: IPaciente[];
  public listpersonal: any = [];
  public listjefeinvolucrado: any = [];
  constructor(public activeModal: NgbActiveModal, private apiService: ClaimsService) { }

  ngOnInit() {
    this.collectionSize = this.datapersonal.length;
    this.refreshCountries();
  }
  refreshCountries() {
    this.pacientes = this.datapersonal
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  getDetailInvolucrado(id) {
    this.loading('Filtrando...');
    this.apiService.getListPersonalByIdService(id).then((response: any) => {
      this.listpersonal = response.length > 0 ? response : [];
      const data = {
        personal: this.listpersonal,
      }
      this.activeModal.close(data)
      Swal.close();

    }, (error) => {
      Swal.close();
    });

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
