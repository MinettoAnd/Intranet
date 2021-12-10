import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() datafiles;
  myFiles: string[] = [];
  archivos: any = [];
  newArrayArchivos: any = [];
  public textLoadion: string = "";
  constructor(public activeModal: NgbActiveModal, private apiService: ClaimsService) { }

  ngOnInit(): void {
    if (this.datafiles.archivos.length > 0) {
      this.newArrayArchivos = this.datafiles.archivos;
    }

  }
  //detalle
  onFileChange(event) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    this.archivos = this.myFiles;

  }
  removeSelectedFile(index) {
    // Delete the item from fileNames list
    this.archivos.splice(index, 1);
    // delete file from FileList

  }

  saveFiles() {
    const formData = new FormData();
    ///this.archivos = this.myFiles;
    if (this.archivos.length <= 0) {
      return console.log('upload fail')
    }
    for (var i = 0; i < this.archivos.length; i++) {
      formData.append('archivos', this.archivos[i]);
    }
    this.textLoadion = "Subiendo Archivos...";
    this.showLoading();
    console.log(formData);
    this.apiService.uploadFilesService(formData).then((response: any) => {
      //response.namefiles
      console.log('upload archivos exitoso');
      for (var i = 0; i < response.namefiles.length; i++) {
        this.newArrayArchivos.push(response.namefiles[i])
      }

      if (response.ok) {
        const data = {
          empresa: this.datafiles.empresa,
          archivos: this.newArrayArchivos,
          id_reclamo: this.datafiles.id_reclamo
        }
        console.log(data);
        if (this.datafiles.estado) {
          this.apiService.updateReclamoFilesService(data).then((result) => {
            console.log('update archivos exitoso');
            Swal.close();
            const data = {
              success: 1
            }
            this.activeModal.close(data)
          }).catch((err) => {
            console.log('error', err);
            Swal.close();
          });
        } else {
          this.apiService.updateReclamoFilesServiceReclamo(data).then((result) => {
            Swal.close();
            this.success();
            console.log('update archivos exitoso respuesta reclamo');
          }).catch((err) => {
            console.log('error', err);
          });
        }

      }
    });
  }

  showLoading() {
    Swal.fire({
      text: this.textLoadion,
      width: '15rem',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      }
    })
  }
  success() {
    Swal.fire({
      title: 'Exitoso!',
      width: '20rem',
      icon: 'success'
    })
  }
}
