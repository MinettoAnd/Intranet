import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterIndicadoresComponent } from './filterIndicadores.component';

describe('IndicadoresComponent', () => {
  let component: FilterIndicadoresComponent;
  let fixture: ComponentFixture<FilterIndicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterIndicadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
