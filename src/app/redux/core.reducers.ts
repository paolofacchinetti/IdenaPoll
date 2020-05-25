import {Action, createReducer, on} from '@ngrx/store';
import * as coreActions from './core.actions';
import {SessionBean} from '../shared/model/session.bean';
import {PollBean} from '@app-shared/model/poll.bean';

export interface State {
  activePolls: PollBean[];
  recentPolls: PollBean[];
  popularPolls: PollBean[];
  session: SessionBean;
  token: string;
  auth: string;
}

const INITIAL_STATE: State = {
  activePolls: null,
  popularPolls: null,
  recentPolls: null,
  session: null,
  token: null,
  auth:''
};
const coreReducer = createReducer(
  INITIAL_STATE,
  on(coreActions.setSession, (state, payload) => ({
    ...state,
    session: payload.value,
  })),
  on(coreActions.setToken, (state, payload) => ({
    ...state,
    token: payload.value,
  })),
  on(coreActions.setActivePolls, (state, payload) => ({
    ...state,
    activePolls: payload.value,
  })),
  on(coreActions.setRecentPolls, (state, payload) => ({
    ...state,
    recentPolls: payload.value,
  })),
  on(coreActions.setPopularPolls, (state, payload) => ({
    ...state,
    popularPolls: payload.value,
  })),
  on(coreActions.setAuth, (state, payload) => ({
    ...state,
    auth: payload.value,
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return coreReducer(state, action);
}
