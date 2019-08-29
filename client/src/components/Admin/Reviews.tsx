import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import styled from 'styled-components';
import { ActionType } from 'typesafe-actions';
import { Flex, Box } from '@rebass/grid';
import { RootState } from '../../reducers';
import { Review } from '../../reducers/review';
import * as actions from '../../actions';
import { getEmployees as getEmployeesAction } from '../../actions/employee';
import { getReviews as getReviewsAction } from '../../actions/review';
import { ListOfEmployee } from '../../reducers/employee';

const Item = styled(Box)`
  border: 1px solid ${props => props.theme.blue};
  box-shadow: 0 2px 4px 0 rgba(123, 123, 123, 0.3);
  border-radius: 4px;
`;

type Action = ActionType<typeof actions>;

export interface ReviewsProps {
  getEmployees: Function;
  getReviews: Function;
  employees: ListOfEmployee;
  reviews: Array<Review>;
}

const SectionTitle = styled.h2``;

export function Reviews({
  getEmployees,
  getReviews,
  reviews,
  employees,
}: ReviewsProps) {
  useEffect(() => {
    getReviews();
    getEmployees();
  }, []);
  console.log(reviews);
  return (
    <div data-testid={'main-component'}>
      <SectionTitle>Reviews</SectionTitle>
      {reviews.map(review => (
        <Item p={3} m={3} key={review.id}>
          <Flex my={2} alignItems={'center'}>
            <div>Employee:</div>
            {employees[review.employeeId] && employees[review.employeeId].name}
            <Box fontSize={1}>
              (id:
              {employees[review.employeeId] && employees[review.employeeId].id})
            </Box>
          </Flex>
          <Flex my={2} alignItems={'center'}>
            <div>Reviewer:</div>
            {employees[review.employeeId] && employees[review.reviewerId].name}
            <Box fontSize={1}>
              (id:
              {employees[review.employeeId] && employees[review.employeeId].id})
            </Box>
          </Flex>
          <Box>
            <div>Content:</div> {review.content}
          </Box>
        </Item>
      ))}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  reviews: state.review.list,
  employees: state.employee.list,
  isProcessing: state.employee.isProcessing,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      getEmployees: () => getEmployeesAction(),
      getReviews: () => getReviewsAction(),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
