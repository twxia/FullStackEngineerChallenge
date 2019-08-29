import { ProxyResult } from 'aws-lambda';
import dynamodb from '../../utils/dynamodb';
import generateHeader from '../../utils/generateHeader';

module.exports.delete = async (event: any): Promise<ProxyResult> => {
  const params = {
    TableName: 'employee',
    Key: {
      id: event.pathParameters.id,
    },
  };

  const result: ProxyResult = await new Promise((resolve): void => {
    dynamodb.delete(params, (error: any): void => {
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
        body: JSON.stringify({ result: 'success' }),
        ...generateHeader(),
      };
      resolve(response);
    });
  });

  return result;
};
