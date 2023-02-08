import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirugiasProgramadasComponent } from './cirugias-programadas.component';

describe('CirugiasProgramadasComponent', () => {
  let component: CirugiasProgramadasComponent;
  let fixture: ComponentFixture<CirugiasProgramadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirugiasProgramadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirugiasProgramadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
