import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import { Router } from '@angular/router';
import { AgGridAngular } from "ag-grid-angular";
//import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-responseform',
  templateUrl: './responseform.component.html',
  styleUrls: ['./responseform.component.css']
})
export class ResponseformComponent implements OnInit {
  data: any = [];
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
  constructor(private formularioService: ClaimsService,
    private router: Router,
    //private spinner: NgxSpinnerService
    ) {
      this.columnDefs =[
        {headerName: "FECHA"},
        {headerName: "HORA"},
        {headerName: "SEDE"},
        {headerName: "ORIGEN DE ATENCIÓN"},
        {headerName: "TIPO DE PACIENTE"}
      ]

  }

  refresh(){
    this.formularioService.getFormulario().subscribe(
      (res:any) => {
        console.log(res);
        this.data = res.body;
        console.log(20,this.data);
      });
      this.router.navigateByUrl('/claims/resultadoencuesta');

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
       this.router.navigateByUrl('/claims/encuesta');

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

      //let dataEnc = data.body;
      console.log(20,this.data);
      //let date = this.data.updated_at;
      //let hour = this.data[1].updated_at;
      //console.log(10,dataEnc);
      //console.log(11,date);
      //console.log(12,hour);
    });


  };



  ngOnInit(): void {
    //this.data.sort()
    this.getdata();

  }



}





