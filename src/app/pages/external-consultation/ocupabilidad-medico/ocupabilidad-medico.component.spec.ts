import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupabilidadMedicoComponent } from './ocupabilidad-medico.component';

describe('OcupabilidadMedicoComponent', () => {
  let component: OcupabilidadMedicoComponent;
  let fixture: ComponentFixture<OcupabilidadMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupabilidadMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupabilidadMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
