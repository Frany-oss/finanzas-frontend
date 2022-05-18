import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAnualInflationComponent } from './register-anual-inflation-dialog.component';

describe('RegisterAnualInflationComponent', () => {
  let component: RegisterAnualInflationComponent;
  let fixture: ComponentFixture<RegisterAnualInflationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAnualInflationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAnualInflationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
