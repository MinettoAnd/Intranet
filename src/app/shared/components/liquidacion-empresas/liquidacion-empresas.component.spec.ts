import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionEmpresasComponent } from './liquidacion-empresas.component';

describe('LiquidacionEmpresasComponent', () => {
  let component: LiquidacionEmpresasComponent;
  let fixture: ComponentFixture<LiquidacionEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidacionEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
