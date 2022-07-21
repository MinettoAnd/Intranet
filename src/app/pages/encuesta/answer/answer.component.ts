import { Component, OnInit } from '@angular/core';
//import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  public loadingen: boolean;
  element = false;
  constructor(//private spinner: NgxSpinnerService,
    private router: Router) { 
      this.loadingen = false;
    }

  ngOnInit(): void {
  }

  showData() {
    return (this.element = true);
  }
  hideData() {
    return (this.element = false);
  }
  showSpinner(){
    return (this.loadingen = true);
  }
  hideSpinner(){
    return (this.loadingen = false);
  }

  getdataEncuesta(){ 
    this.showData();
    this.showSpinner()
    setTimeout(() => {      
      this.hideSpinner()      
      this.router.navigateByUrl('/encuesta/resultadoencuesta');
      
    }, 3000);

    //this.router.navigateByUrl('encuestas/resultadoencuesta');
    
    
  }
  returnForm(){    
    this.showData();
    this.showSpinner()
    
    console.log(this.element);

    setTimeout(() => {
      this.router.navigateByUrl('/encuesta');
      this.hideSpinner()
      this.hideData();
      
    }, 3000);
    
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
