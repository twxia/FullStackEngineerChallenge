import React from 'react';
import Link from '../../components/Link';

export function Main() {
  return (
    <div data-testid={'main-component'}>
      <Link to={'/admin'}>Admin Portal</Link>
    </div>
  );
}

export default Main;
