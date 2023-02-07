import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetiIpressComponent } from './seti-ipress.component';

describe('SetiIpressComponent', () => {
  let component: SetiIpressComponent;
  let fixture: ComponentFixture<SetiIpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetiIpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetiIpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
