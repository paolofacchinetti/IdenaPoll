import {createAction, props} from '@ngrx/store';
import {SessionBean} from "../shared/model/session.bean";




export const setSession = createAction(
  '[Core] setSession',
  props<{ value: SessionBean }>()
);
