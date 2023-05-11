/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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

export type GameData = {
  __typename: "GameData",
  id: string,
  status: GameStatus,
  turn: string,
  state: Array< GameSymbol | null >,
  winner?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type SearchableUserConnection = {
  __typename: "SearchableUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type getGameQueryVariables = {
  id: string,
};

export type getGameQuery = {
  getGame?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    users: Array< string >,
    owner: string,
    turn: string,
    state: Array< GameSymbol | null >,
    winner?: string | null,
    players?:  {
      __typename: "ModelMultiplayerGameConnection",
      items:  Array< {
        __typename: "MultiplayerGame",
        user:  {
          __typename: "User",
          username: string,
          name: string,
        },
      } | null >,
    } | null,
  } | null,
};

export type startGameMutationVariables = {
  invitee: string,
};

export type startGameMutation = {
  startGame?:  {
    __typename: "GameData",
    id: string,
  } | null,
};

export type makeMoveMutationVariables = {
  game: string,
  index: number,
};

export type makeMoveMutation = {
  makeMove?:  {
    __typename: "GameData",
    id: string,
    status: GameStatus,
    state: Array< GameSymbol | null >,
    turn: string,
    winner?: string | null,
  } | null,
};

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

export type searchUsersQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
  searchString?: string | null,
};

export type searchUsersQuery = {
  searchUsers?:  {
    __typename: "SearchableUserConnection",
    items:  Array< {
      __typename: "User",
      name: string,
      username: string,
    } | null >,
    nextToken?: string | null,
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
