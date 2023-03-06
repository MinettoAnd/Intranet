import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresionInformesRealizadosComponent } from './impresion-informes-realizados.component';

describe('ImpresionInformesRealizadosComponent', () => {
  let component: ImpresionInformesRealizadosComponent;
  let fixture: ComponentFixture<ImpresionInformesRealizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpresionInformesRealizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpresionInformesRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
