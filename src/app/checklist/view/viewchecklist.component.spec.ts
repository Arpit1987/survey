import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewchecklistComponent } from './viewchecklist.component';

describe('ViewchecklistComponent', () => {
  let component: ViewchecklistComponent;
  let fixture: ComponentFixture<ViewchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
