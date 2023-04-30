import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaSistemasComponent } from './gerencia-sistemas.component';

describe('GerenciaSistemasComponent', () => {
  let component: GerenciaSistemasComponent;
  let fixture: ComponentFixture<GerenciaSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciaSistemasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciaSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
