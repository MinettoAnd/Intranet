import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClaimsService } from "src/app/pages/claims/claims.service";
import { IMedidas } from "src/app/pages/models/claims/IMedidas";
import Swal from "sweetalert2";
import { DocsComponent } from "../../claims/docs/docs.component";
import { FilesComponent } from "../../claims/list/detalle/modal/files/files.component";
import { MedidasAdoptadasComponent } from "./../../claims/list/respuesta-reclamo/medidas-adoptadas/medidas-adoptadas.component";
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  @Input() dato;
  value: number = 0;
  exito: number = 0;
  options: Options = {
    floor: 0,
    ceil: 0
  };
  active = 1;
  showreclamoprimigenio = false;
  showtraslado = false;
  showtresultado = false;
  showmotivo = false;
  submitter_accion = false;
  public nameestado: string = "";
  public textLoadion: string = "";
  public listDetalle: any = [];
  public listestado: any = [];
  accionForm: FormGroup;
  respuestaForm: FormGroup;
  public fecha_respuesta: string = "";
  public fecha_respuesta_hora: string = "";
  public listresultadoreclamo: any = [];
  public listmotivo: any = [];
  public listmedidas: any = [];
  public codigo_reclamo: string = "";
  public tipoadmin: string = "";
  public codigoadmin: string = "";
  public resultado_reclamo: string = "";
  public motivo: string = "";
  public fechasolucion: string = "";
  public horasolucion: string = "";
  listsarchivos: any = [];
  archivos: any = [];
  deleteArchivos: any = [];

  page = 1;
  pageSize = 50;
  collectionSize;
  medidas: IMedidas[];
  constructor(
      private modalService: NgbModal,
      public activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private apiService: ClaimsService,
      private datePipe: DatePipe
  ) {

      this.accionForm = this.formBuilder.group({
          competencia: ["", Validators.required],
          estado: [""],
          codigoreclamo: [""],
          estapareclamo: [""],
          tipoadministrador: [""],
          codigoadmin: [""],
          resultado_reclamo: [""],
          fechasolucion: [""],
          horasolucion: [""],
          motivo: [""],
          solucion_al_reclamo: [""],
          file: [""],
          exito: 0,
          fecha: ["", Validators.required],
          hora: ["", Validators.required],
          forma_entrega: ["", Validators.required],
          resumen: ["", Validators.required],
      });
      this.respuestaForm = this.formBuilder.group({
          fecha: ["", Validators.required],
          hora: ["", Validators.required],
          forma_entrega: ["", Validators.required],
          resumen: ["", Validators.required],
      });
  }

  ngOnInit() {
    console.log(81,this.exito)
  this.options.ceil = this.dato.CuotasVencidas

      this.getDetailReclamo();
      this.getEstadoTramite();
      this.getResultadoReclamo();
      this.getMotivo();
      this.getListMedidas();
  }
  get s() {
      return this.accionForm.controls;
  }
  getDetailReclamo() {
      this.apiService
          .getReclamoByIdService(this.dato.idreclamo, this.dato.empresa)
          .then((response: any) => {
              // Swal.close();
              this.listDetalle =
                  response.data.length > 0 ? response.data : [];
              this.nameestado = this.listDetalle[0]?.name_estado;

              this.codigo_reclamo = this.listDetalle[0]?.codigo_reclamo;
              this.tipoadmin = this.listDetalle[0]?.tipo_admin;
              this.codigoadmin = this.listDetalle[0]?.codigo_admin;
              this.resultado_reclamo =
                  this.listDetalle[0]?.id_resultado_reclamo;
              this.motivo = this.listDetalle[0]?.id_motivo;
              this.listsarchivos = JSON.parse(
                  this.listDetalle[0]?.r_archivos
              );
              // console.log('hora', this.listDetalle[0]?.d_solucion)
              if (this.listDetalle[0]?.d_solucion != "0000-00-00 00:00:00") {
                  this.fechasolucion = this.datePipe.transform(
                      this.listDetalle[0]?.d_solucion,
                      "yyyy-MM-dd"
                  );
                  this.horasolucion = this.datePipe.transform(
                      this.listDetalle[0]?.d_solucion,
                      "hh:mm"
                  );
                  //console.log(this.fechasolucion, this.horasolucion)
              }
              if (
                  this.listDetalle[0]?.d_respuesta_afi ==
                  "0000-00-00 00:00:00"
              ) {
                  this.fecha_respuesta = "";
                  this.fecha_respuesta_hora = "";
              } else {
                  this.fecha_respuesta = this.datePipe.transform(
                      this.listDetalle[0]?.d_respuesta_afi,
                      "yyyy-MM-dd"
                  );
                  this.fecha_respuesta_hora = this.datePipe.transform(
                      this.listDetalle[0]?.d_respuesta_afi,
                      "hh:mm"
                  );
              }
              if (
                  this.listDetalle[0]?.id_estado_v2 === 2 ||
                  this.listDetalle[0]?.id_estado_v2 === 3
              ) {
                  this.showtresultado = true;
                  this.showtraslado = false;
                  if (this.listDetalle[0]?.id_estado_v2 === 3) {
                      this.showtraslado = true;
                  }
              } else {
                  this.showtresultado = false;
                  this.showtraslado = false;
                  this.showmotivo = false;
              }
              if (
                  this.listDetalle[0]?.id_estado_v2 === 4 ||
                  this.listDetalle[0]?.id_estado_v2 === 5
              ) {
                  this.showreclamoprimigenio = true;
              } else {
                  this.showreclamoprimigenio = false;
                  this.showmotivo = false;
              }
              if (this.listDetalle[0]?.id_resultado_reclamo === 5) {
                  this.showmotivo = true;
              } else {
                  this.showmotivo = false;
              }
          });
  }
  onChangeEstado(event) {
      this.nameestado =
          event.target.options[event.target.options.selectedIndex].text;
      if (event.target.value === "2" || event.target.value === "3") {
          this.showtresultado = true;
          this.showtraslado = false;
          if (event.target.value === "3") {
              this.showtraslado = true;
          }
          this.codigo_reclamo = "";
          this.motivo = "";
      } else {
          this.showtresultado = false;
          this.showtraslado = false;
          this.showmotivo = false;
      }
      if (event.target.value === "4" || event.target.value === "5") {
          this.showreclamoprimigenio = true;
          this.tipoadmin = "";
          this.codigoadmin = "";
          this.resultado_reclamo = "";
          this.motivo = "";
      } else {
          this.showreclamoprimigenio = false;
          this.showmotivo = false;
      }
  }
  onChangeResultadoreclamo(event) {
      if (event.target.value === "5") {
          this.showmotivo = true;
      } else {
          this.showmotivo = false;
      }
  }
  getEstadoTramite() {
      this.apiService.getEstadoTramiteService().then((response: any) => {
          this.listestado = response.data.length > 0 ? response.data : [];
          // this.getGarantiaSalud();
      });
  }
  getResultadoReclamo() {
      this.apiService
          .getListResultadoReclamoService()
          .then((response: any) => {
              this.listresultadoreclamo =
                  response.data.length > 0 ? response.data : [];
          });
  }
  getMotivo() {
      this.apiService.getListMotivoService().then((response: any) => {
          this.listmotivo = response.data.length > 0 ? response.data : [];
      });
  }
  getListMedidas() {
      this.apiService
          .getListMedidasService(this.dato.idreclamo, this.dato.empresa)
          .then((response: any) => {
              this.listmedidas =
                  response.data.length > 0 ? response.data : [];
              this.collectionSize = this.listmedidas.length;
              this.refreshCountries();
          });
  }
  refreshCountries() {
      this.medidas = this.listmedidas
          .map((country, i) => ({ id: i + 1, ...country }))
          .slice(
              (this.page - 1) * this.pageSize,
              (this.page - 1) * this.pageSize + this.pageSize
          );
  }

  updateRespuestaReclamo() {
      this.submitter_accion = true;

      if (this.accionForm.invalid) {
          this.showAlertForm();
          return;
      }
      var formValue = this.accionForm.value;
      var formRespusta = this.respuestaForm.value;
      const data = {
          competencia: formValue.competencia,
          estado: formValue.estado,
          nameestado: this.nameestado,
          codigoreclamo: formValue.codigoreclamo,
          estapareclamo: formValue.estapareclamo,
          tipoadministrador: formValue.tipoadministrador,
          codigoadmin: formValue.codigoadmin,
          resultado_reclamo: formValue.resultado_reclamo,
          fechasolucion:
              this.datePipe.transform(formValue.fechasolucion, "yyyy-MM-dd") +
              " " +
              formValue.horasolucion,
          motivo: formValue.motivo,
          fecha_hora:
              this.datePipe.transform(formRespusta.fecha, "yyyy-MM-dd") +
              " " +
              formRespusta.hora,
          forma_entrega: formRespusta.forma_entrega,
          detalle_reclamo: formValue.solucion_al_reclamo,
          resumen: formRespusta.resumen,
          tipo_empresa: this.dato.empresa,
          idreclamo: this.dato.idreclamo,
      };
      console.log(data);
      this.textLoadion = "Actualizando Informacion...";
      this.showLoading();
      this.apiService.updateReclamoRespuestaService(data).then(
          (response: any) => {
              Swal.close();
              this.getDetailReclamo();
              this.success();
          },
          (error) => {
              Swal.close();
              Swal.fire("Error!", "Intentar nuevamente", "error");
          }
      );
  }
  showAlertForm() {
      Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Verificar que todo los campos obligatorios esten completados !",
      });
  }
  openModalMedida(id, datos) {
      if (id === 1) {
          const data = {
              idreclamo: this.dato.idreclamo,
              empresa: this.dato.empresa,
              d_registra_reclamo: this.listDetalle[0]?.d_registra_reclamo,
              sede: this.dato.sede,
              correlativo: this.dato.correlativo,
              resultado_reclamo: this.listDetalle[0]?.id_resultado_reclamo,
              valor: 0,
          };
          const modalRef = this.modalService.open(MedidasAdoptadasComponent, {
              size: <any>"xl",
          });
          modalRef.componentInstance.dato = data;
          modalRef.result
              .then((result) => {
                  if (result.success) {
                      this.getListMedidas();
                  }
              })
              .catch((error) => {
                  console.log(error);
              });
      } else {
          const data = {
              valor: 1,
              d_registra_reclamo: this.listDetalle[0]?.d_registra_reclamo,
              idreclamo: this.dato.idreclamo,
              fecha_inicio: datos.fecha_inicio,
              fecha_culminacion: datos.fecha_culminacion,
              tipo_reclamo: datos.tipo_reclamo,
              codigo_unico: datos.codigo_unico,
              codigo_adoptado: datos.codigo_adoptado,
              detalle_reclamo: datos.detalle_reclamo,
              resumen: datos.resumen,
              naturaleza: datos.naturaleza,
              processo_adoptada: datos.processo_adoptada,
              sede: this.dato.sede,
              empresa: this.dato.empresa,
              correlativo: this.dato.correlativo,
              resultado_reclamo: this.listDetalle[0]?.id_resultado_reclamo,
              id: datos.id,
          };
          const modalRef = this.modalService.open(MedidasAdoptadasComponent, {
              size: <any>"xl",
          });
          modalRef.componentInstance.dato = data;
          modalRef.result
              .then((result) => {
                  if (result.success) {
                      this.getListMedidas();
                  }
              })
              .catch((error) => {
                  console.log(error);
              });
      }
  }

  openDocs(url) {
      const data = {
          url: url,
      };
      const modalRef = this.modalService.open(DocsComponent, {
          size: <any>"xl",
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

  showDelete(id) {
      Swal.fire({
          icon: "warning",
          title: "Esta seguro de realizar esta acción?",
          showCancelButton: true,
          confirmButtonText: `Eliminar`,
      }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
              this.deleteMedidas(id);
          }
      });
  }
  deleteMedidas(id) {
      this.apiService.deleteMedidasService(id).then(
          (response: any) => {
              Swal.close();
              this.success();
              this.getListMedidas();
          },
          (error) => {
              Swal.close();
              Swal.fire("Error!", "Intentar nuevamente", "error");
          }
      );
  }

  deleteFile(filename: string) {
      // console.log(files);
      const datafile = {
          filename: filename,
      };
      console.log("old array", this.listsarchivos);
      this.removeItemFromArr(this.listsarchivos, filename);
      //console.log('new arrar', this.listsarchivos)
      //TODO:Implementar funcion para eliminar archivo

      this.apiService.deleteFiles(datafile).then((response: any) => {
          console.log(response);
          if (response.success) {
              this.updateNameFiles(this.listsarchivos);
          } else {
              this.updateNameFiles(this.listsarchivos);
          }
      });
      //TODO:Implementar funcion para actulizar db
  }

  removeItemFromArr(arr, item) {
      var i = arr.indexOf(item);
      if (i !== -1) {
          arr.splice(i, 1);
      }
  }

  updateNameFiles(fileNames) {
      console.log("update ok", fileNames);
      /*  var  = "";
   if (arraydata.length > 0) {
     fileNames = arraydata
   } */
      const data = {
          empresa: this.dato.empresa,
          archivos: fileNames,
          id_reclamo: this.dato.idreclamo,
      };
      console.log("send data", data);
      this.apiService
          .updateReclamoFilesServiceReclamo(data)
          .then((result) => {
              console.log("update archivos exitoso");
          })
          .catch((err) => {
              console.log("error", err);
          });
  }

  openModalFile() {
      const data = {
          empresa: this.dato.empresa,
          archivos: this.listsarchivos,
          id_reclamo: this.dato.idreclamo,
          estado: false,
      };
      const modalRef = this.modalService.open(FilesComponent, { size: "lg" });
      modalRef.componentInstance.datafiles = data;
      modalRef.result
          .then((result) => {
              if (result.success === 1) {
                  this.getDetailReclamo();
              }
          })
          .catch((error) => {
              console.log(error);
          });
  }

  showLoading() {
      Swal.fire({
          text: this.textLoadion,
          width: "20rem",
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
              Swal.showLoading();
          },
      });
  }
  success() {
      Swal.fire({
          title: "Exitoso!",
          width: "20rem",
          icon: "success",
      });
  }
  diaEvento(dia) {
      if (dia === "0000-00-00 00:00:00") {
          return "";
      } else {
          return this.datePipe.transform(dia, "dd/MM/yyyy hh:mm:ss");
      }
  }

  getTipoReclamo(id) {
      var tiponame = "";
      if (id === 1) {
          tiponame = "Virtual";
      } else if (id === 2) {
          tiponame = "Físico";
      } else if (id === 3) {
          tiponame = "Telefónico";
      }
      return tiponame;
  }
  getNaturaleza(id) {
      var tiponame = "";
      if (id === 1) {
          tiponame = "Administrativa respecto a procesos propios de la IAFAS";
      } else if (id === 2) {
          tiponame =
              "Administrativa respecto a procesos propios de la IPRESS";
      } else if (id === 3) {
          tiponame =
              "Administrativa respecto a procesos propios de la UGIPRESS";
      } else if (id === 4) {
          tiponame = "Asistencial (Prestacional)";
      } else if (id === 5) {
          tiponame = "Administrativa y Asistencial (Prestacional)";
      }
      return tiponame;
  }

  getProceso(id) {
      var tiponame = "";
      if (id === 1) {
          tiponame = "Afiliación";
      } else if (id === 2) {
          tiponame = "Acreditación";
      } else if (id === 3) {
          tiponame = "Prestación de servicios salud";
      } else if (id === 4) {
          tiponame =
              "Liquidación, cobro o pago al usuario por los servicios prestados";
      } else if (id === 5) {
          tiponame =
              "Contratación de servicios de salud de una IAFAS a una IPRESS para atención de sus asegurados";
      } else if (id === 6) {
          tiponame = "Otro proceso";
      }
      return tiponame;
  }
}
