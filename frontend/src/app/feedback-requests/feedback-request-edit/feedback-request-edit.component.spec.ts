import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRequestEditComponent } from './feedback-request-edit.component';

describe('FeedbackRequestEditComponent', () => {
  let component: FeedbackRequestEditComponent;
  let fixture: ComponentFixture<FeedbackRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackRequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
