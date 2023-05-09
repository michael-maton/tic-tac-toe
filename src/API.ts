/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type User = {
  __typename: "User",
  id: string,
  cognitoID: string,
  username: string,
  name: string,
  email: string,
  games?: ModelMultiplayerGameConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelMultiplayerGameConnection = {
  __typename: "ModelMultiplayerGameConnection",
  items:  Array<MultiplayerGame | null >,
  nextToken?: string | null,
};

export type MultiplayerGame = {
  __typename: "MultiplayerGame",
  id: string,
  gameID: string,
  userUsername: string,
  createdAt: string,
  users: Array< string >,
  game: Game,
  user: User,
  updatedAt: string,
};

export type Game = {
  __typename: "Game",
  id: string,
  status: GameStatus,
  users: Array< string >,
  owner: string,
  turn: string,
  state: Array< GameSymbol | null >,
  winner?: string | null,
  players?: ModelMultiplayerGameConnection | null,
  createdAt: string,
  updatedAt: string,
};

export enum GameStatus {
  REQUESTED = "REQUESTED",
  DECLINED = "DECLINED",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  CANCELED = "CANCELED",
}


export enum GameSymbol {
  x = "x",
  o = "o",
}


export type GetUserQueryVariables = {
  username: string,
  limit: number,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    games?:  {
      __typename: "ModelMultiplayerGameConnection",
      items:  Array< {
        __typename: "MultiplayerGame",
        game:  {
          __typename: "Game",
          id: string,
          owner: string,
          users: Array< string >,
          status: GameStatus,
          turn: string,
          winner?: string | null,
          players?:  {
            __typename: "ModelMultiplayerGameConnection",
            items:  Array< {
              __typename: "MultiplayerGame",
              user:  {
                __typename: "User",
                name: string,
                username: string,
              },
            } | null >,
          } | null,
        },
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type onUpdateGameByIdSubscriptionVariables = {
  id: string,
};

export type onUpdateGameByIdSubscription = {
  onUpdateGameById?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    state: Array< GameSymbol | null >,
    turn: string,
    winner?: string | null,
  } | null,
};
