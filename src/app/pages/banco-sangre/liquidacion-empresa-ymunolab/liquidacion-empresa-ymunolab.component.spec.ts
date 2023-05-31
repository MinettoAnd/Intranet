import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionEmpresaYmunolabComponent } from './liquidacion-empresa-ymunolab.component';

describe('LiquidacionEmpresaYmunolabComponent', () => {
  let component: LiquidacionEmpresaYmunolabComponent;
  let fixture: ComponentFixture<LiquidacionEmpresaYmunolabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidacionEmpresaYmunolabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionEmpresaYmunolabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
