import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { ActionType } from 'typesafe-actions';
import Link from '../Link';
import { RootState } from '../../reducers';
import { ListOfEmployee, Employee } from '../../reducers/employee';
import * as actions from '../../actions';
import {
  removeEmployee as removeEmployeeAction,
  updateEmployee as updateEmployeeAction,
  setEmployeeAsReviewer as setEmployeeAsReviewerAction,
} from '../../actions/employee';

type Action = ActionType<typeof actions>;

export interface UsersProps {
  isProcessing: boolean;
  removeEmployee: Function;
  updateEmployee: Function;
  setEmployeeAsReviewer: Function;
  data: Employee;
  employees: ListOfEmployee;
}

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

export function UserSection({
  isProcessing,
  data,
  removeEmployee,
  updateEmployee,
  setEmployeeAsReviewer,
  employees,
}: UsersProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [targetId, setTargetId] = useState<string>('');

  const list = useMemo(() => {
    const tmp = { ...employees };
    if (data.review) {
      data.review.forEach(id => delete tmp[id]);
    }
    delete tmp[data.id];
    return Object.values(tmp).filter(employee => !employee.removedAt);
  }, [employees]);

  useEffect(() => {
    setTargetId(list[0] && list[0].id);
  }, [employees]);

  const handleClickEditText = (id: string, defaultName: string = '') => {
    setIsEditing(true);
    setName(defaultName);
  };

  const handleClickUpdateButton = (id: string) => {
    updateEmployee(id, name);
    setIsEditing(false);
  };

  return (
    <Item my={3} key={data.id} flexWrap={'wrap'}>
      <Box fontSize={1} p={3} width={3 / 5}>
        id: {data.id}
      </Box>
      <Control p={3} width={2 / 5}>
        <Link to={`/employee/${data.id}`}>Pretend</Link>
        {' / '}
        <span onClick={() => handleClickEditText(data.id, data.name)}>
          edit
        </span>
        {' / '}
        <span onClick={() => removeEmployee(data.id)}>remove</span>
      </Control>
      <Box p={3} width={1}>
        name:
        {isEditing ? (
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
      <Item flexDirection={'column'} width={1} m={3} p={3}>
        {!!list.length && (
          <div>
            Review Whom:
            <select onChange={e => setTargetId(e.target.value)}>
              {list.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <button onClick={() => setEmployeeAsReviewer(data.id, targetId)}>
              Add
            </button>
          </div>
        )}
        <div>
          Review List:
          <div>
            {data.review &&
              data.review
                .filter(id => !!employees[id])
                .map(id => (
                  <Flex alignItems={'center'} key={id}>
                    {employees[id].name} <Box fontSize={1}>({id})</Box>
                  </Flex>
                ))}
          </div>
        </div>
      </Item>
    </Item>
  );
}

const mapStateToProps = (state: RootState) => ({
  employees: state.employee.list,
  isProcessing: state.employee.isProcessing,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      removeEmployee: id => removeEmployeeAction({ id }),
      updateEmployee: (id, name) => updateEmployeeAction({ id, name }),
      setEmployeeAsReviewer: (id, targetId) =>
        setEmployeeAsReviewerAction({ id, targetId }),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSection);
