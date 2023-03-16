/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

const env = process.env.ENV
const AppSyncId = process.env.API_MYSTARPRIME_GRAPHQLAPIIDOUTPUT

const TableName = `User-${AppSyncId}-${env}`

const userExists = async id => {
  const params = {
    TableName,
    Key: id,
  }

  try {
    const response = await docClient.get(params).promise()
    if (!!response?.Item)
      return true
  }
  catch (err) {
    return false
  }
}

const saveUser = async user => {
  const date = new Date;

  //2023-03-11T10:09:12.749Z
  const dateStr = date.toISOString()

  //1678529352777
  const timeStamp = date.getTime()

  const Item = {
    ...user,
    _typename: 'User',
    _lastChangedAt: timeStamp,
    createdAt: dateStr,
    _version: 1,
    updatedAt: dateStr,

  }
  const params = {
    TableName,
    Item,
  }

  try {
    await docClient.put(params).promise()
  }
  catch (err) {
    console.log(err);
  }
}


exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger

  console.log('This MystarprimePostConfirmation Lambda function was called.')
  console.log('------------------------------------------------------------')
  console.log(event);

  if (!event?.request?.userAttributes) {
    console.log('No cognito user data available');
    return
  }

  const { userName } = event
  const { sub, name, email } = event.request.userAttributes

  const newUser = { id: sub, username: userName, name, email, nofPosts: 0, nofFollowers: 0, nofFollowings: 0 }

  //Check if user is already exists in Dynamo database
  //If not save cognito user to database
  if (!(await userExists(newUser.id))) {
    await saveUser(newUser)
    console.log(`User with id: ${newUser.id} has been saved to database`);
  } else {
    console.log(`User with id: ${newUser.id} already exists`);
  }

  return event;
};
