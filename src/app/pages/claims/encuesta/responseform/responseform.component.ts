import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import { Router } from '@angular/router';
//import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-responseform',
  templateUrl: './responseform.component.html',
  styleUrls: ['./responseform.component.css']
})
export class ResponseformComponent implements OnInit {
  data: any = [];
  //dataEnc:any;
  element = false;
  constructor(private formularioService: ClaimsService,
    private router: Router
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
      this.router.navigateByUrl('/claims/encuesta/resultadoencuesta');

  }

  hideData() {
    return (this.element = true);
  }
  returnForm(){
   
    this.router.navigateByUrl('/claims/encuesta');
    this.hideData();
    console.log(this.element);
    //this.spinner.show();
    //setTimeout(() => {
      //location.href = 'https://www.maisondesante.org.pe/encuestas/'
      //location.href = 'http://localhost:4200'
       //this.router.navigateByUrl('/encuestas');
       //this.router.navigateByUrl('/');

      /** spinner ends after 5 seconds */
      //this.spinner.hide();
      //this.hideData();

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


