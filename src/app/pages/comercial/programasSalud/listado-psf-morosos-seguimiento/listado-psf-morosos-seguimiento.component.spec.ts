import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPSFMorososSeguimientoComponent } from './listado-psf-morosos-seguimiento.component';

describe('ListadoPSFMorososSeguimientoComponent', () => {
  let component: ListadoPSFMorososSeguimientoComponent;
  let fixture: ComponentFixture<ListadoPSFMorososSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPSFMorososSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPSFMorososSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
