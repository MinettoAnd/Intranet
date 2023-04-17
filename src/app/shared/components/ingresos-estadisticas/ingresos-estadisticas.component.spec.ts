import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosEstadisticasComponent } from './ingresos-estadisticas.component';

describe('IngresosEstadisticasComponent', () => {
  let component: IngresosEstadisticasComponent;
  let fixture: ComponentFixture<IngresosEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresosEstadisticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
