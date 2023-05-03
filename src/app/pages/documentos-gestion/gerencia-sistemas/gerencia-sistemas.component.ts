import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentosGestionService } from 'src/app/_services/documentos-gestion.service';
import { DocsComponent } from 'src/app/modals/claims/docs/docs.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gerencia-sistemas',
  templateUrl: './gerencia-sistemas.component.html',
  styleUrls: ['./gerencia-sistemas.component.scss']
})
export class GerenciaSistemasComponent implements OnInit {
  menuItems;
// menuItems = [
//     {
//       "documento": "Organigrama",
//       "idTipoDocumento": "1",
//       "tipo": "C",
//       "orden": "4",
//       "files": [
//         {
//           "idMenu": "",
//           "idTipoDocumento": "",
//           "documento": "",
//           "imagen": "",
//           "ruta": "",
//           "orden": ""
//         },
//         {
//           "idMenu": "",
//           "idTipoDocumento": "",
//           "documento": "",
//           "imagen": "",
//           "ruta": "",
//         },
//       ]
//     },
//     {
//       "documento": "Manual de Organización y Funciones",
//       "idTipoDocumento": "2",
//       "tipo": "C",
//       "orden": "2",
//     },
//     {
//       "documento": "Manual de Perfil de Puestos",
//       "idTipoDocumento": "3",
//       "tipo": "C",
//       "orden": "1",
//     },
//     {
//       "documento": "Politicas de Seguridad de la Información",
//       "idTipoDocumento": "4",
//       "tipo": "A",
//       "orden": "5",
//       "files": [
//         {
//           "idMenu": "",
//           "idTipoDocumento": "",
//           "documento": "",
//           "imagen": "",
//           "ruta": "CORREO_PASCOCORONADOZARELLAESTEFANY_216d0342-f20c-4935-8916-2d22fc2d2068.pdf",
//         },
//       ]
//     },
//     {
//       "documento": "Memoria",
//       "idTipoDocumento": "5",
//       "tipo": "C",
//       "orden": "3",
//       "files": [
//         {
//           "idMenu": "",
//           "idTipoDocumento": "",
//           "documento": "",
//           "imagen": "",
//           "ruta": "",
//         },
//         {
//           "idMenu": "",
//           "idTipoDocumento": "",
//           "documento": "",
//           "imagen": "",
//           "ruta": "",
//         },
//       ]
//     },
//   ]
  parameters: {};

  constructor(private modalService: NgbModal, private api_service: DocumentosGestionService, private router: Router,) { 
    
  }

  ngOnInit() {
    // const menu = JSON.parse(localStorage.getItem('menuItems'));
    // console.log(97, menu)
    // localStorage.getItem('menuItems');
    this.getCategoriesDocuments();
  }
async getCategoriesDocuments(){

    this.parameters = {
      idMenu: '50'
    };
    this.loading()
   await this.api_service.DgGetDocuments(this.parameters).subscribe(
      (response) => {
        // this.rows = [];
        // this.columns = [];
        // this.progressBarLabels4 = [];
        console.log(110, response)
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
    console.log(48, item.tipo)
    if(item.tipo === 'A'){
      const url = environment.apiImage + "assets/pdf/" + item.files[0].ruta;
      // const url = environment.apiImage + "/assets/pdf/" + item.files[0].ruta;
      const data = {
          url: url,
          name: item.files[0].ruta
      };
      const modalRef = this.modalService.open(DocsComponent, {
          size: <any>"xxl",
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
    }if(item.tipo === 'C'){
      console.log('esto es una ruta')
      // this.router.navigate(['../../files', 1]);
      this.router.navigateByUrl('/documentosGestion/gerenciaSistemas/files/' + item.idTipoDocumento);
    }
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
