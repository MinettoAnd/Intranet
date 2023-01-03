import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupabilidadConsultorioComponent } from './ocupabilidad-consultorio.component';

describe('OcupabilidadConsultorioComponent', () => {
  let component: OcupabilidadConsultorioComponent;
  let fixture: ComponentFixture<OcupabilidadConsultorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupabilidadConsultorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupabilidadConsultorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
