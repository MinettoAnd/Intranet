import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSeguimientoMorososComponent } from './dashboard-seguimiento-morosos.component';

describe('DashboardSeguimientoMorososComponent', () => {
  let component: DashboardSeguimientoMorososComponent;
  let fixture: ComponentFixture<DashboardSeguimientoMorososComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSeguimientoMorososComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSeguimientoMorososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
