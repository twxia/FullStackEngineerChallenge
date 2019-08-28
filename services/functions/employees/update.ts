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
      ...(data.review && { ':review': data.review }),
      ':updatedAt': timestamp,
      ':empty_list': [],
    },
    UpdateExpression: `SET ${data.name ? '#n = :name, ' : ''}${
      data.review
        ? 'review = list_append(if_not_exists(review, :empty_list), :review), '
        : ''
    }updatedAt = :updatedAt`,
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
      };
      resolve(response);
    });
  });

  return result;
};
