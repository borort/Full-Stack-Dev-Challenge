import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewEditComponent } from './performance-review-edit.component';

describe('PerformanceReviewEditComponent', () => {
  let component: PerformanceReviewEditComponent;
  let fixture: ComponentFixture<PerformanceReviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceReviewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
