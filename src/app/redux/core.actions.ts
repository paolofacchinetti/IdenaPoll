import {createAction, props} from '@ngrx/store';
import {SessionBean} from '../shared/model/session.bean';
import {PollBean} from '@app-shared/model/poll.bean';
import {MatSnackBarConfig} from "@angular/material/snack-bar";

export const setSession = createAction(
  '[Core] setSession',
  props<{ value: SessionBean }>()
);

export const setActivePolls = createAction(
  '[Core] Set Active Polls',
  props<{ value: PollBean[] }>()
);

export const setFilteredPolls = createAction(
  '[Core] Set Active Polls',
  props<{ value: PollBean[] }>()
);

export const setRecentPolls = createAction(
  '[Core] Set Recent Polls',
  props<{ value: PollBean[] }>()
);

export const setSelectedPoll = createAction(
  '[Core] Set Selected Poll',
  props<{ value: PollBean }>()
);
export const endSelectedPoll = createAction(
  '[Core] end Selected Poll',
  props<{}>()
);
export const endActivePoll = createAction(
  '[Core]  end active Poll',
  props<{ value: string }>()
);

export const setToken = createAction(
  '[Core] setToken',
  props<{ value: string }>()
);

export const setAuth = createAction(
  '[Core] setAuth',
  props<{ value: string }>()
);

export const dismissStatusBar = createAction(
  '[Core] dismissStatusBar',
  props()
);

export const openStatusBar = createAction(
  '[Core] openStatusBar',
  props<{ value: MatSnackBarConfig, stayopen: boolean }>()
);
