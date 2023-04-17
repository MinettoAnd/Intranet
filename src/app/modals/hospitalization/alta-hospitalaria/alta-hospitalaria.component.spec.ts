import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaHospitalariaComponent } from './alta-hospitalaria.component';

describe('AltaHospitalariaComponent', () => {
  let component: AltaHospitalariaComponent;
  let fixture: ComponentFixture<AltaHospitalariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaHospitalariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaHospitalariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
