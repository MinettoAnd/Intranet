import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenGerencialComponent } from './resumen-gerencial.component';

describe('ResumenGerencialComponent', () => {
  let component: ResumenGerencialComponent;
  let fixture: ComponentFixture<ResumenGerencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenGerencialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenGerencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
