import React from 'react';
import Link from '../Link';

export function Admin() {
  return (
    <div data-testid={'main-component'}>
      <div>
        <Link to={'/admin/employees'}>Employees</Link>
      </div>
      <div>
        <Link to={'/admin/reviews'}>Performance Reviews</Link>
      </div>
    </div>
  );
}

export default Admin;
