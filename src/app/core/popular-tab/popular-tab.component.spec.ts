import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopularTabComponent} from './popular-tab.component';

describe('PopularTabComponent', () => {
  let component: PopularTabComponent;
  let fixture: ComponentFixture<PopularTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopularTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
