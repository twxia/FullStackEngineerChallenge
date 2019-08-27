import { createAction } from 'typesafe-actions';
import { GET_EMPLOYEES, GET_EMPLOYEES_SUCCESS } from '../constants/employee';
import { Employee } from '../reducers/employee';

export const getEmployeesSuccess = createAction(
  GET_EMPLOYEES_SUCCESS,
  action => ({ data }: { data: Array<Employee> }) =>
    action({
      data,
    })
);

export const getEmployees = createAction(GET_EMPLOYEES);
