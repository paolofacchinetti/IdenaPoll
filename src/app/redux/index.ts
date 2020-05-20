import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as fromCore from '../redux/core.reducers';
export interface State {
  core: fromCore.State
}

export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer
};

export const getCore = (state: State) => state.core;

export const getSession = createSelector(
  getCore,
  (state: fromCore.State) => state ? state.session : null
);

