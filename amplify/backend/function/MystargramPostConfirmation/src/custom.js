/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger\
  console.log('Yo this lamda function is working!');
  console.log(event);

  return event;
};
