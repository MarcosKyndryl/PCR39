import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrizarComponent } from './parametrizar.component';

describe('ParametrizarComponent', () => {
  let component: ParametrizarComponent;
  let fixture: ComponentFixture<ParametrizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
