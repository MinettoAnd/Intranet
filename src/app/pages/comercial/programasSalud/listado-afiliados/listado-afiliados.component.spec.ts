import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAfiliadosComponent } from './listado-afiliados.component';

describe('ListadoAfiliadosComponent', () => {
  let component: ListadoAfiliadosComponent;
  let fixture: ComponentFixture<ListadoAfiliadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoAfiliadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAfiliadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
