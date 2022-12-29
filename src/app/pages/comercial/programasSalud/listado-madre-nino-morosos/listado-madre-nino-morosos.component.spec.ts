import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMadreNinoMorososComponent } from './listado-madre-nino-morosos.component';

describe('ListadoMadreNinoMorososComponent', () => {
  let component: ListadoMadreNinoMorososComponent;
  let fixture: ComponentFixture<ListadoMadreNinoMorososComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMadreNinoMorososComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMadreNinoMorososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
