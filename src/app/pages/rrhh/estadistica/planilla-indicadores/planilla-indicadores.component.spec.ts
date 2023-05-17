import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaIndicadoresComponent } from './planilla-indicadores.component';

describe('PlanillaIndicadoresComponent', () => {
  let component: PlanillaIndicadoresComponent;
  let fixture: ComponentFixture<PlanillaIndicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillaIndicadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
