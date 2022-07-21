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
public loadingen: boolean;
element = false;
 
  constructor(private formularioService: FormularioService,
    private router: Router) 
    {
      this.loadingen = false;    

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

  refresh(){
    this.formularioService.getFormulario().subscribe(
      (res:any) => {
        console.log(res);
        this.data = res.body;
        console.log(20,this.data);
      });
      this.showData();
      this.showSpinner()

      setTimeout(() => {
        this.router.navigateByUrl('/encuesta/resultadoencuesta');
        
        this.hideData();
        this.hideSpinner();
      
      }, 3000);

  }

  
  returnForm(){
    this.showData();
    this.showSpinner()
    
    console.log(this.element);

    setTimeout(() => {
      this.router.navigateByUrl('/encuesta');
      
      this.hideData();
      this.hideSpinner()
      
    }, 3000);

    //this.spinner.show();
    //setTimeout(() => {
      //location.href = 'https://www.maisondesante.org.pe/encuestas/'
      //location.href = 'http://localhost:4200'
       //this.router.navigateByUrl('/encuestas');    
      

    //}, 5000);
  }

  getdata(){
    this.formularioService.getFormulario().subscribe(
    (res:any) => {
      console.log(res);
      this.data = res.body;    
    

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
 



  ngOnInit(): void {
    //this.data.sort()
    this.getdata()
    //JSON.stringify(this.getdata());
    //console.log(30,JSON.stringify(this.getdata()));
    console.log(300, this.data);
    setTimeout(() => console.log(400,this.data), 5000);

  }



}





