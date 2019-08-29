import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import styled from 'styled-components';
import { ActionType } from 'typesafe-actions';
import { RootState } from '../../reducers';
import ReviewForm from './ReviewForm';
import { ListOfEmployee, Employee } from '../../reducers/employee';
import * as actions from '../../actions';
import { getEmployees as getEmployeesAction } from '../../actions/employee';

type Action = ActionType<typeof actions>;

export interface UsersProps {
  isProcessing: boolean;
  employees: ListOfEmployee;
  getEmployees: Function;
  match: any;
}

const SectionTitle = styled.h3``;

export function EmployeePage({ getEmployees, employees, match }: UsersProps) {
  const currentEmployee = employees[match.params.id] || {};
  console.log(currentEmployee);

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div data-testid={'main-component'}>
      <SectionTitle>Pretending Employee ({match.params.id})</SectionTitle>

      <SectionTitle>Review Colleagues:</SectionTitle>

      <div>
        {currentEmployee.review
          ? currentEmployee.review.map(id => (
              <ReviewForm
                key={id}
                reviewer={currentEmployee.id}
                data={employees[id]}
              />
            ))
          : "You don't need to review any colleagues right now"}
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
)(EmployeePage);
