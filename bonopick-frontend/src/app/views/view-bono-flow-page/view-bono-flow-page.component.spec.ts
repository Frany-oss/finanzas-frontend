import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBonoPageComponent } from './view-bono-flow-page.component';

describe('ViewBonoPageComponent', () => {
  let component: ViewBonoPageComponent;
  let fixture: ComponentFixture<ViewBonoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBonoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBonoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
