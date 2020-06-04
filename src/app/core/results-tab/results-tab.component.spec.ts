import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsTabComponent } from './results-tab.component';

describe('ResultsTabComponent', () => {
  let component: ResultsTabComponent;
  let fixture: ComponentFixture<ResultsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
