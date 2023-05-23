import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaPlanillaResumenIndicadoresComponent } from './estadistica-planilla-resumen-indicadores.component';

describe('EstadisticaPlanillaResumenIndicadoresComponent', () => {
  let component: EstadisticaPlanillaResumenIndicadoresComponent;
  let fixture: ComponentFixture<EstadisticaPlanillaResumenIndicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaPlanillaResumenIndicadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaPlanillaResumenIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
