import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { ActionType } from 'typesafe-actions';
import AddSection from './AddSection';
import { RootState } from '../../reducers';
import { Employee } from '../../reducers/employee';
import * as actions from '../../actions';
import {
  getEmployees as getEmployeesAction,
  removeEmployee as removeEmployeeAction,
  updateEmployee as updateEmployeeAction,
} from '../../actions/employee';

type Action = ActionType<typeof actions>;

export interface AdminProps {
  isProcessing: boolean;
  getEmployees: Function;
  removeEmployee: Function;
  updateEmployee: Function;
  employees: Array<Employee>;
}

const SectionTitle = styled.h2``;

const Item = styled(Flex)`
  border: 1px solid ${props => props.theme.blue};
  box-shadow: 0 2px 4px 0 rgba(123, 123, 123, 0.3);
  border-radius: 4px;
`;

const Control = styled(Box)`
  text-align: right;

  span:hover {
    cursor: pointer;
  }
`;

export function Admin({
  isProcessing,
  getEmployees,
  removeEmployee,
  updateEmployee,
  employees,
}: AdminProps) {
  const [editingId, setEditingId] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    getEmployees();
  }, []);

  const handleClickEditText = (id: string, defaultName: string = '') => {
    setEditingId(id);
    setName(defaultName);
  };

  const handleClickUpdateButton = (id: string) => {
    updateEmployee(id, name);
    setEditingId('');
  };

  return (
    <div data-testid={'main-component'}>
      <SectionTitle>Admin Page</SectionTitle>
      <AddSection />
      <div>
        {employees.map(data => (
          <Item my={3} key={data.id} flexWrap={'wrap'}>
            <Box p={3} width={3 / 5}>
              id: {data.id}
            </Box>
            <Control p={3} width={2 / 5}>
              <span onClick={() => handleClickEditText(data.id, data.name)}>
                edit
              </span>
              {' / '}
              <span onClick={() => removeEmployee(data.id)}>remove</span>
            </Control>
            <Box p={3} width={1}>
              name:
              {editingId === data.id ? (
                <>
                  <input value={name} onChange={e => setName(e.target.value)} />
                  <button onClick={() => handleClickUpdateButton(data.id)}>
                    update
                  </button>
                </>
              ) : (
                data.name
              )}
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
  isProcessing: state.employee.isProcessing,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      getEmployees: () => getEmployeesAction(),
      removeEmployee: id => removeEmployeeAction({ id }),
      updateEmployee: (id, name) => updateEmployeeAction({ id, name }),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
