import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MypollsComponent} from './mypolls.component';

describe('MypollsComponent', () => {
  let component: MypollsComponent;
  let fixture: ComponentFixture<MypollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MypollsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
