import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenciesEstadisticsComponent } from './emergencies-estadistics.component';

describe('EmergenciesEstadisticsComponent', () => {
  let component: EmergenciesEstadisticsComponent;
  let fixture: ComponentFixture<EmergenciesEstadisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergenciesEstadisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenciesEstadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
