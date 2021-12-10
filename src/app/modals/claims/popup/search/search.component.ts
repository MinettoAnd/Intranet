import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import { IPaciente } from 'src/app/pages/models/claims/IPaciente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() datasearsh;
  @Input() detailpaciente;
  page = 1;
  pageSize = 50;
  collectionSize;
  pacientes: IPaciente[];
  public listdetailpaciente: any = [];
  constructor(public activeModal: NgbActiveModal, private apiService: ClaimsService) { }

  ngOnInit(): void {
    this.collectionSize = this.datasearsh.length;
    this.refreshCountries();
  }

  refreshCountries() {
    this.pacientes = this.datasearsh
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  getDetailPaciente(id) {
    this.loading('Filtrando...');
    this.apiService.getDetailPacienteService(id).then((response: any) => {
      this.listdetailpaciente = response.length > 0 ? response : [];
      this.activeModal.close(this.listdetailpaciente)
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
