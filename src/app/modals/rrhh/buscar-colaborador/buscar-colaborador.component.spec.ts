import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarColaboradorComponent } from './buscar-colaborador.component';

describe('BuscarColaboradorComponent', () => {
  let component: BuscarColaboradorComponent;
  let fixture: ComponentFixture<BuscarColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarColaboradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
