import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonToggleItem} from 'sportello-core/model/app/button-toggle-item.interface';
import {getBaseTestModuleWithAddition} from 'test/common-test-utils.functions';

import {ToggleButtonComponent} from './toggle-button.component';

class ButtonToggleItemMock implements ButtonToggleItem {
  canDisableRipple?: boolean;
  label: string;
  disabled?: boolean;
  value?: any;
  additionalLabelVisible?: boolean;
  additionalLabel?: string;
}

describe('ToggleButtonComponent', () => {
  let component: ToggleButtonComponent;
  let fixture: ComponentFixture<ToggleButtonComponent>;
  const storeStub = {
    dispatch: arg1 => ({}),
    pipe: (arg1, arg2) => ({subscribe: () => ({})})
  };
  beforeEach(() => {
    const buttonToggleItemStub: ButtonToggleItemMock = {
      label: 'mock'
    };
    TestBed.configureTestingModule(
      getBaseTestModuleWithAddition({
        additionalDeclarations: [ToggleButtonComponent],
        additionalProviders: [{provide: ButtonToggleItemMock, useValue: buttonToggleItemStub}],
        additionalStoreData: storeStub
      })
    );
    fixture = TestBed.createComponent(ToggleButtonComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
