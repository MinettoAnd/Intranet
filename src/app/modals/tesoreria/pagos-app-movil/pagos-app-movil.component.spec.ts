import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAppMovilComponent } from './pagos-app-movil.component';

describe('AltaHospitalariaComponent', () => {
  let component: PagosAppMovilComponent;
  let fixture: ComponentFixture<PagosAppMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosAppMovilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosAppMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
