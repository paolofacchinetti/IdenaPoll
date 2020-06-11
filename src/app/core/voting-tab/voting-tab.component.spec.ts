import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingTabComponent } from './voting-tab.component';

describe('VotingTabComponent', () => {
  let component: VotingTabComponent;
  let fixture: ComponentFixture<VotingTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
