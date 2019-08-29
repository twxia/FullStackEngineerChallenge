import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import { Route, Switch, Link } from 'react-router-dom';

const Admin = lazy(() => import(/* webpackChunkName: "Admin" */ '../Admin'));

const Users = lazy(() =>
  import(/* webpackChunkName: "Users" */ '../Admin/Users')
);

const Reviews = lazy(() =>
  import(/* webpackChunkName: "Users" */ '../Admin/Reviews')
);

const Title = styled.h3``;

export function App() {
  return (
    <Box width={['auto', 600]} mx={[18, 'auto']}>
      <Title>
        <Link to={'/admin'}>Admin Portal</Link>
      </Title>

      <Suspense
        fallback={<div data-testid={'loading-display'}>Loading...</div>}
      >
        <Switch>
          <Route path={'/admin/employees'} exact component={Users} />
          <Route path={'/admin/reviews'} exact component={Reviews} />
          <Route exact component={Admin} />
        </Switch>
      </Suspense>
    </Box>
  );
}

export default App;
