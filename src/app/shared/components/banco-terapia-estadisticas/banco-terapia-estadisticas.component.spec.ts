import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoTerapiaEstadisticasComponent } from './banco-terapia-estadisticas.component';

describe('BancoTerapiaEstadisticasComponent', () => {
  let component: BancoTerapiaEstadisticasComponent;
  let fixture: ComponentFixture<BancoTerapiaEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancoTerapiaEstadisticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoTerapiaEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
