import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MrolesComponent } from 'src/app/modals/admin/mroles/mroles.component';
import { MusersComponent } from 'src/app/modals/admin/musers/musers.component';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent implements OnInit {

  @Input() heading;
  @Input() subheading;
  @Input() icon;
  @Input() component;

  @Output() stateUser: EventEmitter<number> = new EventEmitter()
  @Output() stateRol: EventEmitter<number> = new EventEmitter()
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }
  open(modules) {
    if (modules === 'users') {
      const data = {
        isRegister: 1
      }
      const modalRef = this.modalService.open(MusersComponent, {
        size: 'lg'
      });
      modalRef.componentInstance.dato = data;
      modalRef.result.then((result) => {
        if (result.success === 1) {
          this.stateUser.emit(1)
        }

      }).catch((error) => {
        console.log(error);
      });
    }
    else if (modules === 'roles') {
      const data = {

      }
      const modalRef = this.modalService.open(MrolesComponent, {
        size: 'lg'
      });
      modalRef.componentInstance.dato = data;
      modalRef.result.then((result) => {
        if (result.success === 1) {
          this.stateRol.emit(1);
        }

      }).catch((error) => {
        console.log(error);
      });
    }
    const data = {

    }

  }
}
