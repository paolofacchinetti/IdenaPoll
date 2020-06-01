import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecentTabComponent} from './recent-tab.component';

describe('RecentTabComponent', () => {
  let component: RecentTabComponent;
  let fixture: ComponentFixture<RecentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecentTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
