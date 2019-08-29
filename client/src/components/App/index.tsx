import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import { Route, Switch, Link } from 'react-router-dom';

const Main = lazy(() => import(/* webpackChunkName: "Main" */ './Main'));

const Admin = lazy(() => import(/* webpackChunkName: "Admin" */ './Admin'));

const Employee = lazy(() =>
  import(/* webpackChunkName: "Employee" */ '../Employee')
);

const Title = styled.h1`
  text-align: center;
`;

export function App(props: any) {
  return (
    <Box width={['auto', 600]} mx={[18, 'auto']}>
      <Title>
        <Link to={'/'}>Review System</Link>
      </Title>

      <Suspense
        fallback={<div data-testid={'loading-display'}>Loading...</div>}
      >
        <Switch>
          <Route path={'/'} exact component={Main} />
          <Route path={'/admin*'} exact component={Admin} />
          <Route path={'/employee/:id'} exact component={Employee} />
          <Route exact component={Main} />
        </Switch>
      </Suspense>
    </Box>
  );
}

export default App;
