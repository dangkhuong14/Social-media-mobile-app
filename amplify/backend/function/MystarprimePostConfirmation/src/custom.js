/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger

  console.log('This MystarprimePostConfirmation Lambda function was called.')
  console.log('------------------------------------------------------------')
  console.log(event);

  return event;
};
