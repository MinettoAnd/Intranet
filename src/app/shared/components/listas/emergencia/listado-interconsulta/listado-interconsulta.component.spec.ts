import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoInterconsultaComponent } from './listado-interconsulta.component';

describe('ListadoInterconsultaComponent', () => {
  let component: ListadoInterconsultaComponent;
  let fixture: ComponentFixture<ListadoInterconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoInterconsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoInterconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
