import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExpedientesComponent } from './reporte-expedientes.component';

describe('ReporteExpedientesComponent', () => {
  let component: ReporteExpedientesComponent;
  let fixture: ComponentFixture<ReporteExpedientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteExpedientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
