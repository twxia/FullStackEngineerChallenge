import { ProxyResult } from 'aws-lambda';
import dynamodb from '../../utils/dynamodb';
import generateHeader from '../../utils/generateHeader';

module.exports.update = async (event: any): Promise<ProxyResult> => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'employee',
    Key: {
      id: event.pathParameters.id,
    },
    ...(data.name && {
      ExpressionAttributeNames: {
        '#n': 'name',
      },
    }),
    ExpressionAttributeValues: {
      ...(data.name && { ':name': data.name }),
      ...(data.review && {
        ':review': dynamodb.createSet([data.review]),
      }),
      ':updatedAt': timestamp,
    },
    UpdateExpression: `SET ${
      data.name ? '#n = :name, ' : ''
    }updatedAt = :updatedAt${data.review ? ' ADD review :review' : ''}`,
    ReturnValues: 'ALL_NEW',
  };

  const result: ProxyResult = await new Promise((resolve): void => {
    dynamodb.update(params, (error: any, result): void => {
      if (error) {
        console.error(error);
        return resolve({
          statusCode: error.statusCode || 501,
          body: JSON.stringify({ message: "Couldn't update the employee." }),
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
