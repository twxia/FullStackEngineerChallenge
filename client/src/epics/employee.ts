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

export const addEmployeeEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.addEmployee)),
    switchMap(({ payload: { name } }) =>
      from(addEmployee({ name })).pipe(
        switchMap(data => of(actions.addEmployeeSuccess({ data: data.result })))
      )
    )
  );

export const getEmployeesEpic: Epic<Action, Action, RootState> = action$ =>
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

export const removeEmployeeEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.removeEmployee)),
    switchMap(({ payload: { id } }) =>
      from(removeEmployee({ id })).pipe(
        switchMap(() => of(actions.removeEmployeeSuccess({ id })))
      )
    )
  );

export const updateEmployeeEpic: Epic<Action, Action, RootState> = action$ =>
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

export const addReviewToEmployeeEpic: Epic<
  Action,
  Action,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.setEmployeeAsReviewer)),
    switchMap(({ payload: { id, targetId } }) =>
      from(updateEmployee({ id, review: [targetId] })).pipe(
        switchMap(data =>
          of(actions.setEmployeeAsReviewerSuccess({ data: data.result }))
        )
      )
    )
  );

export default [
  addEmployeeEpic,
  getEmployeesEpic,
  removeEmployeeEpic,
  updateEmployeeEpic,
  addReviewToEmployeeEpic,
];
