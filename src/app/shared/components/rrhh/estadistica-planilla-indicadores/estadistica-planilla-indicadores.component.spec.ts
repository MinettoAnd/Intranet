import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaPlanillaIndicadoresComponent } from './estadistica-planilla-indicadores.component';

describe('EstadisticaPlanillaIndicadoresComponent', () => {
  let component: EstadisticaPlanillaIndicadoresComponent;
  let fixture: ComponentFixture<EstadisticaPlanillaIndicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaPlanillaIndicadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaPlanillaIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
