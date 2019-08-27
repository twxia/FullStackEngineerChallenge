import { of } from 'rxjs';
import { switchMap, filter, delay } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import { RootState } from '../reducers';
import * as actions from '../actions/system';

type Action = ActionType<typeof actions>;

export const dismissMessageEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.updateMessage)),
    filter(({ payload: { message } }) => message !== ''),
    switchMap(() => of(actions.updateMessage({ message: '' }))),
    delay(2000)
  );

export default [dismissMessageEpic];
