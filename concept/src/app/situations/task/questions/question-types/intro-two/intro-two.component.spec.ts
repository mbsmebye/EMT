import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroTwoComponent } from './intro-two.component';

describe('IntroTwoComponent', () => {
  let component: IntroTwoComponent;
  let fixture: ComponentFixture<IntroTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
