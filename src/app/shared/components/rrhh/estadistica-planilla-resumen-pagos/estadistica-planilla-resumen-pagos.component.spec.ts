import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaPlanillaResumenPagosComponent } from './estadistica-planilla-resumen-pagos.component';

describe('EstadisticaPlanillaResumenPagosComponent', () => {
  let component: EstadisticaPlanillaResumenPagosComponent;
  let fixture: ComponentFixture<EstadisticaPlanillaResumenPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaPlanillaResumenPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaPlanillaResumenPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
