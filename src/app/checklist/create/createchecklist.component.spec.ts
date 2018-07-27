import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChecklistComponent } from './chkworkflow.component';

describe('CreateChecklistComponent', () => {
  let component: CreateChecklistComponent;
  let fixture: ComponentFixture<CreateChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
