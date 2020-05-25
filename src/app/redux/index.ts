import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as fromCore from '../redux/core.reducers';

export interface State {
  core: fromCore.State;
}

export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer
};

export const getCore = (state: State) => state.core;

export const getSession = createSelector(
  getCore,
  (state: fromCore.State) => state ? state.session : null
);

export const getActivePolls = createSelector(
  getCore,
  (state: fromCore.State) => state ? state.activePolls : null
);

export const getPopularPolls = createSelector(
  getCore,
  (state: fromCore.State) => state ? state.popularPolls : null
);

export const getRecentPolls = createSelector(
  getCore,
  (state: fromCore.State) => state ? state.recentPolls : null
);

export const getToken = createSelector(
  getCore,
  (state: fromCore.State) => state ? state.token : null
);
export const getAuth = createSelector(
  getCore,
  (state: fromCore.State) => state ? state.auth : ''
);
