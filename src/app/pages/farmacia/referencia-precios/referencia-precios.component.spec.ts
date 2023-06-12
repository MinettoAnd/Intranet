import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciaPreciosComponent } from './referencia-precios.component';

describe('ReferenciaPreciosComponent', () => {
  let component: ReferenciaPreciosComponent;
  let fixture: ComponentFixture<ReferenciaPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenciaPreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciaPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
