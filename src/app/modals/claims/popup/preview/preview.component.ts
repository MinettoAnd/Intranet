import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from 'src/app/pages/claims/claims.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {
  @Input() dato;
  public dataprints: any = [];
  public areas_ingresa: any = [];
  public sedename: string = ""
  fecha_evento = "";
  fecha_reclamo = "";
  codigo_empresa = "";
  codigo_ipress = "";
  codigo_n = "";
  autorizado = "";
  desautorizado = "";
  public listdepartamentos: any = [];
  public listprovincias: any = [];
  public listdistritos: any = [];
  public regionname: string = "";
  public provincianame: string = "";
  public distritoname: string = "";

  public resultname: string = "";
  public resultpaterno: string = "";
  public resultmaterno: string = "";
  public archivos: any = [];

  public codigo_iafas_ipress: string = "";
  public codigo_iafas: string = "";
  public direccion: string = "";
  public nombreSUSALUD: string = "";
  public acrion_realizada: string = "";
  public correlativo_correcto: string = "";
  public logo_iafas_ipress: string = "";
  //showtemplate
  showtemplate_new = false;
  showtemplate_old = false;
  constructor(public activeModal: NgbActiveModal, private apiService: ClaimsService, private datePipe: DatePipe) { }

  ngOnInit() {
    if (this.dato.showtemplate === 1) {
      this.showtemplate_new = false;
      this.showtemplate_old = true;
    } else if (this.dato.showtemplate === 2) {
      this.showtemplate_new = true;
      this.showtemplate_old = false;
    }
    this.getDataPrint();

  }

  print() {
    // let printData =document.write(document.getElementById('dataToPrint').innerHTML);
    var mywindow = window.open('mm', 'PRINT', 'height=600,width=1000');
    mywindow.document.write('<html>');
    mywindow.document.write('</head><body >');
    if (this.dato.showtemplate === 2) {
      mywindow.document.write(document.getElementById('dataToPrint').innerHTML);
    } else if (this.dato.showtemplate === 1) {
      mywindow.document.write(document.getElementById('dataToPrint2').innerHTML);
    }

    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();

    return true;
  }
  getDataPrint() {

    const data = {
      empresa: this.dato.empresa,
      idreclamo: this.dato.idreclamo
    }
    this.apiService.postPrintService(data).then((response: any) => {
      this.dataprints = response.data.length > 0 ? response.data : [];
      if(this.dataprints[0]?.v_acciones_tomadas === null){
        this.dataprints[0].v_acciones_tomadas = '';
        // console.log(90, this.dataprints[0]?.v_acciones_tomadas)
      }
    var splitted = this.dataprints[0]?.v_acciones_tomadas.split("/", 2);
    this.acrion_realizada = splitted[0];

      this.sede(this.dataprints[0]?.id_sede)
      if (this.dato.empresa === 'IAFAS') {
        this.correlativo_correcto = ("000000" + this.dataprints[0]?.v_correlativo_reclamo).slice(-6);
      } else {
        this.correlativo_correcto = ("000000" + this.dataprints[0]?.idcorrelativo).slice(-6);
      }


      if (this.dataprints[0]?.id_tipo_pacientev2 === 3) {
        this.codigo_empresa = "20027";
      } else if (this.dataprints[0]?.id_tipo_pacientev2 === 21) {
        this.codigo_empresa = "20027";
      }
      else if (this.dataprints[0]?.id_tipo_pacientev2 === 18) {
        this.codigo_empresa = "20027";
      }
      else {
        this.codigo_empresa = this.dataprints[0]?.v_empresa_codigo;
      }

      if (this.dataprints[0]?.autoriza_rpta_email == "1") {
        this.autorizado = "X"
      } else {
        this.desautorizado = "x"
      }
      this.archivos = JSON.parse(this.dataprints[0]?.archivos);
      console.log(this.archivos)
      if (this.dataprints[0]?.v_cod_medico != 0) {
        console.log('exitoso', this.dataprints[0]?.v_nombre_medico)
        this.resultname = this.dataprints[0]?.v_nombre_medico;
        this.resultpaterno = this.dataprints[0]?.v_apellido_p_medico;
        this.resultmaterno = this.dataprints[0]?.v_apellido_m_medico;
      } else if (this.dataprints[0]?.c_afiliado3 != "" || this.dataprints[0]?.c_afiliado3 != "0") {
        this.resultname = this.dataprints[0]?.v_nombres3;
        this.resultpaterno = this.dataprints[0]?.v_p_apellidos3;
        this.resultmaterno = this.dataprints[0]?.v_m_apellidos3;
      }

      // this.fecha_evento = this.datePipe.transform(this.dataprints[0]?.fecha, 'dd/MM/yyyy');
      this.fecha_reclamo = this.datePipe.transform(this.dataprints[0]?.d_registra_reclamo, 'dd/MM/yyyy hh:mm:ss');
      this.getDepartament()
    }).catch((err) => {

    });
  }


  sede(id) {
    switch (id) {
      case 1:
        this.sedename = 'Lima';
        if (this.dato.empresa === 'IAFAS') {
          console.log('exitoso')
          this.codigo_iafas_ipress = "20027";//00020027
          this.codigo_iafas = "00020027";
          this.direccion = "Jirón Miguel Aljovin 222, Cercado de Lima";
          this.nombreSUSALUD = "CSALUD S.A.";
          this.logo_iafas_ipress = "http://webserver.maisondesante.org.pe/html2/oswtest/portal_sisr/images/logo-club-de-la-salud_100.png";
        } else {
          this.codigo_iafas_ipress = "8281";//00008281
          this.codigo_ipress = "00008281";
          this.direccion = "Jirón Miguel Aljovin 222, Cercado de Lima";
          this.nombreSUSALUD = "CLINICA MAISON DE SANTE DE LIMA";
          this.logo_iafas_ipress = "http://webserver.maisondesante.org.pe/html2/oswtest/portal_sisr/images/logo-cms_100.png";
        }

        break;
      case 2:
        this.sedename = 'Chorrillos';
        if (this.dato.empresa === 'IAFAS') {
          this.codigo_iafas_ipress = "20027";
          this.codigo_iafas = "00020027";
          this.direccion = "Av. Chorrillos 171, Chorrillos";
          this.nombreSUSALUD = "CSALUD S.A.";
          this.logo_iafas_ipress = "http://webserver.maisondesante.org.pe/html2/oswtest/portal_sisr/images/logo-club-de-la-salud_100.png";
        } else {
          this.codigo_iafas_ipress = "10251";//00010251
          this.direccion = "Av. Chorrillos 171, Chorrillos";
          this.codigo_ipress = "00010251";
          this.nombreSUSALUD = "CLINICA MAISON DE SANTE DEL SUR";
          this.logo_iafas_ipress = "http://webserver.maisondesante.org.pe/html2/oswtest/portal_sisr/images/logo-cms_100.png";
        }

        break;
      case 4:
        this.sedename = 'Surco';
        if (this.dato.empresa === 'IAFAS') {
          this.codigo_iafas_ipress = "20027";
          this.codigo_iafas = "00020027";
          this.direccion = "Av. Alfredo Benavides 5362, Santiago de Surco";
          this.nombreSUSALUD = "CSALUD S.A.";
          this.logo_iafas_ipress = "http://webserver.maisondesante.org.pe/html2/oswtest/portal_sisr/images/logo-club-de-la-salud_100.png";
        } else {
          this.codigo_iafas_ipress = "15118";//00015118
          this.direccion = "Av. Alfredo Benavides 5362, Santiago de Surco";
          this.codigo_ipress = "00015118";
          this.nombreSUSALUD = "CLINICA MAISON DE SANTE DEL ESTE";
          this.logo_iafas_ipress = "http://webserver.maisondesante.org.pe/html2/oswtest/portal_sisr/images/logo-cms_100.png";
        }

        break;

      default:
        break;
    }
  }

  getDepartament() {
    this.apiService.getDepartamentoByIdService(this.dataprints[0]?.id_departamento.trim()).then((response: any) => {
      this.listdepartamentos = response;
      if (this.listdepartamentos === null || this.listdepartamentos === '') {
        this.regionname === ""
      } else {
        this.regionname = this.listdepartamentos.DescripcionCorta
      }
      //console.log(this.listdepartamentos);
      this.getPrivincia();
    });
  }
  getPrivincia() {
    this.apiService.getProvinciaByIdService(this.dataprints[0]?.id_departamento.trim(), this.dataprints[0]?.id_provincia.trim()).then((response: any) => {
      this.listprovincias = response;
      if (this.listprovincias === null || this.listprovincias === '') {
        this.provincianame === ""
      } else {
        this.provincianame = this.listprovincias.DescripcionCorta
      }
      console.log(this.listprovincias)
      this.getDistritto();
    });
  }
  getDistritto() {
    this.apiService.getDistritoByIdService(this.dataprints[0]?.id_departamento.trim(), this.dataprints[0]?.id_provincia.trim(), this.dataprints[0]?.id_distrito.trim()).then((response: any) => {
      this.listdistritos = response;
      if (this.listdistritos === null || this.listdistritos === '') {
        this.distritoname === ""
      } else {
        this.distritoname = this.listdistritos.DescripcionCorta
      }

    });
  }
}
