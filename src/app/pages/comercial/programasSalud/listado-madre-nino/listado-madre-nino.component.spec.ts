import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMadreNinoComponent } from './listado-madre-nino.component';

describe('ListadoMadreNinoComponent', () => {
  let component: ListadoMadreNinoComponent;
  let fixture: ComponentFixture<ListadoMadreNinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMadreNinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMadreNinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
