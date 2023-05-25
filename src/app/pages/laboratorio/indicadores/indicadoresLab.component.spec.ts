import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresLabComponent } from './indicadoresLab.component';

describe('IndicadoresComponent', () => {
  let component: IndicadoresLabComponent;
  let fixture: ComponentFixture<IndicadoresLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadoresLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
