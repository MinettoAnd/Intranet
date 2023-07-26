import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioBoletasComponent } from './envio-boletas.component';

describe('EnvioBoletasComponent', () => {
  let component: EnvioBoletasComponent;
  let fixture: ComponentFixture<EnvioBoletasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioBoletasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioBoletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
