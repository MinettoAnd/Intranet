import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertNumberToAssessment, generateArray, convertNameToSelectedImg, convertNameToUnselectedImg } from 'src/helpers/poll.helper';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
//import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  generateArray: Function = generateArray;
  convertNumberToAssessment: Function = convertNumberToAssessment;
  pollData: any = {
    //nombre:"",
    campus: "",
    inputMode: "",
    patient: "",
    typepatient: "",
    typeagreement: "",
    typesure: "",
    scaleColaborators: {
      doctor: "", nurse: "", technical: "", pharmacy: "", laboratory: "", images: "", admission: "", conventions: "", customerService: "", cleaning: "", modernity: "", comfort: ""
    },
    scaleAreas: {
      healthService: "",
      administrativeService: "",
      infrastructure: "",
      auxiliaryServices: ""
    },
    scaleRecommendation: "",
    additionalComments: ""
  };
  tableHeaders: string[] = ["1", "2", "3", "4", "5", "No Aplica"];
  tableValue: string[] = ["1", "2", "3", "4", "5"];
  arrayMarks: string[] = ["Médico-doctor", "Enfermera-nurse", "Técnica-technical", "Farmacia-pharmacy", "Laboratorio-laboratory", "Imágenes-images", "Admisión-admission", "Convenios-conventions", "Atención al cliente-customerService", "Aseo y Limpieza-cleaning", "Modernidad-modernity", "Comodidad-comfort"];
  arrayAreas: string[] = ["Servicio de Salud-healthService", "Servicio Administrativo-administrativeService", "Infraestructura-infrastructure", "Servicios Auxiliares-Auxiliary Services"];

  arrayPatient: string[] = ['Seleccione una opción', 'Plan Salud-Health Plan', 'Institucional-Institutional', 'Convenios-Agreement', 'Compañia Seguro-Insurance Company', 'Madre Niño-Mother Child', 'Otros-others'];
  //patientValue: string[] = ['Plan Salud-Health Plan', 'Institucional-Institutional', 'Convenios-Agreement', 'Compañia Seguro-Insurance Company', 'Madre Niño-Mother Child', 'Otros-others'];
  arrayTypePatient: string[] = ['Seleccione tarjeta', "Tarjeta CLASICA-classiccard", "Tarjeta DORADA-goldcard", "Tarjeta DIAMANTE-diamondcard"];
  arrayTypeAgreement: string[] = ['Seleccione convenio', "SALUDPOL", "FOPASEF", "SEDAPAL", "PETROPERU", "CRECER", "CMP", "BCRP", "OTROS" ];
  arrayTypeSure: string[] = ['Seleccione Seguro', 'RIMAC', "PACIFICO", "LA POSITIVA", "MAPFRE", "SANITAS", "INTERSEGURO", "OTROS"];
  patientPoll: FormGroup;

  enableTypepatient = false;
  enableTypeagreement = false;
  enableTypesure = false;
  element = false;

  constructor(private formBuilder: FormBuilder,
    private formularioService: ClaimsService,
    //private spinner: NgxSpinnerService,
    private router: Router) {
    this.patientPoll = this.formBuilder.group({
      //nombre: [ this.pollData.nombre, [Validators.required, Validators.minLength(5)] ],
      campus: [this.pollData.campus, [Validators.required]],
      inputMode: [this.pollData.inputMode, [Validators.required]],
      patient: [this.pollData.patient, [Validators.required]],
      // patient: new FormControl('', [Validators.required]),
      typepatient: [this.pollData.typepatient],
      typeagreement: [this.pollData.typeagreement],
      typesure: [this.pollData.typesure],
      scaleColaborators: this.formBuilder.group({
        doctor: [this.pollData.scaleColaborators.doctor, [Validators.required]],
        // doctor: ['Holaaaaaaaa', [Validators.required] ],
        nurse: [this.pollData.scaleColaborators.nurse, [Validators.required]],
        technical: [this.pollData.scaleColaborators.technical, [Validators.required]],
        pharmacy: [this.pollData.scaleColaborators.pharmacy, [Validators.required]],
        laboratory: [this.pollData.scaleColaborators.laboratory, [Validators.required]],
        images: [this.pollData.scaleColaborators.images, [Validators.required]],
        admission: [this.pollData.scaleColaborators.admission, [Validators.required]],
        conventions: [this.pollData.scaleColaborators.conventions, [Validators.required]],
        customerService: [this.pollData.scaleColaborators.customerService, [Validators.required]],
        cleaning: [this.pollData.scaleColaborators.cleaning, [Validators.required]],
        modernity: [this.pollData.scaleColaborators.modernity, [Validators.required]],
        comfort: [this.pollData.scaleColaborators.comfort, [Validators.required]],
      }),
      scaleAreas: this.formBuilder.group({
        healthService: [this.pollData.scaleAreas.healthService, [Validators.required]],
        administrativeService: [this.pollData.scaleAreas.administrativeService, [Validators.required]],
        infrastructure: [this.pollData.scaleAreas.infrastructure, [Validators.required]],
      }),
      scaleRecommendation: [this.pollData.scaleRecommendation, [Validators.required]],
      /* additionalComments:  this.pollData.additionalComments */
      additionalComments: [this.pollData.additionalComments]
    });
  }

  ngOnInit(): void {

    //console.log(this.patientPoll);
    // console.log(this.patientPoll.controls['scaleColaborators'].value);
    //console.log('72', this.patientPoll.controls['scaleColaborators'].value['doctor']);
    // console.log(this.patientPoll.controls['scaleColaborators'].value.doctor);
    //console.log('74', this.patientPoll.controls['scaleColaborators'].value.doctor);
    //console.log('76', this.patientPoll.controls['scaleRecommendation'].value);
    //console.log(this.patientPoll.controls['patient'].value);
    //console.log(this.arrayTypePatient[0]);
    //this.patientPoll.controls['typepatient'].disable();
    //this.patientPoll.controls['typeagreement'].disable();
    //this.patientPoll.controls['typesure'].disable();

    //console.log(this.patientPoll.get('typepatient'));
    console.log(this.patientPoll.value);
    console.log(this.patientPoll.valid);
  }

  onChange(event: any) {
    // console.log(deviceValue);
    console.log(this.patientPoll.controls['patient'].value);

    if (this.patientPoll.controls['patient'].value === 'Plan Salud') {
      //this.enableTypepatient = true;
      this.enableTypepatient = true;
      this.enableTypeagreement = false;
      this.enableTypesure = false;
      this.patientPoll.controls['typeagreement'].reset();
      this.patientPoll.controls['typesure'].reset();


    } else if (this.patientPoll.controls['patient'].value === 'Convenios') {
      this.enableTypepatient = false;
      this.enableTypeagreement = true;
      this.enableTypesure = false;
      this.patientPoll.controls['typepatient'].reset();
      this.patientPoll.controls['typesure'].reset();


    } else if (this.patientPoll.controls['patient'].value === 'Compañia Seguro') {
      this.enableTypepatient = false;
      this.enableTypeagreement = false;
      this.enableTypesure = true;
      this.patientPoll.controls['typepatient'].reset();
      this.patientPoll.controls['typeagreement'].reset();

    } else {
      this.enableTypepatient = false;
      this.enableTypeagreement = false;
      this.enableTypesure = false;
    }

  }


  get campus() {
    return this.patientPoll.get('campus');
  }
  get inputMode() {
    return this.patientPoll.get('inputMode');
  }
  get typepatient() {
    return this.patientPoll.get('typepatient');
  }
  get typeagreement() {
    return this.patientPoll.get('typeagreement');
  }
  get typesure() {
    return this.patientPoll.get('typesure');
  }
  get comments() {
    return this.patientPoll.get('additionalComments');
  }

  checkControl(control: any): boolean {
    return control?.invalid && (control?.dirty || control?.touched);
  }

  findSiblings(tag: any): any[] {
    let parentEl = tag.parentNode.parentNode;
    let childs = parentEl.children;
    let siblings = [];
    for (let i = 0; i <= childs.length - 1; i++) {
      if (childs[i].children[0] === tag) {
        continue;
      }
      siblings.push(childs[i].children[0]);
    }
    return siblings;
  }

  selectImage(radio: any): void {
    radio.click();
  }

  selectOption(e: any): void {
    //console.log('evento', e.target);
    //console.log('evento', e.currentTarget.id);
    const element = e.target;
    const inputRadioRel = element.nextSibling;
    inputRadioRel.click();
    let srcBefore = e.target.src;
    if (!srcBefore.includes("-")) {
      let arrImg = srcBefore.split("/");
      let nameImg = arrImg.pop();
      arrImg.push(convertNameToSelectedImg(nameImg));
      element.src = arrImg.join("/");
    }
    let siblings = this.findSiblings(element);
    siblings.shift();
    element.classList.remove("opacity-50");
    for (const s of siblings) {
      s.classList.add("opacity-50");
      let srcBefore = s.src;
      if (srcBefore.includes("-")) {
        let arrImg = srcBefore.split("/");
        let nameImg = arrImg.pop();
        arrImg.push(convertNameToUnselectedImg(nameImg));
        s.src = arrImg.join("/");
      }
    }
    // this.pruebita(e.id)
  }


  showData() {
    return (this.element = false);
  }
  hideData() {
    return (this.element = true);
  }
  public message = "Warning";
  guardarForm() {
    let campus = this.patientPoll.controls['campus'].value;
    switch (campus){
      case '0001':
      campus = 'Lima';
      break;
      case '0002':
      campus = 'Chorrillos';
      break;
      default:
      campus = 'Surco';
    }
    // Aca van las validaciones del form
    if (this.patientPoll.controls['patient'].value === '') {
      this.formularioService.mensajeError('Seleccione el tipo paciente ');

    } else if (this.patientPoll.controls['campus'].value === '') {
      this.formularioService.mensajeError('Seleccione en que sede se atendio.');

    } else if (this.patientPoll.controls['inputMode'].value === '') {
      this.formularioService.mensajeError('Seleccione la modalidad de ingreso.');

    } else if (this.patientPoll.controls['scaleColaborators'].value['doctor'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia que tuvo con el Medico.');

    } else if (this.patientPoll.controls['scaleColaborators'].value['nurse'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia que tuvo con la Enfermera');

    } else if (this.patientPoll.controls['scaleColaborators'].value['technical'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia que tuvo con el/la Tecnico(a).');

    } else if (this.patientPoll.controls['scaleColaborators'].value['pharmacy'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia que tuvo con la atención en Farmacia');

    } else if (this.patientPoll.controls['scaleColaborators'].value['laboratory'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia que tuvo con la atención en Laboratorio.');

    } else if (this.patientPoll.controls['scaleColaborators'].value['images'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia que tuvo con la atención en Imagenes');

    } else if (this.patientPoll.controls['scaleColaborators'].value['admission'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia que tuvo con la atención en Admisión');

    }else if (this.patientPoll.controls['scaleColaborators'].value['conventions'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia que tuvo con el tramite de su convenio');

    } else if (this.patientPoll.controls['scaleColaborators'].value['customerService'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia que tuvo en Atención al Cliente');

    }else if (this.patientPoll.controls['scaleColaborators'].value['cleaning'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia con nuestros servicios de Limpieza');

    } else if (this.patientPoll.controls['scaleColaborators'].value['modernity'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia en Modernidad ');

    } else if (this.patientPoll.controls['scaleColaborators'].value['comfort'] === '') {
      this.formularioService.mensajeError('Seleccione la experiencia en Comodidad');

    } else if (this.patientPoll.controls['scaleRecommendation'].value === '') {
      this.formularioService.mensajeError('Selecciona un valor en Recomendación');

    } else {
      let dataguardar = {
        sucursal: campus,
        modalidad: this.patientPoll.controls['inputMode'].value,
        paciente: this.patientPoll.controls['patient'].value,
        tipoPaciente: this.patientPoll.controls['typepatient'].value,
        tipoConvenio: this.patientPoll.controls['typeagreement'].value,
        tipoSeguro: this.patientPoll.controls['typesure'].value,
        SS_doctor: this.patientPoll.controls['scaleColaborators'].value['doctor'],
        SS_enfermera: this.patientPoll.controls['scaleColaborators'].value['nurse'],
        SS_tecnica: this.patientPoll.controls['scaleColaborators'].value['technical'],
        SA_farmacia: this.patientPoll.controls['scaleColaborators'].value['pharmacy'],
        SA_laboratorio: this.patientPoll.controls['scaleColaborators'].value['laboratory'],
        SA_imagenes: this.patientPoll.controls['scaleColaborators'].value['images'],
        SA_admision: this.patientPoll.controls['scaleColaborators'].value['admission'],
        SA_convenios: this.patientPoll.controls['scaleColaborators'].value['conventions'],
        SA_atencionCliente: this.patientPoll.controls['scaleColaborators'].value['customerService'],
        SI_limpieza: this.patientPoll.controls['scaleColaborators'].value['cleaning'],
        SI_modernidad: this.patientPoll.controls['scaleColaborators'].value['modernity'],
        SI_comodidad: this.patientPoll.controls['scaleColaborators'].value['comfort'],
        //scaleRecomendation:this.patientPoll.controls['scaleRecomendation'].value,
        escalaRecomendacion: this.patientPoll.controls['scaleRecommendation'].value,
        commentarioAdicional: this.patientPoll.controls['additionalComments'].value,

        /*  scaleRecomendation:'6',
         additionalComments:'8' */
      }
      //console.log(dataguardar);
      this.formularioService.postFormulario(dataguardar).subscribe(
        (data) => {

          console.log(data);
          this.patientPoll.reset();
          this.hideData();
          this.router.navigateByUrl('/claims/encuesta/answer');
          console.log(this.element)
          //this.spinner.show();

           //setTimeout(() => { 
            //location.href = 'https://www.maisondesante.org.pe/encuestas/newform'
            //location.href = 'http://localhost:4200/newform'
            //this.router.navigateByUrl('encuestas/newform');
            
            
            /** spinner ends after 5 seconds */
            //this.spinner.hide();
            
          //}, 5000);

        });
    }

  }

  /* redirecction(){
    location.href = 'https://www.maisondesante.org.pe/';
    location.href = 'http://localhost:4200/answer'
  } */

  getdataEncuesta(){
    //this.router.navigateByUrl('encuestas/resultadoencuesta');
    this.router.navigateByUrl('claims/encuesta/resultadoencuesta');
  }

  onSubmit(): any {
    this.guardarForm();

    //return this.guardarForm().subscribe((data) => { console.log(data);});
    //console.log("funciona");
    //this.redirecction();
  }

}
