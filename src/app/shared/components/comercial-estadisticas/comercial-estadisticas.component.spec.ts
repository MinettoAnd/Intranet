import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialEstadisticasComponent } from './comercial-estadisticas.component';

describe('ComercialEstadisticasComponent', () => {
  let component: ComercialEstadisticasComponent;
  let fixture: ComponentFixture<ComercialEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComercialEstadisticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComercialEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
