import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaColaboradoresComponent } from './planilla-colaboradores.component';

describe('PlanillaColaboradoresComponent', () => {
  let component: PlanillaColaboradoresComponent;
  let fixture: ComponentFixture<PlanillaColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillaColaboradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
