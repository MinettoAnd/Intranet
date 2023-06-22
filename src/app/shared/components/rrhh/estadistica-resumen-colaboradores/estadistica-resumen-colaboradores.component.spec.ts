import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaResumenColaboradoresComponent } from './estadistica-resumen-colaboradores.component';

describe('EstadisticaResumenColaboradoresComponent', () => {
  let component: EstadisticaResumenColaboradoresComponent;
  let fixture: ComponentFixture<EstadisticaResumenColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaResumenColaboradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaResumenColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
