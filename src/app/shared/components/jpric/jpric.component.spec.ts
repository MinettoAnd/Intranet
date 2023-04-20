import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JPRICComponent } from './jpric.component';

describe('JPRICComponent', () => {
  let component: JPRICComponent;
  let fixture: ComponentFixture<JPRICComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JPRICComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JPRICComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
