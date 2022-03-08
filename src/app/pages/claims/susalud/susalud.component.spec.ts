import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusaludComponent } from './susalud.component';

describe('SusaludComponent', () => {
  let component: SusaludComponent;
  let fixture: ComponentFixture<SusaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SusaludComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SusaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
