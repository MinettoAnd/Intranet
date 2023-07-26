import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioBoletasCorreoComponent } from './envio-boletas-correo.component';

describe('EnvioBoletasCorreoComponent', () => {
  let component: EnvioBoletasCorreoComponent;
  let fixture: ComponentFixture<EnvioBoletasCorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioBoletasCorreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioBoletasCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
