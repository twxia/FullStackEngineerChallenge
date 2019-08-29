import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { ActionType } from 'typesafe-actions';
import { RootState } from '../../reducers';
import { Employee } from '../../reducers/employee';
import * as actions from '../../actions';
import { reviewColleague as reviewColleagueAction } from '../../actions/employee';

type Action = ActionType<typeof actions>;

export interface ReviewFormProps {
  reviewColleague: Function;
  data: Employee;
  reviewer: string;
}

const Item = styled(Flex)`
  border: 1px solid ${props => props.theme.blue};
  box-shadow: 0 2px 4px 0 rgba(123, 123, 123, 0.3);
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
`;

export function ReviewForm({
  reviewer,
  data,
  reviewColleague,
}: ReviewFormProps) {
  const [content, setContent] = useState('');
  return (
    <Item my={3} key={data.id} flexWrap={'wrap'}>
      <Box fontSize={1} p={3} width={3 / 5}>
        id: {data.id}
      </Box>
      <Box p={3} width={1}>
        name: {data.name}
      </Box>
      <Box width={1} p={3}>
        <Textarea value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={() => reviewColleague(reviewer, data.id, content)}>
          Submit
        </button>
      </Box>
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
      reviewColleague: (id, targetId, content) =>
        reviewColleagueAction({ id, targetId, content }),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewForm);
