import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesHospitalizadosComponent } from './pacientes-hospitalizados.component';

describe('PacientesHospitalizadosComponent', () => {
  let component: PacientesHospitalizadosComponent;
  let fixture: ComponentFixture<PacientesHospitalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesHospitalizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesHospitalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
