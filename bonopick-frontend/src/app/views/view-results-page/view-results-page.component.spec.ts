import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultsPageComponent } from './view-results-page.component';

describe('ViewResultsPageComponent', () => {
  let component: ViewResultsPageComponent;
  let fixture: ComponentFixture<ViewResultsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResultsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
