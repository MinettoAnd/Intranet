import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JpricComponent } from './jpric.component';

describe('JpricComponent', () => {
  let component: JpricComponent;
  let fixture: ComponentFixture<JpricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JpricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JpricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
