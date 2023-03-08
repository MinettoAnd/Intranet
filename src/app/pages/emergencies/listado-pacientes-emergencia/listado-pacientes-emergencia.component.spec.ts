import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPacientesEmergenciaComponent } from './listado-pacientes-emergencia.component';

describe('ListadoPacientesEmergenciaComponent', () => {
  let component: ListadoPacientesEmergenciaComponent;
  let fixture: ComponentFixture<ListadoPacientesEmergenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPacientesEmergenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPacientesEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
