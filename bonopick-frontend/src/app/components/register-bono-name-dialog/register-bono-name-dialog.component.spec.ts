import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBonoNameDialogComponent } from './register-bono-name-dialog.component';

describe('RegisterBonoNameDialogComponent', () => {
  let component: RegisterBonoNameDialogComponent;
  let fixture: ComponentFixture<RegisterBonoNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBonoNameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBonoNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
