import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCabeceraComponent } from './panel-cabecera.component';

describe('PanelCabeceraComponent', () => {
  let component: PanelCabeceraComponent;
  let fixture: ComponentFixture<PanelCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelCabeceraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
