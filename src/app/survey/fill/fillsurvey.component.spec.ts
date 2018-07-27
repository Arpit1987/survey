import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillsurveyComponent } from './fillsurvey.component';

describe('FillsurveyComponent', () => {
  let component: FillsurveyComponent;
  let fixture: ComponentFixture<FillsurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillsurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
