const site = process.env.IS_OFFLINE
  ? 'http://localhost:3000'
  : 'https://wonderful-fermat-d0fb83.netlify.com';

export default (): object => ({
  headers: {
    'Access-Control-Allow-Origin': site,
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
});
