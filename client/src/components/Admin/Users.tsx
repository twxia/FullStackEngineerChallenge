import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import styled from 'styled-components';
import { ActionType } from 'typesafe-actions';
import AddUserSection from './AddUserSection';
import UserSection from './UserSection';
import { RootState } from '../../reducers';
import { ListOfEmployee } from '../../reducers/employee';
import * as actions from '../../actions';
import { getEmployees as getEmployeesAction } from '../../actions/employee';

type Action = ActionType<typeof actions>;

export interface UsersProps {
  isProcessing: boolean;
  getEmployees: Function;
  removeEmployee: Function;
  updateEmployee: Function;
  setEmployeeAsReviewer: Function;
  employees: ListOfEmployee;
}

const SectionTitle = styled.h2``;

export function Users({ getEmployees, employees }: UsersProps) {
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div data-testid={'main-component'}>
      <SectionTitle>Employees</SectionTitle>
      <AddUserSection />
      <div>
        {Object.values(employees)
          .filter(employee => !employee.removedAt)
          .map((data, index) => (
            <UserSection key={data.id} data={data} />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  employees: state.employee.list,
  isProcessing: state.employee.isProcessing,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      getEmployees: () => getEmployeesAction(),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
