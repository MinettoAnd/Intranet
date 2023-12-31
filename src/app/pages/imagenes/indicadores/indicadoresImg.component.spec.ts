import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresImgComponent } from './indicadoresImg.component';

describe('IndicadoresImgComponent', () => {
  let component: IndicadoresImgComponent;
  let fixture: ComponentFixture<IndicadoresImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadoresImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
