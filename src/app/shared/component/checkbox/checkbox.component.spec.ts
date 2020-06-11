import {ComponentFixture, TestBed} from '@angular/core/testing';

import {getBaseTestModuleWithAddition} from 'test/common-test-utils.functions';

import {CheckboxComponent} from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  const storeStub = {
    dispatch: arg1 => ({}),
    pipe: (arg1, arg2) => ({subscribe: () => ({})})
  };
  beforeEach(() => {
    TestBed.configureTestingModule(
      getBaseTestModuleWithAddition({
        additionalDeclarations: [CheckboxComponent], additionalStoreData: storeStub
      })
    );
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
