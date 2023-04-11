import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoAltaHospitalariaComponent } from './seguimiento-alta-hospitalaria.component';

describe('SeguimientoAltaHospitalariaComponent', () => {
  let component: SeguimientoAltaHospitalariaComponent;
  let fixture: ComponentFixture<SeguimientoAltaHospitalariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoAltaHospitalariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoAltaHospitalariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
