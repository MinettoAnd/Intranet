import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorRecetasComponent } from './indicador-recetas.component';

describe('IndicadorRecetasComponent', () => {
  let component: IndicadorRecetasComponent;
  let fixture: ComponentFixture<IndicadorRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadorRecetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
