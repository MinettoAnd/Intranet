import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaResumenPagosComponent } from './planilla-resumen-pagos.component';

describe('PlanillaResumenPagosComponent', () => {
  let component: PlanillaResumenPagosComponent;
  let fixture: ComponentFixture<PlanillaResumenPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillaResumenPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaResumenPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
