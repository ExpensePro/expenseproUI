import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseStatisticsComponent } from './expense-statistics.component';

describe('ExpenseStatisticsComponent', () => {
  let component: ExpenseStatisticsComponent;
  let fixture: ComponentFixture<ExpenseStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpenseStatisticsComponent]
    });
    fixture = TestBed.createComponent(ExpenseStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
