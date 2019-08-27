import fetch from 'isomorphic-fetch';
import { stringify } from 'query-string';
import isLocalhost from '../../helpers/isLocalhost';
export const rootEndpoint = isLocalhost()
  ? 'http://localhost:8080'
  : 'https://gjup67gzfl.execute-api.us-east-1.amazonaws.com/dev';

export const post = ({
  endpoint,
  body,
  request,
}: {
  endpoint: string;
  body: Object;
  request?: Object;
}) =>
  fetch(`${rootEndpoint}${endpoint}?${stringify(request || '')}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(response => response.json());

export const get = ({
  endpoint,
  request,
  isCustomized,
}: {
  endpoint: string;
  request?: Object;
  isCustomized?: boolean;
}) =>
  fetch(`${rootEndpoint}${endpoint}?${stringify(request || '')}`).then(
    response => (isCustomized ? response : response.json())
  );
