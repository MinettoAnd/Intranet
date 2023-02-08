import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionEmpresaBiohealthComponent } from './liquidacion-empresa-biohealth.component';

describe('LiquidacionEmpresaBiohealthComponent', () => {
  let component: LiquidacionEmpresaBiohealthComponent;
  let fixture: ComponentFixture<LiquidacionEmpresaBiohealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidacionEmpresaBiohealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionEmpresaBiohealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
