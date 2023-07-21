import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTrabajadoresScrtComponent } from './listado-trabajadores-scrt.component';

describe('ListadoTrabajadoresScrtComponent', () => {
  let component: ListadoTrabajadoresScrtComponent;
  let fixture: ComponentFixture<ListadoTrabajadoresScrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTrabajadoresScrtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTrabajadoresScrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
