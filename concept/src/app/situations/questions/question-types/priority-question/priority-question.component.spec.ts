import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityQuestionComponent } from './priority-question.component';

describe('PriorityQuestionComponent', () => {
  let component: PriorityQuestionComponent;
  let fixture: ComponentFixture<PriorityQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
