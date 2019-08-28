import { Context, ProxyResult } from 'aws-lambda';
import uuid from 'uuid';
import dynamodb from '../../utils/dynamodb';
import generateHeader from '../../utils/generateHeader';

const create = async (event: any, context: Context): Promise<ProxyResult> => {
  const timestamp = new Date().getTime();
  let data;

  if (event.body) {
    try {
      data = JSON.parse(event.body);
    } catch (e) {
      console.error('Parse Failed');
    }
  }

  if (!data || typeof data.name !== 'string') {
    console.error('Validation Failed');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Couldn't create the user." }),
      ...generateHeader(),
    };
  }

  const params = {
    TableName: 'employee',
    Item: {
      id: uuid.v1(),
      name: data.name,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  const result: ProxyResult = await new Promise((resolve): void => {
    dynamodb.put(params, (error: any): void => {
      if (error) {
        console.error(error);
        return resolve({
          statusCode: error.statusCode || 501,
          body: JSON.stringify({ message: "Couldn't create the todo item." }),
          ...generateHeader(),
        });
      }

      resolve({
        statusCode: 200,
        body: JSON.stringify({
          result: params.Item,
        }),
        ...generateHeader(),
      });
    });
  });

  return result;
};

module.exports.create = create;
