import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEstadisticasComponent } from './content-estadisticas.component';

describe('ContentEstadisticasComponent', () => {
  let component: ContentEstadisticasComponent;
  let fixture: ComponentFixture<ContentEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentEstadisticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
