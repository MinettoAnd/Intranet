import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalConsultationComponent } from './external-consultation.component';

describe('ExternalConsultationComponent', () => {
  let component: ExternalConsultationComponent;
  let fixture: ComponentFixture<ExternalConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
