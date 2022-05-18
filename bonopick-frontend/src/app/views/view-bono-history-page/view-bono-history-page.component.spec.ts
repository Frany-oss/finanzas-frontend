import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBonoHistoryPageComponent } from './view-bono-history-page.component';

describe('ViewBonoHistoryPageComponent', () => {
  let component: ViewBonoHistoryPageComponent;
  let fixture: ComponentFixture<ViewBonoHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBonoHistoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBonoHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
