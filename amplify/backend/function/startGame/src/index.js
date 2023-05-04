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

  // 1. Make sure challenger and invitee exist
  const userQuery = gql`
    query getUser($username: String!) {
      getUser(username: $username) {
        id
      }
    }
  `;

  const challengerResponse = await graphqlClient.query({
    query: userQuery,
    variables: {
      username: challenger
    }
  });

  const inviteeResponse = await graphqlClient.query({
    query: userQuery,
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

  // 2. Creating a new Game
  const gameMutation = gql`
    mutation createGame(
      $status: GameStatus!
      $users: [String!]!
      $owner: String!
      $turn: String!
      $state: [GameSymbol]!
    ) {
      createGame(input: { status: $status, users: $users, owner: $owner, turn: $turn, state: $state }) {
        id
        status
        state
        turn
        winner
      }
    }
  `;

  const gameResponse = await graphqlClient.mutate({
    mutation: gameMutation,
    variables: {
      status: 'REQUESTED',
      users: [challenger, invitee],
      owner: challenger,
      turn: Math.random() < 0.5 ? challenger : invitee,
      state: [null, null, null, null, null, null, null, null, null]
    }
  });

  // 3. Linking the Game with the Users (by creating a MultiplayerGame model)
  const multiplayerGameMutation = gql`
    mutation createMultiplayerGame($gameID: ID!, $userUsername: String!, $users: [String!]!) {
      createMultiplayerGame(input: { gameID: $gameID, userUsername: $userUsername, users: $users }) {
        id
      }
    }
  `;

  const challengerMultiplayerGameResponse = await graphqlClient.mutate({
    mutation: multiplayerGameMutation,
    variables: {
      gameID: gameResponse.data.createGame.id,
      userUsername: challenger,
      users: [challenger, invitee]
    }
  });

  const inviteeMultiplayerGameResponse = await graphqlClient.mutate({
    mutation: multiplayerGameMutation,
    variables: {
      gameID: gameResponse.data.createGame.id,
      userUsername: invitee,
      users: [challenger, invitee]
    }
  });

  return {
    id: gameResponse.data.createGame.id,
    status: gameResponse.data.createGame.status,
    state: gameResponse.data.createGame.state,
    turn: gameResponse.data.createGame.turn,
    winner: gameResponse.data.createGame.winner
  };
};
