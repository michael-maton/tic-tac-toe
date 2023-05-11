import gql from 'graphql-tag';

export const getGame = gql`
  query getGame($id: ID!) {
    getGame(id: $id) {
      id
      status
      users
      owner
      turn
      state
      winner
      players {
        items {
          user {
            username
            name
          }
        }
      }
    }
  }
`;

export const startGame = gql`
  mutation startGame($invitee: String!) {
    startGame(invitee: $invitee) {
      id
    }
  }
`;

export const makeMove = gql`
  mutation makeMove($game: ID!, $index: Int!) {
    makeMove(game: $game, index: $index) {
      id
      status
      state
      turn
      winner
    }
  }
`;
