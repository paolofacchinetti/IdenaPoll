import {createAction, props} from '@ngrx/store';
import {SessionBean} from '../shared/model/session.bean';
import {PollBean} from '@app-shared/model/poll.bean';

export const setSession = createAction(
  '[Core] setSession',
  props<{ value: SessionBean }>()
);
export const setActivePolls = createAction(
  '[Core] Set Active Polls',
  props<{ value: PollBean[] }>()
);
export const setRecentPolls = createAction(
  '[Core] Set Recent Polls',
  props<{ value: PollBean[] }>()
);
export const setToken = createAction(
  '[Core] setToken',
  props<{ value: string }>()
);
export const setAuth = createAction(
  '[Core] setAuth',
  props<{ value: string }>()
);
