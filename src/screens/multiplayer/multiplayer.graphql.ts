import gql from 'graphql-tag';
import { GameStatus } from '@api';

export const getUser = gql`
  query GetUser($username: String!, $limit: Int!, $nextToken: String, $sortDirection: ModelSortDirection) {
    getUser(username: $username) {
      id
      games(limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
        items {
          game {
            id
            owner
            users
            status
            turn
            winner
            players {
              items {
                user {
                  name
                  username
                }
              }
            }
          }
        }
        nextToken
      }
    }
  }
`;

export const onUpdateGameById = gql`
  subscription onUpdateGameById($id: ID!) {
    onUpdateGameById(id: $id) {
      id
      status
      state
      turn
      winner
    }
  }
`;

export type GetUserQuery = {
  getUser?: {
    __typename: 'User';
    id: string;
    games?: ModelMultiplayerGameConnection;
  };
};

export type ModelMultiplayerGameConnection = {
  __typename: 'ModelMultiplayerGameConnection';
  items: MultiplayerGameType[];
  nextToken?: string | null;
} | null;

export type MultiplayerGameType = {
  __typename: 'MultiplayerGame';
  game: GameType;
} | null;

export type GameType = {
  __typename: 'Game';
  id: string;
  owner: string;
  users: Array<string>;
  status: GameStatus;
  turn: string;
  winner?: string | null;
  players?: {
    __typename: 'ModelMultiplayerGameConnection';
    items: Array<{
      __typename: 'MultiplayerGame';
      user: {
        __typename: 'User';
        name: string;
        username: string;
      };
      game: GameType;
    } | null>;
  } | null;
};
