import {Action, createReducer, on} from '@ngrx/store';
import * as coreActions from './core.actions';
import {SessionBean} from "../shared/model/session.bean";



export interface State {
  session: SessionBean,
}

const INITIAL_STATE: State = {
  session: null,
};
const coreReducer = createReducer(
  INITIAL_STATE,
  on(coreActions.setSession, (state, payload) => ({
    ...state,
    darkTheme: payload.value,
  })),

);



export function reducer(state: State | undefined, action: Action) {
  return coreReducer(state, action);
}
