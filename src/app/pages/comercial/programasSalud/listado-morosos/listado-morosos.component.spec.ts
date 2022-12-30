import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMorososComponent } from './listado-morosos.component';

describe('ListadoMorososComponent', () => {
  let component: ListadoMorososComponent;
  let fixture: ComponentFixture<ListadoMorososComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMorososComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMorososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
