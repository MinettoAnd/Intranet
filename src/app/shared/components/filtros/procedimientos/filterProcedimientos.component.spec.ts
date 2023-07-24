import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProcedimientosComponent } from './filterProcedimientos.component';

describe('ProcedimientosComponent', () => {
  let component: FilterProcedimientosComponent;
  let fixture: ComponentFixture<FilterProcedimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProcedimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProcedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
