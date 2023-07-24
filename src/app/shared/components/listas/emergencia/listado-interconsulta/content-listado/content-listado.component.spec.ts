import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListadoComponent } from './content-listado.component';

describe('ContentListadoComponent', () => {
  let component: ContentListadoComponent;
  let fixture: ComponentFixture<ContentListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
