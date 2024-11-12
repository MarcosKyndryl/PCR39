import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionesComponent } from './ejecuciones.component';

describe('EjecucionesComponent', () => {
  let component: EjecucionesComponent;
  let fixture: ComponentFixture<EjecucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjecucionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjecucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
