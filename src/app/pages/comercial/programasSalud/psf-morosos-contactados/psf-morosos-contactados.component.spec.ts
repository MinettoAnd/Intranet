import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsfMorososContactadosComponent } from './psf-morosos-contactados.component';

describe('PsfMorososContactadosComponent', () => {
  let component: PsfMorososContactadosComponent;
  let fixture: ComponentFixture<PsfMorososContactadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsfMorososContactadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsfMorososContactadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
