import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoContratosVigentesComponent } from './listado-contratos-vigentes.component';

describe('ListadoContratosVigentesComponent', () => {
  let component: ListadoContratosVigentesComponent;
  let fixture: ComponentFixture<ListadoContratosVigentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoContratosVigentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoContratosVigentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
