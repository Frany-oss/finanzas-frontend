import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegisterBonoComponent } from './view-register-bono.component';

describe('ViewRegisterBonoComponent', () => {
  let component: ViewRegisterBonoComponent;
  let fixture: ComponentFixture<ViewRegisterBonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRegisterBonoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegisterBonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
