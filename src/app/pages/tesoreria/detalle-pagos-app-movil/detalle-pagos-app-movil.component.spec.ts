import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePagosAppMovilComponent } from './detalle-pagos-app-movil.component';

describe('DetallePagosAppMovilComponent', () => {
  let component: DetallePagosAppMovilComponent;
  let fixture: ComponentFixture<DetallePagosAppMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePagosAppMovilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePagosAppMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
