import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatAutocompleteSelectedEvent} from '@angular/material';

import {ButtonConfigurationConstants} from 'sportello-core/model/app/button-classes/button-configuration.constants';
import {getBaseTestModuleWithAddition} from 'test/common-test-utils.functions';

import {DropdownComponent} from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  const storeStub = {
    dispatch: arg1 => ({}),
    pipe: (arg1, arg2) => ({subscribe: () => ({})})
  };
  beforeEach(() => {
    const matAutocompleteSelectedEventStub = {};
    TestBed.configureTestingModule(
      getBaseTestModuleWithAddition({
        additionalDeclarations: [DropdownComponent],
        additionalProviders: [
          {
            provide: MatAutocompleteSelectedEvent,
            useValue: matAutocompleteSelectedEventStub
          }
        ], additionalStoreData: storeStub
      })
    );
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
  });
  it('can load instance and default values', () => {
    expect(component).toBeTruthy();
    expect(component.BUTTON_CONFIGURATION).toEqual(ButtonConfigurationConstants);
    expect(component.disabledCondition).toEqual(false);
    expect(component.requiredCondition).toEqual(false);
    expect(component.tabindex).toEqual(0);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
