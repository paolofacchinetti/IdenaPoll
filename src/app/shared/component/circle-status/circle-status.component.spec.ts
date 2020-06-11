import {ComponentFixture, TestBed} from '@angular/core/testing';

import {getBaseTestModuleWithAddition} from 'test/common-test-utils.functions';

import {CircleStatusComponent} from './circle-status.component';

describe('CircleStatusComponent', () => {
  let component: CircleStatusComponent;
  let fixture: ComponentFixture<CircleStatusComponent>;
  const storeStub = {
    dispatch: arg1 => ({}),
    pipe: (arg1, arg2) => ({subscribe: () => ({})})
  };
  beforeEach(() => {
    TestBed.configureTestingModule(
      getBaseTestModuleWithAddition({
        additionalDeclarations: [CircleStatusComponent], additionalStoreData: storeStub
      })
    );
    fixture = TestBed.createComponent(CircleStatusComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
