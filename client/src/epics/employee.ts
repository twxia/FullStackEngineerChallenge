import { of, from } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import {
  getEmployees,
  removeEmployee,
  updateEmployee,
  addEmployee,
} from '../services/ReviewSystem/employee';
import { RootState } from '../reducers';
import * as actions from '../actions/employee';

type Action = ActionType<typeof actions>;

export const addEmployesEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.addEmployee)),
    switchMap(({ payload: { name } }) =>
      from(addEmployee({ name })).pipe(
        switchMap(data => of(actions.addEmployeeSuccess({ data: data.result })))
      )
    )
  );

export const getEmployessEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.getEmployees)),
    switchMap(() =>
      from(getEmployees()).pipe(
        switchMap(data =>
          of(actions.getEmployeesSuccess({ data: data.result || [] }))
        )
      )
    )
  );

export const removeEmployesEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.removeEmployee)),
    switchMap(({ payload: { id } }) =>
      from(removeEmployee({ id })).pipe(
        switchMap(() => of(actions.removeEmployeeSuccess({ id })))
      )
    )
  );

export const updateEmployesEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.updateEmployee)),
    switchMap(({ payload: { id, name } }) =>
      from(updateEmployee({ id, name })).pipe(
        switchMap(data =>
          of(actions.updateEmployeeSuccess({ data: data.result }))
        )
      )
    )
  );

export default [
  addEmployesEpic,
  getEmployessEpic,
  removeEmployesEpic,
  updateEmployesEpic,
];
