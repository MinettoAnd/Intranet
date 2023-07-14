import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentInventarioComponent } from './content-inventario.component';

describe('ContentInventarioComponent', () => {
  let component: ContentInventarioComponent;
  let fixture: ComponentFixture<ContentInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
