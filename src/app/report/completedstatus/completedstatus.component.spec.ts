import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedstatusComponent } from './completedstatus.component';

describe('CompletedstatusComponent', () => {
  let component: CompletedstatusComponent;
  let fixture: ComponentFixture<CompletedstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
