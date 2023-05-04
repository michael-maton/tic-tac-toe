/* Amplify Params - DO NOT EDIT
	API_TICTACTOE_GRAPHQLAPIENDPOINTOUTPUT
	API_TICTACTOE_GRAPHQLAPIIDOUTPUT
	API_TICTACTOE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const appsync = require('aws-appsync');
const gql = require('graphql-tag');
require('cross-fetch/polyfill');

const credentials = process.env.AWS_EXECUTION_ENV.endsWith('mock')
  ? {
      accessKeyId: 'ASIAVJKIAM-AuthRole', // for testing mock server locally
      secretAccessKey: 'fake'
    }
  : {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN
    };

exports.handler = async event => {
  const graphqlClient = new appsync.AWSAppSyncClient({
    url: process.env.API_TICTACTOE_GRAPHQLAPIENDPOINTOUTPUT,
    region: process.env.REGION,
    auth: {
      type: 'AWS_IAM',
      credentials
    },
    disableOffline: true
  });

  const challenger = event.identity.username;
  const invitee = event.arguments.invitee;

  const query = gql`
    query getUser($username: String!) {
      getUser(username: $username) {
        id
      }
    }
  `;

  const challengerResponse = await graphqlClient.query({
    query,
    variables: {
      username: challenger
    }
  });

  const inviteeResponse = await graphqlClient.query({
    query,
    variables: {
      username: invitee
    }
  });

  if (!challengerResponse.data.getUser || !inviteeResponse.data.getUser) {
    console.log('Account does not exist.');
    throw new Error('Account does not exist.');
  }

  if (challengerResponse.data.getUser.id === inviteeResponse.data.getUser.id) {
    console.log('You cannot invite yourself.');
    throw new Error('You cannot invite yourself.');
  }

  return {
    id: '12323',
    status: 'REQUESTED',
    turn: 'test',
    state: ['x', 'o', null],
    winner: 'test'
  };
};
