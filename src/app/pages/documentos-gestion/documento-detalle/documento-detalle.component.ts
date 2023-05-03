import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentosGestionService } from 'src/app/_services/documentos-gestion.service';
import { DocsComponent } from 'src/app/modals/claims/docs/docs.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documento-detalle',
  templateUrl: './documento-detalle.component.html',
  styleUrls: ['./documento-detalle.component.scss']
})
export class DocumentoDetalleComponent implements OnInit {
  value: any;
  menuItems;
  parameters: {};
  constructor(private route: ActivatedRoute,  private location: Location, private modalService: NgbModal, private api_service: DocumentosGestionService, private router: Router,) { }

  ngOnInit(): void {
    this.parameters = this.route.snapshot.params; 
    console.log(20, this.route.snapshot.params);
    this.getCategoriesDocuments();
  }
  async getCategoriesDocuments(){

this.loading();
   await this.api_service.DgGetFile(this.parameters).subscribe(
      (response) => {
        console.log(126, response)
        if(response.success){
          this.menuItems = response.data
          this.menuItems.map(item =>{
            if(item.imagen){
              item.imagen = `${environment.apiImage}assets/images/${item.imagen}`;
              
            }else{
              item.imagen = `${environment.apiImage}assets/images/default.svg`;
            }
            return item;
         })
        }
        Swal.close();
      },
      (error) => {
          Swal.close();
      }
    );
  }
  onCardClick(item)
  {
    console.log(48, item)
    if(item){
      const url = environment.apiImage + "assets/pdf/" + item.ruta;
      // const url = environment.apiImage + "/assets/pdf/" + item.files[0].ruta;
      const data = {
          url: url,
          name: item.ruta
      };
      const modalRef = this.modalService.open(DocsComponent, {
          // size: <any>"xl",
          size: <any>"xxl",
          windowClass: 'modal-fullscreen',
      });
      modalRef.componentInstance.dato = data;
      modalRef.result
          .then((result) => {
              if (result.success) {
                  // this.getListMedidas();
              }
          })
          .catch((error) => {
              console.log(error);
          });
    }
  }
  goBack(): void {
    this.location.back();
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
