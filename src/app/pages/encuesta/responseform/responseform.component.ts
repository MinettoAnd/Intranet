import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormularioService } from 'src/app/pages/encuesta/formulario.service';
import { Router } from '@angular/router';
import { AgGridAngular } from "ag-grid-angular";
import Swal from 'sweetalert2';
//import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-responseform',
  templateUrl: './responseform.component.html',
  styleUrls: ['./responseform.component.css']
})
export class ResponseformComponent implements OnInit {
  data: any = [];
  /* fechaRegistro : any = [];
  sucursal : any = [];
  modalidad : any = [];
  paciente: any = []; */
  
  //dataEnc:any;
  @ViewChild("agGrid") agGrid: AgGridAngular;
  columnDefs;
  /* frameworkComponents;
  tooltipShowDelay;
  defaultColDef; */
  rowData: any;
  style = {
    width: "100%",
    height: "100%",
    flex: "1 1 auto",
};
  element = false;
  idData: any;
  constructor(private formularioService: FormularioService,
    private router: Router,
    //private spinner: NgxSpinnerService
    ) {
      

  }

  refresh(){
    this.formularioService.getFormulario().subscribe(
      (res:any) => {
        console.log(res);
        this.data = res.body;
        console.log(20,this.data);
      });
      this.loading();
      this.router.navigateByUrl('encuesta/resultadoencuesta');

  }

  hideData() {
    return (this.element = true);
  }
  returnForm(){

    //this.spinner.show();
    //setTimeout(() => {
      //location.href = 'https://www.maisondesante.org.pe/encuestas/'
      //location.href = 'http://localhost:4200'
       //this.router.navigateByUrl('/encuestas');
       this.loading();
       this.router.navigateByUrl('encuesta');

      /** spinner ends after 5 seconds */
      //this.spinner.hide();
      this.hideData();

    //}, 5000);
  }

  getdata(){
    this.formularioService.getFormulario().subscribe(
    (res:any) => {
      console.log(res);
      this.data = res.body;
     
      
      this.idData = this.data[0].paciente;
      //this.data = JSON.stringify(res.body);
      console.log(10,JSON.stringify(this.idData));

      //let dataEnc = data.body;
      console.log(20,this.data);
      console.log(21, this.data[0]);
      console.log(typeof JSON.stringify(this.data))
      console.dir(22,this.data[0].paciente);
      //let date = this.data.updated_at;
      //let hour = this.data[1].updated_at;
      //console.log(10,dataEnc);
      //console.log(11,date);
      //console.log(12,hour);     
    }); 

  };
  async loading() {
    Swal.fire({
      text: 'Validando ...',
      width: '200px',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      },
    });
  }



  ngOnInit(): void {
    //this.data.sort()
    this.getdata()
    //JSON.stringify(this.getdata());
    //console.log(30,JSON.stringify(this.getdata()));
    console.log(300, this.data);
    setTimeout(() => console.log(400,this.data), 5000);

  }



}





