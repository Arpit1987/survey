import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillChecklistComponent } from './checklist.component';

describe('FillChecklistComponent', () => {
  let component: FillChecklistComponent;
  let fixture: ComponentFixture<FillChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
