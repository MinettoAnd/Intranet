import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSectionPlanillaComponent } from './content-section-planilla.component';

describe('ContentSectionPlanillaComponent', () => {
  let component: ContentSectionPlanillaComponent;
  let fixture: ComponentFixture<ContentSectionPlanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSectionPlanillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSectionPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
