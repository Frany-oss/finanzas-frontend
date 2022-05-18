import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomePageComponent } from './view-home-page.component';

describe('ViewHomePageComponent', () => {
  let component: ViewHomePageComponent;
  let fixture: ComponentFixture<ViewHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
