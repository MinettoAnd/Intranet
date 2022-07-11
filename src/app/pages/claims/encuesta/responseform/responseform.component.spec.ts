import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseformComponent } from './responseform.component';

describe('ResponseformComponent', () => {
  let component: ResponseformComponent;
  let fixture: ComponentFixture<ResponseformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
