import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashIndicadoresComponent } from './dash-indicadores.component';

describe('DashIndicadoresComponent', () => {
  let component: DashIndicadoresComponent;
  let fixture: ComponentFixture<DashIndicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashIndicadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
