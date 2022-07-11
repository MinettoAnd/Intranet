import { Component, OnInit } from '@angular/core';
//import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  element = false;
  constructor(//private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  showData() {
    return (this.element = false);
  }
  hideData() {
    return (this.element = true);
  }

  getdataEncuesta(){
    //this.router.navigateByUrl('encuestas/resultadoencuesta');
    this.router.navigateByUrl('/claims/encuesta/resultadoencuesta');
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
       
       
      /** spinner ends after 5 seconds */
      //this.spinner.hide();
      //this.hideData();
      
    //}, 5000);
  }

}
