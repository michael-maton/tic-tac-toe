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
const isTerminal = require('./isTerminal');

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

const fetchGame = gql`
  query getGame($id: ID!) {
    getGame(id: $id) {
      id
      status
      state
      turn
      winner
      users
      owner
    }
  }
`;

const updateGame = gql`
  mutation updateGame(
    $id: ID!
    $status: GameStatus!
    $state: [GameSymbol]!
    $turn: String!
    $winner: String
    $user: String!
  ) {
    updateGame(
      input: { id: $id, status: $status, state: $state, turn: $turn, winner: $winner }
      condition: { turn: { eq: $user } }
    ) {
      id
      turn
      state
      status
      winner
    }
  }
`;

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

  const user = event.identity.username;
  const gameID = event.arguments.game;
  const cell = event.arguments.index;

  // 1. Get game object from the id and make sure it exists
  const fetchGameResponse = await graphqlClient.query({
    query: fetchGame,
    variables: {
      id: gameID
    }
  });

  const game = fetchGameResponse.data.getGame;

  if (!game) {
    console.log('Game not found.');
    throw new Error('Game not found.');
  }

  // 2. Make sure the game is active
  if (game.status !== 'REQUESTED' && game.status !== 'ACTIVE') {
    console.log('Game is not active.');
    throw new Error('Game is not active.');
  }

  // 3. Check that the currect user is a participant in the game and that it's his turn
  if (!game.users.includes(user)) {
    console.log('Logged in user is not a participant in this game.');
    throw new Error('Logged in user is not a participant in this game.');
  }

  if (game.turn !== user) {
    console.log("It's not your turn.");
    throw new Error("It's not your turn.");
  }

  // 4. Make sure the cell is valid (not > 8 and not already occupied)
  if (game.state[cell]) {
    console.log('Cell is already occupied.');
    throw new Error('Cell is already occupied.');
  } else if (cell > 8) {
    console.log('Invalid index.');
    throw new Error('Invalid index.');
  }

  // 5. Update the state, check if the move is a terminal move, & update winner, status, turn, state
  const symbol = user === game.owner ? 'x' : 'o';
  const nextPlayer = game.users.find(u => u !== game.turn);
  const invitee = game.users.find(u => u !== game.owner);
  const updatedState = [...game.state];

  updatedState[cell] = symbol;
  let updatedStatus = 'ACTIVE';
  let winner = null;

  const terminalState = isTerminal(updatedState);
  if (terminalState) {
    updatedStatus = 'FINISHED';
    if (terminalState.winner === 'x') {
      winner = game.owner;
    }
    if (terminalState.winner === 'o') {
      winner = invitee;
    }
  }

  const updateGameResponse = await graphqlClient.mutate({
    mutation: updateGame,
    variables: {
      id: gameID,
      status: updatedStatus,
      state: updatedStatus,
      turn: nextPlayer,
      winner: winner,
      user: user
    }
  });

  // 6. Return updated game
  return updateGameResponse.data.updateGame;
};
