import { Context, ProxyResult } from 'aws-lambda';
import dynamodb from '../../utils/dynamodb';

module.exports.list = async (
  event: any,
  context: Context
): Promise<ProxyResult> => {
  const params = {
    TableName: 'employee',
  };

  const result: ProxyResult = await new Promise((resolve): void => {
    dynamodb.scan(params, (error: any, result: any): void => {
      if (error) {
        console.error(error);
        return resolve({
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: "Couldn't fetch the todo item." }),
        });
      }

      resolve({
        statusCode: 200,
        body: JSON.stringify(result.Items),
      });
    });
  });
  return result;
};
