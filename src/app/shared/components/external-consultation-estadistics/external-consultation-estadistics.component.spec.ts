import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalConsultationEstadisticsComponent } from './external-consultation-estadistics.component';

describe('ExternalConsultationEstadisticsComponent', () => {
  let component: ExternalConsultationEstadisticsComponent;
  let fixture: ComponentFixture<ExternalConsultationEstadisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalConsultationEstadisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalConsultationEstadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
