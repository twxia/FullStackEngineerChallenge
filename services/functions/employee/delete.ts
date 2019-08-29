import { ProxyResult } from 'aws-lambda';
import dynamodb from '../../utils/dynamodb';
import generateHeader from '../../utils/generateHeader';

module.exports.delete = async (event: any): Promise<ProxyResult> => {
  const timestamp = new Date().getTime();

  const updateParams = {
    TableName: 'employee',
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':updatedAt': timestamp,
      ':removeAt': timestamp,
    },
    UpdateExpression: `SET updatedAt = :updatedAt, removedAt = :removeAt`,
    ReturnValues: 'ALL_NEW',
  };

  const result: ProxyResult = await new Promise((resolve): void => {
    dynamodb.update(updateParams, (error: any, result): void => {
      if (error) {
        console.error(error);
        return resolve({
          statusCode: error.statusCode || 501,
          body: JSON.stringify({ message: "Couldn't remove the employee." }),
          ...generateHeader(),
        });
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify({ result: result.Attributes }),
        ...generateHeader(),
      };
      resolve(response);
    });
  });

  return result;
};
