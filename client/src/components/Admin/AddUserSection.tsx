import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from '../../actions';
import { addEmployee as addEmployeesAction } from '../../actions/employee';

type Action = ActionType<typeof actions>;

export interface AddUserSectionProps {
  addEmployee: Function;
}

export function AddUserSection({ addEmployee }: AddUserSectionProps) {
  const [name, setName] = useState<string>('');

  const handleButtonClicked = () => {
    addEmployee(name);
    setName('');
  };

  return (
    <div>
      Name: <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleButtonClicked}>Add</button>
    </div>
  );
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      addEmployee: (name: string) => addEmployeesAction({ name }),
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(AddUserSection);
