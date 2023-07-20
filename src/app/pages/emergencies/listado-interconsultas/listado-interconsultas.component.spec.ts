import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoInterconsultasComponent } from './listado-interconsultas.component';

describe('ListadoInterconsultasComponent', () => {
  let component: ListadoInterconsultasComponent;
  let fixture: ComponentFixture<ListadoInterconsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoInterconsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoInterconsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
