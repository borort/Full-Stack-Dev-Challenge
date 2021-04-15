import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewCreateComponent } from './performance-review-create.component';

describe('PerformanceReviewCreateComponent', () => {
  let component: PerformanceReviewCreateComponent;
  let fixture: ComponentFixture<PerformanceReviewCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceReviewCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceReviewCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
