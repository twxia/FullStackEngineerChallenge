import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { ActionType } from 'typesafe-actions';
import { RootState } from '../../reducers';
import { Employee } from '../../reducers/employee';
import * as actions from '../../actions';
import { getEmployees as getEmployeesAction } from '../../actions/employee';

type Action = ActionType<typeof actions>;

export interface AdminProps {
  getEmployees: Function;
  employees: Array<Employee>;
}

const SectionTitle = styled.h2``;

const Item = styled(Flex)`
  border: 1px solid ${props => props.theme.blue};
  box-shadow: 0 2px 4px 0 rgba(123, 123, 123, 0.3);
  border-radius: 4px;
`;

export function Admin({ getEmployees, employees }: AdminProps) {
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div data-testid={'main-component'}>
      <SectionTitle>Admin Page</SectionTitle>

      <div>
        {employees.map(data => (
          <Item my={3} key={data.id} flexWrap={'wrap'}>
            <Box p={3} width={1}>
              id: {data.id}
            </Box>
            <Box p={3} width={1}>
              name: {data.name}
            </Box>
            <Box p={3} width={1 / 2}>
              created at: {new Date(data.createdAt).toLocaleString()}
            </Box>
            <Box p={3} width={1 / 2}>
              updated at: {new Date(data.updatedAt).toLocaleString()}
            </Box>
          </Item>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  employees: state.employee.list,
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
)(Admin);
