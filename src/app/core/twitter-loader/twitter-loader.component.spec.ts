import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TwitterLoaderComponent} from './twitter-loader.component';

describe('TwitterLoaderComponent', () => {
  let component: TwitterLoaderComponent;
  let fixture: ComponentFixture<TwitterLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterLoaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
