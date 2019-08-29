import { Context, ProxyResult } from 'aws-lambda';
import dynamodb from '../../utils/dynamodb';
import generateHeader from '../../utils/generateHeader';

module.exports.list = async (
  event: any,
  context: Context
): Promise<ProxyResult> => {
  const params = {
    TableName: 'review',
  };

  const result: ProxyResult = await new Promise((resolve): void => {
    dynamodb.scan(params, (error: any, result: any): void => {
      if (error) {
        console.error(error);
        return resolve({
          statusCode: error.statusCode || 501,
          body: JSON.stringify({
            message: "Couldn't fetch the review item.",
          }),
          ...generateHeader(),
        });
      }

      resolve({
        statusCode: 200,
        body: JSON.stringify({
          result: result.Items,
        }),
        ...generateHeader(),
      });
    });
  });
  return result;
};
