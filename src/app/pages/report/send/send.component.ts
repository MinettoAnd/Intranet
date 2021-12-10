import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReportsService } from '../report.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.sass']
})
export class SendComponent implements OnInit {
  public fechas: any = [];
  public atendidos: any = [];
  public atendidos2: any = [];
  public hopitalizados: any = [];
  public arrayDatos: any = []
  public arrayDatos2: any = []
  public gestantes: any = []
  public result_gestantes: any = []

  public hospitalizados: any = [];
  public hospitalizados_altas: any = [];
  public hospitalizados_tipo_paciente: any = [];
  public hospitalizados_servicio: any = [];
  public hospitalizados2: any = [];
  public emergencia: any = [];
  public adminicion: any = [];
  public altas: any = [];
  public fallecidos: any = [];
  public vivos: any = [];

  public diagnostico_principal: any = [];
  public cesaria: any = [];
  public parto: any = [];
  public covid: any = [];
  public otros: any = [];
  public tipo_paciente: any = [];
  public plan_salud: any = [];
  public convenios_credito: any = [];
  public soat: any = [];
  public eps: any = [];
  public institucional: any = [];
  public programa_nino: any = [];
  public sctr: any = [];
  public Convenios_Contado: any = [];
  public Seguros: any = [];
  public tarjeta_clasica: any = [];
  public tarjeta_diamante: any = [];
  public tarjeta_dorada: any = [];
  public sante_card: any = [];
  public hospitalizacion_pedriatria: any = [];
  public repiso1: any = [];
  public dopiso2: any = [];
  public repiso3: any = [];
  public topiso6: any = [];
  public mopiso7: any = [];
  public madrenino: any = [];
  public noeo: any = [];
  public pacinfec: any = [];
  public pactrauma: any = [];
  public ucint: any = [];
  public ucihost: any = [];

  public hospitalizacion_por_servicio: any = [];
  public centro_obstetrico: any = [];
  public uci: any = [];
  public piso_1: any = [];
  public piso_2: any = [];

  public consulta_externa: any = [];
  public consulta_externa2: any = [];
  public principales_esoecialidades: any = [];
  public Atenciones_Realizadas: any = [];


  public pediatria: any = [];
  public Gastroenterologia: any = [];
  public Medicina_Interna: any = [];
  public Cirugia_General: any = [];
  public ginecologia: any = [];
  public Cardiologia: any = [];
  public Otorrinolaringologia: any = [];
  public Oftalmologia: any = [];
  public total_especialidad: any = [];
  public otros_total: any = [];

  public list_neo: any = [];
  public neonatologias: any = [];

  //
  public list_quirurgico: any = [];
  public list_programado: any = [];
  public list_quirurgico2: any = [];
  public list_atentindos: any = [];

  public listObstetrico: any = [];
  public partounico: any = [];
  public partomultiple: any = [];
  public partounico2: any = [];
  public partomultiple2: any = [];
  public altasporparto: any = [];
  public altas_espontaneo: any = [];
  public altas_cesaria: any = [];

  //
  public atenciones_realizados_externa: any = [];
  public ausentismo: any = [];
  public porcentaje_aucentismo: any = [];
  public pacientes_afectados_inasistencia: any = [];

  public ex_convenios: any = [];
  public ex_eps: any = [];
  public ex_instutcional: any = [];
  public ex_plan_salud: any = [];
  public ex_programa: any = [];
  public ex_sctr: any = [];
  public ex_seguro: any = [];
  public ex_soat: any = [];
  public no_registrado: any = [];
  FormSenMail: FormGroup;
  public correo_director: string = "";
  public name_sede: string = "";
  public id_sede: string = "";
  public subject: string = "";
  public hogar_geadrico: any = [];
  public lis_ext_tipo_paciente: any = [];
  textLoadion = "";
  constructor(private apiService: ReportsService, private datePipe: DatePipe, private formBuilder: FormBuilder) {
    this.FormSenMail = this.formBuilder.group({
      sede: new FormControl('', Validators.compose([Validators.required])),

    });
  }

  ngOnInit() {
  }
  sendMailDirectores() {
    this.id_sede = "";
    this.subject = "";
    const fromValue = this.FormSenMail.value;
    if (fromValue.sede === "0001") {
      this.correo_director = "msuarez@clubdelasalud.pe";
      this.name_sede = "LIMA";
      this.id_sede = "0001";
      this.subject = "Producción Medica Asistencial - Sede Lima"
    }
    if (fromValue.sede === "0002") {
      this.correo_director = "edurand@clubdelasalud.pe";
      this.name_sede = "CHORRILLOS";
      this.id_sede = "0002";
      this.subject = "Producción Medica Asistencial - Sede Chorrillos"
    }
    if (fromValue.sede === "0004") {
      this.correo_director = "tbenavides@clubdelasalud.pe";
      this.name_sede = "SURCO";
      this.id_sede = "0004";
      this.subject = "Producción Medica Asistencial - Sede Surco"
    }
    this.hospitalizados2 = [];
    this.emergencia = [];
    this.adminicion = [];
    this.altas = [];
    this.fallecidos = [];
    this.vivos = [];
    this.cesaria = [];
    this.parto = [];
    this.covid = [];
    this.otros = [];
    this.tipo_paciente = [];
    this.hospitalizacion_por_servicio = [];
    this.Convenios_Contado = [];
    this.convenios_credito = [];
    this.eps = [];
    this.institucional = [];
    this.plan_salud = [];
    this.programa_nino = [];
    this.sante_card = [];
    this.sctr = [];
    this.Seguros = [];
    this.soat = [];
    this.tarjeta_clasica = [];
    this.tarjeta_diamante = [];
    this.tarjeta_dorada = [];
    this.hogar_geadrico = [];
    this.hospitalizacion_pedriatria = [];
    this.repiso1 = [];
    this.dopiso2 = [];
    this.repiso3 = [];
    this.topiso6 = [];
    this.mopiso7 = [];
    this.madrenino = [];
    this.noeo = [];
    this.no_registrado = [];
    this.pacinfec = [];
    this.pactrauma = [];
    this.ucint = [];
    this.ucihost = [];
    this.atendidos2 = [];
    this.hopitalizados = [];
    this.gestantes = [];
    this.arrayDatos = [];
    this.arrayDatos2 = [];
    this.consulta_externa2 = [];
    this.Atenciones_Realizadas = [];
    this.pediatria = [];
    this.Gastroenterologia = [];
    this.Medicina_Interna = [];
    this.Cirugia_General = [];
    this.ginecologia = [];
    this.Cardiologia = [];
    this.Otorrinolaringologia = [];
    this.Oftalmologia = [];
    this.total_especialidad = [];
    this.atenciones_realizados_externa = [];
    this.ausentismo = [];
    this.porcentaje_aucentismo = [];
    this.pacientes_afectados_inasistencia = [];
    this.ex_convenios = [];
    this.ex_eps = [];
    this.ex_instutcional = [];
    this.ex_plan_salud = [];
    this.ex_programa = [];
    this.ex_sctr = [];
    this.ex_seguro = [];
    this.ex_soat = [];
    this.otros_total = [];
    this.list_programado = [];
    this.list_atentindos = [];
    this.neonatologias = [];
    this.partounico = [];
    this.partomultiple = [];
    this.partounico2 = [];
    this.partomultiple2 = [];
    this.altasporparto = [];
    this.altas_espontaneo = [];
    this.altas_cesaria = [];
    this.lis_ext_tipo_paciente = [];
    this.hospitalizados_tipo_paciente = [];
    this.hospitalizados_servicio = [];
    this.textLoadion = "Enviando...";
    this.showLoading();
    this.apiService.getFechasService().then((response: any) => {
      this.fechas = response.length > 0 ? response : [];
      this.getHospitalizacion(this.id_sede);
    });


  }
  getHospitalizacion(sede) {
    const data = {
      sucursal: sede,
      fecha_anterio: this.restarDias(new Date, -7),
      fecha_actual: this.restarDias(new Date, -1),
    }
    console.log(data);
    this.apiService.getAtendidosHopitalizacionIngresos(data).then((response: any) => {
      this.hospitalizados = response.length > 0 ? response : [];
      // console.log(this.hospitalizados)
      this.getHospitalizacionAlatas(sede);
      for (let i = 0; i < this.hospitalizados.length; i++) {
        switch (this.hospitalizados[i].item) {
          case 1:
            this.hospitalizados2.push({ "numero": this.hospitalizados[i].dia1 })
            this.hospitalizados2.push({ "numero": this.hospitalizados[i].dia2 })
            this.hospitalizados2.push({ "numero": this.hospitalizados[i].dia3 })
            this.hospitalizados2.push({ "numero": this.hospitalizados[i].dia4 })
            this.hospitalizados2.push({ "numero": this.hospitalizados[i].dia5 })
            this.hospitalizados2.push({ "numero": this.hospitalizados[i].dia6 })
            this.hospitalizados2.push({ "numero": this.hospitalizados[i].dia7 })
            break;
          case 2:
            this.emergencia.push({ "numero": this.hospitalizados[i].dia1 })
            this.emergencia.push({ "numero": this.hospitalizados[i].dia2 })
            this.emergencia.push({ "numero": this.hospitalizados[i].dia3 })
            this.emergencia.push({ "numero": this.hospitalizados[i].dia4 })
            this.emergencia.push({ "numero": this.hospitalizados[i].dia5 })
            this.emergencia.push({ "numero": this.hospitalizados[i].dia6 })
            this.emergencia.push({ "numero": this.hospitalizados[i].dia7 })
            break;
          case 3:
            this.adminicion.push({ "numero": this.hospitalizados[i].dia1 })
            this.adminicion.push({ "numero": this.hospitalizados[i].dia2 })
            this.adminicion.push({ "numero": this.hospitalizados[i].dia3 })
            this.adminicion.push({ "numero": this.hospitalizados[i].dia4 })
            this.adminicion.push({ "numero": this.hospitalizados[i].dia5 })
            this.adminicion.push({ "numero": this.hospitalizados[i].dia6 })
            this.adminicion.push({ "numero": this.hospitalizados[i].dia7 })
            break;
          default:
            break;
        }
      }

    }, (error) => {
      Swal.close();
    });


  }

  getHospitalizacionAlatas(sede) {
    const data = {
      sucursal: sede,
      fecha_anterio: this.restarDias(new Date, -7),
      fecha_actual: this.restarDias(new Date, -1),
    }
    console.log(data);
    this.apiService.getAtendidosHopitalizacionAltas(data).then((response: any) => {
      this.hospitalizados_altas = response.length > 0 ? response : [];
      // console.log(this.hospitalizados)
      this.getHospitalizacionTipoPaciente(sede);
      for (let i = 0; i < this.hospitalizados_altas.length; i++) {
        switch (this.hospitalizados_altas[i].item) {
          case 1:
            this.altas.push({ "numero": this.hospitalizados_altas[i].dia1 })
            this.altas.push({ "numero": this.hospitalizados_altas[i].dia2 })
            this.altas.push({ "numero": this.hospitalizados_altas[i].dia3 })
            this.altas.push({ "numero": this.hospitalizados_altas[i].dia4 })
            this.altas.push({ "numero": this.hospitalizados_altas[i].dia5 })
            this.altas.push({ "numero": this.hospitalizados_altas[i].dia6 })
            this.altas.push({ "numero": this.hospitalizados_altas[i].dia7 })
            break;
          case 2:
            this.fallecidos.push({ "numero": this.hospitalizados_altas[i].dia1 })
            this.fallecidos.push({ "numero": this.hospitalizados_altas[i].dia2 })
            this.fallecidos.push({ "numero": this.hospitalizados_altas[i].dia3 })
            this.fallecidos.push({ "numero": this.hospitalizados_altas[i].dia4 })
            this.fallecidos.push({ "numero": this.hospitalizados_altas[i].dia5 })
            this.fallecidos.push({ "numero": this.hospitalizados_altas[i].dia6 })
            this.fallecidos.push({ "numero": this.hospitalizados_altas[i].dia7 })
            break;
          case 3:
            this.vivos.push({ "numero": this.hospitalizados_altas[i].dia1 })
            this.vivos.push({ "numero": this.hospitalizados_altas[i].dia2 })
            this.vivos.push({ "numero": this.hospitalizados_altas[i].dia3 })
            this.vivos.push({ "numero": this.hospitalizados_altas[i].dia4 })
            this.vivos.push({ "numero": this.hospitalizados_altas[i].dia5 })
            this.vivos.push({ "numero": this.hospitalizados_altas[i].dia6 })
            this.vivos.push({ "numero": this.hospitalizados_altas[i].dia7 })
            break;
          case 4:
            this.cesaria.push({ "numero": this.hospitalizados_altas[i].dia1 })
            this.cesaria.push({ "numero": this.hospitalizados_altas[i].dia2 })
            this.cesaria.push({ "numero": this.hospitalizados_altas[i].dia3 })
            this.cesaria.push({ "numero": this.hospitalizados_altas[i].dia4 })
            this.cesaria.push({ "numero": this.hospitalizados_altas[i].dia5 })
            this.cesaria.push({ "numero": this.hospitalizados_altas[i].dia6 })
            this.cesaria.push({ "numero": this.hospitalizados_altas[i].dia7 })

            break;
          case 5:
            this.parto.push({ "numero": this.hospitalizados_altas[i].dia1 })
            this.parto.push({ "numero": this.hospitalizados_altas[i].dia2 })
            this.parto.push({ "numero": this.hospitalizados_altas[i].dia3 })
            this.parto.push({ "numero": this.hospitalizados_altas[i].dia4 })
            this.parto.push({ "numero": this.hospitalizados_altas[i].dia5 })
            this.parto.push({ "numero": this.hospitalizados_altas[i].dia6 })
            this.parto.push({ "numero": this.hospitalizados_altas[i].dia7 })


            break;
          case 6:
            this.covid.push({ "numero": this.hospitalizados_altas[i].dia1 })
            this.covid.push({ "numero": this.hospitalizados_altas[i].dia2 })
            this.covid.push({ "numero": this.hospitalizados_altas[i].dia3 })
            this.covid.push({ "numero": this.hospitalizados_altas[i].dia4 })
            this.covid.push({ "numero": this.hospitalizados_altas[i].dia5 })
            this.covid.push({ "numero": this.hospitalizados_altas[i].dia6 })
            this.covid.push({ "numero": this.hospitalizados_altas[i].dia7 })


            break;

          default:
            break;
        }
      }
      for (let index = 0; index < this.altas.length; index++) {
        this.otros.push({ "total": (this.altas[index].numero) - (this.cesaria[index].numero + this.parto[index].numero + this.covid[index].numero) })
      }

    }, (error) => {
      Swal.close();
    });


  }

  getHospitalizacionTipoPaciente(sede) {
    const data = {
      sucursal: sede,
      fecha_anterio: this.restarDias(new Date, -7),
      fecha_actual: this.restarDias(new Date, -1),
    }
    console.log(data);
    this.apiService.getAtendidosHopitalizacionTipoPaciente(data).then((response: any) => {
      var hospitalizados = response.length > 0 ? response : [];
      console.log('Tipo pACIENTE ', hospitalizados)
      this.getEmergencia(sede);
      for (let i = 0; i < hospitalizados.length; i++) {
        switch (hospitalizados[i].item) {
          case 1:
            this.tipo_paciente.push({ "total": hospitalizados[i].dia1 })
            this.tipo_paciente.push({ "total": hospitalizados[i].dia2 })
            this.tipo_paciente.push({ "total": hospitalizados[i].dia3 })
            this.tipo_paciente.push({ "total": hospitalizados[i].dia4 })
            this.tipo_paciente.push({ "total": hospitalizados[i].dia5 })
            this.tipo_paciente.push({ "total": hospitalizados[i].dia6 })
            this.tipo_paciente.push({ "total": hospitalizados[i].dia7 })
            this.hospitalizacion_por_servicio.push({ "total": hospitalizados[i].dia1 })
            this.hospitalizacion_por_servicio.push({ "total": hospitalizados[i].dia2 })
            this.hospitalizacion_por_servicio.push({ "total": hospitalizados[i].dia3 })
            this.hospitalizacion_por_servicio.push({ "total": hospitalizados[i].dia4 })
            this.hospitalizacion_por_servicio.push({ "total": hospitalizados[i].dia5 })
            this.hospitalizacion_por_servicio.push({ "total": hospitalizados[i].dia6 })
            this.hospitalizacion_por_servicio.push({ "total": hospitalizados[i].dia7 })
            break;
          case 2:
            this.hospitalizados_tipo_paciente.push(hospitalizados[i])
            break;
          case 3:
            this.hospitalizados_servicio.push(hospitalizados[i])
            break;
          default:
            break;
        }
      }


    }, (error) => {
      Swal.close();
    });


  }

  getEmergencia(sede) {
    const data = {
      sucursal: sede,
      fecha_anterio: this.restarDias(new Date, -7),
      fecha_actual: this.restarDias(new Date, -1),
    }
    console.log('emergencia', data)
    this.apiService.getAtendidosEmergencia(data).then((response: any) => {
      this.atendidos = response.length > 0 ? response : [];
      console.log("Emergencia", this.atendidos)
      for (let i = 0; i < this.atendidos.length; i++) {
        switch (this.atendidos[i].item) {
          case "1":
            this.atendidos2.push({ "numero": this.atendidos[i].dia1 })
            this.atendidos2.push({ "numero": this.atendidos[i].dia2 })
            this.atendidos2.push({ "numero": this.atendidos[i].dia3 })
            this.atendidos2.push({ "numero": this.atendidos[i].dia4 })
            this.atendidos2.push({ "numero": this.atendidos[i].dia5 })
            this.atendidos2.push({ "numero": this.atendidos[i].dia6 })
            this.atendidos2.push({ "numero": this.atendidos[i].dia7 })
            break;
          case "2":
            this.hopitalizados.push({ "numero": this.atendidos[i].dia1 })
            this.hopitalizados.push({ "numero": this.atendidos[i].dia2 })
            this.hopitalizados.push({ "numero": this.atendidos[i].dia3 })
            this.hopitalizados.push({ "numero": this.atendidos[i].dia4 })
            this.hopitalizados.push({ "numero": this.atendidos[i].dia5 })
            this.hopitalizados.push({ "numero": this.atendidos[i].dia6 })
            this.hopitalizados.push({ "numero": this.atendidos[i].dia7 })
            break;
          case "3":
            if (this.atendidos[i].dia1 == null) { this.gestantes.push({ "numero": 0 }) } else { this.gestantes.push({ "numero": this.atendidos[i].dia1 }) }
            if (this.atendidos[i].dia2 == null) { this.gestantes.push({ "numero": 0 }) } else { this.gestantes.push({ "numero": this.atendidos[i].dia2 }) }
            if (this.atendidos[i].dia3 == null) { this.gestantes.push({ "numero": 0 }) } else { this.gestantes.push({ "numero": this.atendidos[i].dia3 }) }
            if (this.atendidos[i].dia4 == null) { this.gestantes.push({ "numero": 0 }) } else { this.gestantes.push({ "numero": this.atendidos[i].dia4 }) }
            if (this.atendidos[i].dia5 == null) { this.gestantes.push({ "numero": 0 }) } else { this.gestantes.push({ "numero": this.atendidos[i].dia5 }) }
            if (this.atendidos[i].dia6 == null) { this.gestantes.push({ "numero": 0 }) } else { this.gestantes.push({ "numero": this.atendidos[i].dia6 }) }
            if (this.atendidos[i].dia6 == null) { this.gestantes.push({ "numero": 0 }) } else { this.gestantes.push({ "numero": this.atendidos[i].dia7 }) }

            break;
          default:
            break;
        }

        // this.arrayDatos2.push({ "hopitalizados": this.hopitalizados[index].numero })

      }
      for (let index = 0; index < this.atendidos2.length; index++) {
        this.arrayDatos.push({ "porcentaje": ((this.hopitalizados[index].numero * 100) / this.atendidos2[index].numero).toFixed(2) })

      }

      for (let index = 0; index < this.atendidos2.length; index++) {
        this.arrayDatos2.push({ "porcentaje": ((this.gestantes[index].numero * 100) / this.atendidos2[index].numero).toFixed(2) })

      }
      this.getConsultaExterna(sede);

    }).catch((err) => {

      Swal.close();

    });
  }


  getConsultaExterna(sede) {
    const data = {
      fecha_anterio: this.restarDias(new Date, -7),
      fecha_actual: this.restarDias(new Date, -1),
      sucursal: sede,
    }
    this.apiService.getConsultaExterna(data).then((response: any) => {
      this.consulta_externa = response.length > 0 ? response : [];
      console.log('externooooooo ', this.consulta_externa)
      for (let i = 0; i < this.consulta_externa.length; i++) {
        switch (this.consulta_externa[i].item) {
          case 1:
            this.consulta_externa2.push({ "numero": this.consulta_externa[i].dia1 })
            this.consulta_externa2.push({ "numero": this.consulta_externa[i].dia2 })
            this.consulta_externa2.push({ "numero": this.consulta_externa[i].dia3 })
            this.consulta_externa2.push({ "numero": this.consulta_externa[i].dia4 })
            this.consulta_externa2.push({ "numero": this.consulta_externa[i].dia5 })
            this.consulta_externa2.push({ "numero": this.consulta_externa[i].dia6 })
            this.consulta_externa2.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 2:
            this.Atenciones_Realizadas.push({ "numero": this.consulta_externa[i].dia1 })
            this.Atenciones_Realizadas.push({ "numero": this.consulta_externa[i].dia2 })
            this.Atenciones_Realizadas.push({ "numero": this.consulta_externa[i].dia3 })
            this.Atenciones_Realizadas.push({ "numero": this.consulta_externa[i].dia4 })
            this.Atenciones_Realizadas.push({ "numero": this.consulta_externa[i].dia5 })
            this.Atenciones_Realizadas.push({ "numero": this.consulta_externa[i].dia6 })
            this.Atenciones_Realizadas.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 3:
            this.pediatria.push({ "numero": this.consulta_externa[i].dia1 })
            this.pediatria.push({ "numero": this.consulta_externa[i].dia2 })
            this.pediatria.push({ "numero": this.consulta_externa[i].dia3 })
            this.pediatria.push({ "numero": this.consulta_externa[i].dia4 })
            this.pediatria.push({ "numero": this.consulta_externa[i].dia5 })
            this.pediatria.push({ "numero": this.consulta_externa[i].dia6 })
            this.pediatria.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 4:
            this.Gastroenterologia.push({ "numero": this.consulta_externa[i].dia1 })
            this.Gastroenterologia.push({ "numero": this.consulta_externa[i].dia2 })
            this.Gastroenterologia.push({ "numero": this.consulta_externa[i].dia3 })
            this.Gastroenterologia.push({ "numero": this.consulta_externa[i].dia4 })
            this.Gastroenterologia.push({ "numero": this.consulta_externa[i].dia5 })
            this.Gastroenterologia.push({ "numero": this.consulta_externa[i].dia6 })
            this.Gastroenterologia.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 5:
            this.Medicina_Interna.push({ "numero": this.consulta_externa[i].dia1 })
            this.Medicina_Interna.push({ "numero": this.consulta_externa[i].dia2 })
            this.Medicina_Interna.push({ "numero": this.consulta_externa[i].dia3 })
            this.Medicina_Interna.push({ "numero": this.consulta_externa[i].dia4 })
            this.Medicina_Interna.push({ "numero": this.consulta_externa[i].dia5 })
            this.Medicina_Interna.push({ "numero": this.consulta_externa[i].dia6 })
            this.Medicina_Interna.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 6:
            this.Cirugia_General.push({ "numero": this.consulta_externa[i].dia1 })
            this.Cirugia_General.push({ "numero": this.consulta_externa[i].dia2 })
            this.Cirugia_General.push({ "numero": this.consulta_externa[i].dia3 })
            this.Cirugia_General.push({ "numero": this.consulta_externa[i].dia4 })
            this.Cirugia_General.push({ "numero": this.consulta_externa[i].dia5 })
            this.Cirugia_General.push({ "numero": this.consulta_externa[i].dia6 })
            this.Cirugia_General.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 7:
            this.ginecologia.push({ "numero": this.consulta_externa[i].dia1 })
            this.ginecologia.push({ "numero": this.consulta_externa[i].dia2 })
            this.ginecologia.push({ "numero": this.consulta_externa[i].dia3 })
            this.ginecologia.push({ "numero": this.consulta_externa[i].dia4 })
            this.ginecologia.push({ "numero": this.consulta_externa[i].dia5 })
            this.ginecologia.push({ "numero": this.consulta_externa[i].dia6 })
            this.ginecologia.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 8:
            this.Cardiologia.push({ "numero": this.consulta_externa[i].dia1 })
            this.Cardiologia.push({ "numero": this.consulta_externa[i].dia2 })
            this.Cardiologia.push({ "numero": this.consulta_externa[i].dia3 })
            this.Cardiologia.push({ "numero": this.consulta_externa[i].dia4 })
            this.Cardiologia.push({ "numero": this.consulta_externa[i].dia5 })
            this.Cardiologia.push({ "numero": this.consulta_externa[i].dia6 })
            this.Cardiologia.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 9:
            this.Otorrinolaringologia.push({ "numero": this.consulta_externa[i].dia1 })
            this.Otorrinolaringologia.push({ "numero": this.consulta_externa[i].dia2 })
            this.Otorrinolaringologia.push({ "numero": this.consulta_externa[i].dia3 })
            this.Otorrinolaringologia.push({ "numero": this.consulta_externa[i].dia4 })
            this.Otorrinolaringologia.push({ "numero": this.consulta_externa[i].dia5 })
            this.Otorrinolaringologia.push({ "numero": this.consulta_externa[i].dia6 })
            this.Otorrinolaringologia.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 10:
            this.Oftalmologia.push({ "numero": this.consulta_externa[i].dia1 })
            this.Oftalmologia.push({ "numero": this.consulta_externa[i].dia2 })
            this.Oftalmologia.push({ "numero": this.consulta_externa[i].dia3 })
            this.Oftalmologia.push({ "numero": this.consulta_externa[i].dia4 })
            this.Oftalmologia.push({ "numero": this.consulta_externa[i].dia5 })
            this.Oftalmologia.push({ "numero": this.consulta_externa[i].dia6 })
            this.Oftalmologia.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 11:
            this.total_especialidad.push({ "numero": this.consulta_externa[i].dia1 })
            this.total_especialidad.push({ "numero": this.consulta_externa[i].dia2 })
            this.total_especialidad.push({ "numero": this.consulta_externa[i].dia3 })
            this.total_especialidad.push({ "numero": this.consulta_externa[i].dia4 })
            this.total_especialidad.push({ "numero": this.consulta_externa[i].dia5 })
            this.total_especialidad.push({ "numero": this.consulta_externa[i].dia6 })
            this.total_especialidad.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 18:
            this.atenciones_realizados_externa.push({ "numero": this.consulta_externa[i].dia1 })
            this.atenciones_realizados_externa.push({ "numero": this.consulta_externa[i].dia2 })
            this.atenciones_realizados_externa.push({ "numero": this.consulta_externa[i].dia3 })
            this.atenciones_realizados_externa.push({ "numero": this.consulta_externa[i].dia4 })
            this.atenciones_realizados_externa.push({ "numero": this.consulta_externa[i].dia5 })
            this.atenciones_realizados_externa.push({ "numero": this.consulta_externa[i].dia6 })
            this.atenciones_realizados_externa.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 20:
            this.ausentismo.push({ "numero": this.consulta_externa[i].dia1 })
            this.ausentismo.push({ "numero": this.consulta_externa[i].dia2 })
            this.ausentismo.push({ "numero": this.consulta_externa[i].dia3 })
            this.ausentismo.push({ "numero": this.consulta_externa[i].dia4 })
            this.ausentismo.push({ "numero": this.consulta_externa[i].dia5 })
            this.ausentismo.push({ "numero": this.consulta_externa[i].dia6 })
            this.ausentismo.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          case 21:
            this.porcentaje_aucentismo.push({ "numero": this.consulta_externa[i].dia1.toFixed(2) })
            this.porcentaje_aucentismo.push({ "numero": this.consulta_externa[i].dia2.toFixed(2) })
            this.porcentaje_aucentismo.push({ "numero": this.consulta_externa[i].dia3.toFixed(2) })
            this.porcentaje_aucentismo.push({ "numero": this.consulta_externa[i].dia4.toFixed(2) })
            this.porcentaje_aucentismo.push({ "numero": this.consulta_externa[i].dia5.toFixed(2) })
            this.porcentaje_aucentismo.push({ "numero": this.consulta_externa[i].dia6.toFixed(2) })
            this.porcentaje_aucentismo.push({ "numero": this.consulta_externa[i].dia7.toFixed(2) })
            break;
          case 22:
            this.pacientes_afectados_inasistencia.push({ "numero": this.consulta_externa[i].dia1 })
            this.pacientes_afectados_inasistencia.push({ "numero": this.consulta_externa[i].dia2 })
            this.pacientes_afectados_inasistencia.push({ "numero": this.consulta_externa[i].dia3 })
            this.pacientes_afectados_inasistencia.push({ "numero": this.consulta_externa[i].dia4 })
            this.pacientes_afectados_inasistencia.push({ "numero": this.consulta_externa[i].dia5 })
            this.pacientes_afectados_inasistencia.push({ "numero": this.consulta_externa[i].dia6 })
            this.pacientes_afectados_inasistencia.push({ "numero": this.consulta_externa[i].dia7 })
            break;
          default:
            break;
        }
      }

      for (let i = 0; i < this.consulta_externa.length; i++) {
        switch (this.consulta_externa[i].item) {
          case 19:
            this.lis_ext_tipo_paciente.push(this.consulta_externa[i])
            break;
          default:
            break;
        }


      }


      for (let index = 0; index < this.Atenciones_Realizadas.length; index++) {
        this.otros_total.push({ "total": this.Atenciones_Realizadas[index].numero - this.total_especialidad[index].numero })

      }
      this.getQuirurgicoProgramdo(sede);
    }, (error) => {
      Swal.close();
    });
  }


  getQuirurgicoProgramdo(sede) {
    const data = {
      sucursal: sede,
      fecha_anterio: this.restarDias(new Date, -7),
      fecha_actual: this.restarDias(new Date, -1),
    }
    this.apiService.getConsultaQuirurgicoProgramdo(data).then((response: any) => {
      this.list_quirurgico = response.length > 0 ? response : [];
      for (let i = 0; i < this.list_quirurgico.length; i++) {
        switch (this.list_quirurgico[i].item) {
          case 1:
            this.list_programado.push({ "numero": this.list_quirurgico[i].dia1 })
            this.list_programado.push({ "numero": this.list_quirurgico[i].dia2 })
            this.list_programado.push({ "numero": this.list_quirurgico[i].dia3 })
            this.list_programado.push({ "numero": this.list_quirurgico[i].dia4 })
            this.list_programado.push({ "numero": this.list_quirurgico[i].dia5 })
            this.list_programado.push({ "numero": this.list_quirurgico[i].dia6 })
            this.list_programado.push({ "numero": this.list_quirurgico[i].dia7 })
            break;
          default:
            break;
        }
      }

      this.getQuirurgicoAtendidos(sede);
    }, (error) => {
      Swal.close();
    });
  }

  getQuirurgicoAtendidos(sede) {
    const data = {
      sucursal: sede,
      fecha_anterio: this.restarDias(new Date, -7),
      fecha_actual: this.restarDias(new Date, -1),
    }
    this.apiService.getConsultaQuirurgicoAtendidos(data).then((response: any) => {
      this.list_quirurgico2 = response.length > 0 ? response : [];
      for (let i = 0; i < this.list_quirurgico2.length; i++) {
        switch (this.list_quirurgico2[i].item) {
          case 1:
            this.list_atentindos.push({ "numero": this.list_quirurgico2[i].dia1 })
            this.list_atentindos.push({ "numero": this.list_quirurgico2[i].dia2 })
            this.list_atentindos.push({ "numero": this.list_quirurgico2[i].dia3 })
            this.list_atentindos.push({ "numero": this.list_quirurgico2[i].dia4 })
            this.list_atentindos.push({ "numero": this.list_quirurgico2[i].dia5 })
            this.list_atentindos.push({ "numero": this.list_quirurgico2[i].dia6 })
            this.list_atentindos.push({ "numero": this.list_quirurgico2[i].dia7 })
            break;
          default:
            break;
        }
      }
      this.getNeonatologia(sede);
    }, (error) => {
      Swal.close();
    });
  }
  getNeonatologia(sede) {
    const data = {
      sucursal: sede,
      fecha_anterio: this.restarDias(new Date, -7),
      fecha_actual: this.restarDias(new Date, -1),
    }
    this.apiService.getConsultaNeonatologia(data).then((response: any) => {
      this.list_neo = response.length > 0 ? response : [];
      for (let i = 0; i < this.list_neo.length; i++) {
        switch (this.list_neo[i].item) {
          case 1:
            this.neonatologias.push({ "numero": this.list_neo[i].dia1 })
            this.neonatologias.push({ "numero": this.list_neo[i].dia2 })
            this.neonatologias.push({ "numero": this.list_neo[i].dia3 })
            this.neonatologias.push({ "numero": this.list_neo[i].dia4 })
            this.neonatologias.push({ "numero": this.list_neo[i].dia5 })
            this.neonatologias.push({ "numero": this.list_neo[i].dia6 })
            this.neonatologias.push({ "numero": this.list_neo[i].dia7 })
            break;
          default:
            break;
        }
      }
      this.getCnetroObstetrico(sede);
    }, (error) => {
      Swal.close();
    });
  }
  getCnetroObstetrico(sede) {
    const data = {
      sucursal: sede,
      fecha_anterio: this.restarDias(new Date, -7),
      fecha_actual: this.restarDias(new Date, -1),
    }
    this.apiService.getConsultaCentroObstetrico(data).then((response: any) => {
      this.listObstetrico = response.length > 0 ? response : [];
      for (let i = 0; i < this.listObstetrico.length; i++) {
        switch (this.listObstetrico[i].item) {
          case 1:
            this.partounico.push({ "numero": this.listObstetrico[i].dia1 })
            this.partounico.push({ "numero": this.listObstetrico[i].dia2 })
            this.partounico.push({ "numero": this.listObstetrico[i].dia3 })
            this.partounico.push({ "numero": this.listObstetrico[i].dia4 })
            this.partounico.push({ "numero": this.listObstetrico[i].dia5 })
            this.partounico.push({ "numero": this.listObstetrico[i].dia6 })
            this.partounico.push({ "numero": this.listObstetrico[i].dia7 })
            break;
          case 2:
            this.partomultiple.push({ "numero": this.listObstetrico[i].dia1 })
            this.partomultiple.push({ "numero": this.listObstetrico[i].dia2 })
            this.partomultiple.push({ "numero": this.listObstetrico[i].dia3 })
            this.partomultiple.push({ "numero": this.listObstetrico[i].dia4 })
            this.partomultiple.push({ "numero": this.listObstetrico[i].dia5 })
            this.partomultiple.push({ "numero": this.listObstetrico[i].dia6 })
            this.partomultiple.push({ "numero": this.listObstetrico[i].dia7 })
            break;
          case 3:
            this.partounico2.push({ "numero": this.listObstetrico[i].dia1 })
            this.partounico2.push({ "numero": this.listObstetrico[i].dia2 })
            this.partounico2.push({ "numero": this.listObstetrico[i].dia3 })
            this.partounico2.push({ "numero": this.listObstetrico[i].dia4 })
            this.partounico2.push({ "numero": this.listObstetrico[i].dia5 })
            this.partounico2.push({ "numero": this.listObstetrico[i].dia6 })
            this.partounico2.push({ "numero": this.listObstetrico[i].dia7 })
            break;
          case 4:
            this.partomultiple2.push({ "numero": this.listObstetrico[i].dia1 })
            this.partomultiple2.push({ "numero": this.listObstetrico[i].dia2 })
            this.partomultiple2.push({ "numero": this.listObstetrico[i].dia3 })
            this.partomultiple2.push({ "numero": this.listObstetrico[i].dia4 })
            this.partomultiple2.push({ "numero": this.listObstetrico[i].dia5 })
            this.partomultiple2.push({ "numero": this.listObstetrico[i].dia6 })
            this.partomultiple2.push({ "numero": this.listObstetrico[i].dia7 })
            break;
          case 5:
            this.altasporparto.push({ "numero": this.listObstetrico[i].dia1 })
            this.altasporparto.push({ "numero": this.listObstetrico[i].dia2 })
            this.altasporparto.push({ "numero": this.listObstetrico[i].dia3 })
            this.altasporparto.push({ "numero": this.listObstetrico[i].dia4 })
            this.altasporparto.push({ "numero": this.listObstetrico[i].dia5 })
            this.altasporparto.push({ "numero": this.listObstetrico[i].dia6 })
            this.altasporparto.push({ "numero": this.listObstetrico[i].dia7 })
            break;
          default:
            break;
        }
      }

      for (let index = 0; index < this.partounico.length; index++) {
        this.altas_espontaneo.push({ "numero": this.partounico[index].numero + this.partomultiple[index].numero });
        this.altas_cesaria.push({ "numero": this.partounico2[index].numero + this.partomultiple2[index].numero });

      }

      this.sendMailReport()
    }, (error) => {
      Swal.close();
    })
  }


  restarDias(fecha, dias) {
    var fechalim = fecha.setDate(fecha.getDate() + dias);
    var fechas = this.datePipe.transform(fechalim, 'yyyy-MM-dd');
    return fechas;
  }

  sendMailReport() {

    if (this.Convenios_Contado.length === 0) {
      this.Convenios_Contado = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.convenios_credito.length === 0) {
      this.convenios_credito = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.eps.length === 0) {
      this.eps = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.institucional.length === 0) {
      this.institucional = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.plan_salud.length === 0) {
      this.plan_salud = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.programa_nino.length === 0) {
      this.programa_nino = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.sante_card.length === 0) {
      this.sante_card = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.sctr.length === 0) {
      this.sctr = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.Seguros.length === 0) {
      this.Seguros = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.soat.length === 0) {
      this.soat = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.tarjeta_clasica.length === 0) {
      this.tarjeta_clasica = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.tarjeta_diamante.length === 0) {
      this.tarjeta_diamante = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.tarjeta_dorada.length === 0) {
      this.tarjeta_dorada = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    //--------------------------------------
    if (this.hogar_geadrico.length === 0) {
      this.hogar_geadrico = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.hospitalizacion_pedriatria.length === 0) {
      this.hospitalizacion_pedriatria = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.repiso1.length === 0) {
      this.repiso1 = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.dopiso2.length === 0) {
      this.dopiso2 = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.repiso3.length === 0) {
      this.repiso3 = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.topiso6.length === 0) {
      this.topiso6 = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.mopiso7.length === 0) {
      this.mopiso7 = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.madrenino.length === 0) {
      this.madrenino = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.noeo.length === 0) {
      this.noeo = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.pacinfec.length === 0) {
      this.pacinfec = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.pactrauma.length === 0) {
      this.pactrauma = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.ucint.length === 0) {
      this.ucint = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.ucihost.length === 0) {
      this.ucihost = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }

    ///externo
    if (this.ex_convenios.length === 0) {
      this.ex_convenios = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.ex_eps.length === 0) {
      this.ex_eps = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.ex_instutcional.length === 0) {
      this.ex_instutcional = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.ex_plan_salud.length === 0) {
      this.ex_plan_salud = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.ex_programa.length === 0) {
      this.ex_programa = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.ex_sctr.length === 0) {
      this.ex_sctr = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.ex_seguro.length === 0) {
      this.ex_seguro = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }
    if (this.ex_soat.length === 0) {
      this.ex_soat = [
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 },
        { numero: 0 }
      ]
    }


    const data = {
      //hopitalizacion
      name_sede: this.name_sede,
      mail: this.correo_director,
      subject: this.subject,
      fecha: this.datePipe.transform(new Date, 'dd/MM/yyyy'),
      hora: this.datePipe.transform(new Date, 'hh:mm:ss'),
      fechas_file: this.fechas,
      ingreso: this.hospitalizados2,
      emergencia: this.emergencia,
      admision: this.adminicion,
      altas: this.altas,
      fallecidos: this.fallecidos,
      vivos: this.vivos,
      altas_principales: this.altas,
      cesaria: this.cesaria,
      parto: this.parto,
      covid: this.covid,
      otros: this.otros,
      tipo_paciente: this.tipo_paciente,
      listHospitalizados: this.hospitalizados_tipo_paciente,
      //Convenios_Contado: this.Convenios_Contado,
      //convenios_credito: this.convenios_credito,
      //eps: this.eps,
      //institucional: this.institucional,
      //plan_salud: this.plan_salud,
      //programa_nino: this.programa_nino,
      //sante_card: this.sante_card,
      //sctr: this.sctr,
      //Seguros: this.Seguros,
      //soat: this.soat,
      //tarjeta_clasica: this.tarjeta_clasica,
      //tarjeta_diamante: this.tarjeta_diamante,
      //tarjeta_dorada: this.tarjeta_dorada,
      hopitalizados_servicio: this.hospitalizacion_por_servicio,
      listServiciosHispotalizado: this.hospitalizados_servicio,
      ///centro_obstetrico: this.centro_obstetrico,
      /* hogar_geadrico:this.hogar_geadrico,
       hospitalizacion_pedriatria: this.hospitalizacion_pedriatria,
       repiso1: this.repiso1,
       dopiso2: this.dopiso2,
       repiso3: this.repiso3,
       topiso6: this.topiso6,
       mopiso7: this.mopiso7,
       madrenino: this.madrenino,
       noeo: this.noeo,
       no_registrado:this.no_registrado,
       pacinfec: this.pacinfec,
       pactrauma: this.pactrauma,
       ucint: this.ucint,
       ucihost: this.ucihost,*/

      atendidos: this.atendidos2,
      hopitalizados: this.hopitalizados,
      porcentaje_hopitalizados: this.arrayDatos,
      gestantes: this.gestantes,
      porcentaje_gestante: this.arrayDatos2,

      //consulta externa
      atencion_reservada: this.consulta_externa2,
      principal_especialista: this.Atenciones_Realizadas,
      pedreatria: this.pediatria,
      Gastroenterologia: this.Gastroenterologia,
      Medicina_Interna: this.Medicina_Interna,
      Cirugia_General: this.Cirugia_General,
      Ginecologia: this.ginecologia,
      Cardiologia: this.Cardiologia,
      Otorrinolaringologia: this.Otorrinolaringologia,
      Oftalmologia: this.Oftalmologia,
      otras_especialidades: this.otros_total,

      atenciones_realizadas_externo: this.atenciones_realizados_externa,
      lis_ext_tipo_paciente: this.lis_ext_tipo_paciente,
      /*ex_convenios: this.ex_convenios,
      ex_eps: this.ex_eps,
      ex_instutcional: this.ex_instutcional,
      ex_plan_salud: this.ex_plan_salud,
      ex_programa: this.ex_programa,
      ex_sctr: this.ex_sctr,
      ex_seguro: this.ex_seguro,
      ex_soat: this.ex_soat,*/
      ausentismo: this.ausentismo,
      porcentaje_ausentismo: this.porcentaje_aucentismo,
      pacientes_afectados_inasistencia: this.pacientes_afectados_inasistencia,
      //centro quirurgico
      pacientes_programados: this.list_programado,
      pacientes_atendidos: this.list_atentindos,
      //neonato
      noe_ingresos: this.neonatologias,
      //centro obstetrico
      parto_espontaneo: this.altas_espontaneo,
      parto_unico: this.partounico,
      parto_multiple: this.partomultiple,
      altas_cesaria: this.altas_cesaria,
      parto_unico2: this.partounico2,
      parto_multiple2: this.partomultiple2,
      altas_parto_m_s: this.altasporparto

    }
    Swal.close();
    console.log(data);
    this.apiService.sendMailRerportService(data).then((response: any) => {
      Swal.close();
      this.succes()
    });
  }

  async succes() {
    Swal.fire({
      title: 'Exitoso',
      icon: 'success',
      text: 'Reclamo Generado con exito.',
      width: '400px',
      timer: 2000,
      showConfirmButton: false,
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
}
