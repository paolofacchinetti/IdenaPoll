import {createAction, props} from '@ngrx/store';
import {SessionBean} from '../shared/model/session.bean';

export const setSession = createAction(
  '[Core] setSession',
  props<{ value: SessionBean }>()
);

export const setToken = createAction(
  '[Core] setToken',
  props<{ value: string }>()
);
export const setAuth = createAction(
  '[Core] setAuth',
  props<{ value: string }>()
);
