import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioCorreosComponent } from './envio-correos.component';

describe('EnvioCorreosComponent', () => {
  let component: EnvioCorreosComponent;
  let fixture: ComponentFixture<EnvioCorreosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioCorreosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioCorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
