import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizationEstadisticsComponent } from './hospitalization-estadistics.component';

describe('HospitalizationEstadisticsComponent', () => {
  let component: HospitalizationEstadisticsComponent;
  let fixture: ComponentFixture<HospitalizationEstadisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalizationEstadisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalizationEstadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
