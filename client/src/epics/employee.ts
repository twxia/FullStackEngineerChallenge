import { of, from } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import { getEmployees } from '../services/ReviewSystem/employee';
import { RootState } from '../reducers';
import * as actions from '../actions/employee';

type Action = ActionType<typeof actions>;

export const getEmployessEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.getEmployees)),
    switchMap(() =>
      from(getEmployees()).pipe(
        switchMap(data => of(actions.getEmployeesSuccess({ data })))
      )
    )
  );

export default [getEmployessEpic];
