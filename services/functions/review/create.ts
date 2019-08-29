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

  const params = {
    TableName: 'review',
    Item: {
      id: uuid.v1(),
      employeeId: data.targetId,
      reviewerId: data.id,
      content: data.content,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  const updateParams = {
    TableName: 'employee',
    Key: {
      id: data.id,
    },
    ExpressionAttributeValues: {
      ':updatedAt': timestamp,
      ':target_ids': dynamodb.createSet([data.targetId]),
    },
    UpdateExpression: `DELETE review :target_ids SET updatedAt = :updatedAt`,
    ReturnValues: 'ALL_NEW',
  };

  const updateReview = (): Promise<any> =>
    new Promise((resolve): void => {
      dynamodb.update(updateParams, (error: any, result): void => {
        if (error) {
          console.error(error);
        }

        resolve(result.Attributes);
      });
    });

  const result: ProxyResult = await new Promise((resolve): void => {
    dynamodb.put(
      params,
      async (error: any): Promise<void> => {
        if (error) {
          console.error(error);
          return resolve({
            statusCode: error.statusCode || 501,
            body: JSON.stringify({ message: "Couldn't create the employee." }),
            ...generateHeader(),
          });
        }

        const updateResult = await updateReview();

        resolve({
          statusCode: 200,
          body: JSON.stringify({
            result: updateResult,
          }),
          ...generateHeader(),
        });
      }
    );
  });

  return result;
};

module.exports.create = create;
