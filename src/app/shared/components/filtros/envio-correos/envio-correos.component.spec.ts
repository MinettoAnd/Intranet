import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEnvioCorreosComponent } from './envio-correos.component';

describe('EnvioCorreosComponent', () => {
  let component: FilterEnvioCorreosComponent;
  let fixture: ComponentFixture<FilterEnvioCorreosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterEnvioCorreosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterEnvioCorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
