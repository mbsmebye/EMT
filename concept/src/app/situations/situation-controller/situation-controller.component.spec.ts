import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationControllerComponent } from './situation-controller.component';

describe('SituationControllerComponent', () => {
  let component: SituationControllerComponent;
  let fixture: ComponentFixture<SituationControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
