import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenColaboradoresComponent } from './resumen-colaboradores.component';

describe('ResumenColaboradoresComponent', () => {
  let component: ResumenColaboradoresComponent;
  let fixture: ComponentFixture<ResumenColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenColaboradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
