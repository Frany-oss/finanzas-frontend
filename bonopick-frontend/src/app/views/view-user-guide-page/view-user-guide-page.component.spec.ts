import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserGuidePageComponent } from './view-user-guide-page.component';

describe('ViewUserGuidePageComponent', () => {
  let component: ViewUserGuidePageComponent;
  let fixture: ComponentFixture<ViewUserGuidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserGuidePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserGuidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
