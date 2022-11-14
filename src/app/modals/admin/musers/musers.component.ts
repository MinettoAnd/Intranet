import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/pages/admin/admin.service';
import { Profile } from 'src/app/pages/models/admin/profile';
import { Users } from 'src/app/pages/models/admin/user';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { atLeastOneCheckboxCheckedValidator } from "./atLeastOneCheckboxCheckedValidator";
@Component({
  selector: 'app-musers',
  templateUrl: './musers.component.html',
  styleUrls: ['./musers.component.sass']
})
export class MusersComponent implements OnInit {
  @Input() dato;
  public roles: any = [];
  public userslist: any = [];
  updateForm: FormGroup;
  searchForm: FormGroup;
  submitted = false;
  submittedupdate = false;
  public textLoadion: string = "";
  checkedIDs: any = [];
  page = 1;
  pageSize = 20;
  collectionSize;
  listpersona: Profile[];
  subscription: Subscription;
  submittedValue: any;
  // checkboxes = [ ];
  constructor(public activeModal: NgbActiveModal, private apiService: AdminService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.searchForm = this.formBuilder.group({
      names: ['', Validators.required],
      idrol: [''],
    });
    this.updateForm = this.formBuilder.group({
      iduser: ['', Validators.required],
      editname: [{ value: '', disabled: true }],
      editapellidos: [{ value: '', disabled: true }],
      editarea: [{ value: '', disabled: true }],
      // editrol: [''],
    });
  }

  ngOnInit() {
    this.getRoles()
  }
  get f() {
    return this.searchForm.controls;
  }
  objectValues(obj) {
    let vals = [];
    for (var prop in obj) {
      
      if (prop === 'idrol'){
        console.log(obj[prop]);
        if (obj[prop].includes(',')){
          var array = obj[prop].split(",");
          // console.log(array);
          vals = array;
          return vals;
        }
        vals.push(obj[prop]);
      }
    }
    return vals;
  }
  getRoles() {
    this.apiService.getRolesServices().then((response: any) => {
      // console.log(response);
      this.roles = response.data.length > 0 ? response.data : [];
      // const perfil:any =  Array.of(this.dato);
      const perfil:any =  this.objectValues(this.dato);
      this.updateForm.addControl("editrol", this.buildRolFormArr(response.data, perfil));

    });
  }
  buildRolFormArr(roles, selectedRolIds: string[] = []): FormArray {
    const controlArr = roles.map(rol => {
      // console.log(selectedRolIds);
      let isSelected = selectedRolIds.some(idrol => idrol === rol.idrol.toString());
      return this.formBuilder.control(isSelected);
    })
    return this.formBuilder.array(controlArr, atLeastOneCheckboxCheckedValidator())
  }

  get uf() {
    return this.updateForm && this.updateForm.controls;
  }

  get editrol(): FormArray {
    return this.uf && <FormArray>this.uf.editrol
  }

  get rolesFormArraySelectedIds(): string[] {
    return this.roles
      .filter((rol, rolIdx) => this.editrol.controls.some((control, controlIdx) => rolIdx === controlIdx && control.value))
      .map(rol => rol.idrol);
  }

  refreshCountries() {
    this.listpersona = this.userslist
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  searchUsers() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    var formControl = this.searchForm.value;

    if (formControl.names.trim() == '') {
      return Swal.fire('Opss!', 'El campo no debe ser vacio', 'info');;
    }
    const data = {
      nombres: formControl.names

    }
    // console.log(formControl)
    this.textLoadion = "Realizando Busqueda...";
    this.showLoading();
    this.apiService.getProfileUserSearchService(data).then((response: any) => {
      this.userslist = response.length > 0 ? response : [];
      this.collectionSize = this.userslist.length;
      this.refreshCountries();
      Swal.close();
    }, (error) => {
      Swal.close();
    });
  }
  //TODO: CHECK LIST
  changeSelection(persona: Profile, isChecked: boolean) {
    if (isChecked) {
      this.checkedIDs.push(persona);
    } else {
      this.checkedIDs = this.checkedIDs.filter(item => item !== persona);
    }
    // console.log(this.checkedIDs);
  }
  //TODO:ASIGNAR ROL
  registerUser(state) {
    
    if (state != 2) {
      this.textLoadion = "Asignado Rol...";
      this.showLoading();
      const fromValue = this.searchForm.value;
      if (fromValue.idrol === '') {
        return Swal.fire('Error!', 'Seleccione el Rol', 'error');;
      }


      for (var i = 0; i < this.checkedIDs.length; i++) {
        const data = {
          userSpring: this.checkedIDs[i]?.Persona,
          usuario: this.checkedIDs[i]?.Usuario,
          firtname: this.checkedIDs[i]?.Nombres,
          lastname: this.checkedIDs[i]?.Apellidos,
          area: this.checkedIDs[i]?.DES_AREAS,
          idrol: fromValue.idrol,
          fecha: this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
        }
        this.apiService.getUserBrIdService(this.checkedIDs[i]?.Persona).then((response: any) => {
          this.userslist = response.data.length > 0 ? response.data : [];
          if (response.success == 1 && this.userslist.length > 0) {
            //TODO: MOSTRAR MENSAJE
            return Swal.fire('Error!', 'El usuario ya existe en la lista', 'error');;
          } else {
            //console.log(data)
            this.apiService.postUserService(data).then((response: any) => {
              var lista = response.data.length > 0 ? response.data : [];
              if (response.success == 1) {
                Swal.close();
                const data = {
                  success: 1
                }
                this.activeModal.close(data)
                // console.log("registro usuario")
              }
            }, (error) => {
              Swal.close();

            });

          }
        });
      }

    } else {
      this.submittedupdate = true;
      // console.log(this.dato)
      this.updateForm.value.editrol = JSON.stringify(this.rolesFormArraySelectedIds).replace('[', '');
      this.updateForm.value.editrol = this.updateForm.value.editrol.replace(']', '');
      // this.updateForm.value.editrol.replace(']', '');
      // var a = '[1,2,3]';
      // console.log(a);
      // console.log(a.replace('/^\[/', ''));
      if (this.updateForm.invalid) {
        // console.log(this.updateForm.value);
        return;
      }
      this.textLoadion = "Actualizando Rol...";
      this.showLoading();
      const fromValue = this.updateForm.value;
      const data = {
        iduser: fromValue.iduser,
        idrol: fromValue.editrol,
        date: this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
      }

      console.log(data)
      // return;
      this.apiService.updateUserService(data).then((response: any) => {
        if (response.success === 1) {
          Swal.close();
          this.success();
          const data = {
            success: 1
          }
          this.activeModal.close(data)
        } else {
          Swal.close();
          Swal.fire('Error!', 'Intentar nuevamente', 'error');
        }
      }).catch((err) => {
        Swal.close();
        Swal.fire('Error!', 'Intentar nuevamente', 'error');
      });
    }
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

  success() {
    Swal.fire({
      title: 'Exitoso!',
      width: '20rem',
      icon: 'success'
    })
  }

}

