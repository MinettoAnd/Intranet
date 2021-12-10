import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import { IConvenios } from 'src/app/pages/models/claims/IConvenios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.sass']
})
export class ConveniosComponent implements OnInit {
  @Input() dato;
  page = 1;
  pageSize = 50;
  collectionSize;
  convenios: IConvenios[];
  public listseguros: any = [];
  seachForm: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private apiService: ClaimsService, private formBuilder: FormBuilder) {
    this.seachForm = this.formBuilder.group({
      textempresa: [''],
    });
  }

  ngOnInit(): void {
    if (this.dato != '') {
      this.searchConvenios()
    }

  }



  refreshCountries() {
    this.convenios = this.listseguros
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  searchConvenios() {
    this.submitted = true;
    if (this.seachForm.invalid) {
      return;
    }
    var formControl = this.seachForm.value;
    const data = {
      empresa: formControl.textempresa,
      id: parseInt(this.dato)
    }
    this.loading('Realizando Filtro ...');

    this.apiService.getConveniosSeguroByIdService(data).then((response: any) => {
      this.listseguros = response.length > 0 ? response : [];
      this.collectionSize = this.listseguros.length;
      this.refreshCountries();
      Swal.close();
    }, (error) => {
      Swal.close();
    });
  }
  getDataConvenios(data) {
    this.activeModal.close(data)
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
}
