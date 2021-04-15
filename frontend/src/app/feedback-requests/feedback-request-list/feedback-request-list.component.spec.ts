import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRequestListComponent } from './feedback-request-list.component';

describe('FeedbackRequestListComponent', () => {
  let component: FeedbackRequestListComponent;
  let fixture: ComponentFixture<FeedbackRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
