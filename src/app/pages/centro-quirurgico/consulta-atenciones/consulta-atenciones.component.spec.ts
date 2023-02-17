import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAtencionesComponent } from './consulta-atenciones.component';

describe('ConsultaAtencionesComponent', () => {
  let component: ConsultaAtencionesComponent;
  let fixture: ComponentFixture<ConsultaAtencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAtencionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAtencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
