/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GameData = {
  __typename: 'GameData';
  id: string;
  status: GameStatus;
  turn: string;
  state: Array<GameSymbol | null>;
  winner?: string | null;
};

export enum GameStatus {
  REQUESTED = 'REQUESTED',
  DECLINED = 'DECLINED',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED'
}

export enum GameSymbol {
  x = 'x',
  o = 'o'
}

export type CreateUserInput = {
  id?: string | null;
  cognitoID: string;
  username: string;
  name: string;
  email: string;
};

export type ModelUserConditionInput = {
  cognitoID?: ModelStringInput | null;
  name?: ModelStringInput | null;
  email?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null'
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type User = {
  __typename: 'User';
  id: string;
  cognitoID: string;
  username: string;
  name: string;
  email: string;
  games?: ModelMultiplayerGameConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelMultiplayerGameConnection = {
  __typename: 'ModelMultiplayerGameConnection';
  items: Array<MultiplayerGame | null>;
  nextToken?: string | null;
};

export type MultiplayerGame = {
  __typename: 'MultiplayerGame';
  id: string;
  gameID: string;
  userUsername: string;
  createdAt: string;
  users: Array<string>;
  game: Game;
  user: User;
  updatedAt: string;
};

export type Game = {
  __typename: 'Game';
  id: string;
  status: GameStatus;
  users: Array<string>;
  owner: string;
  turn: string;
  state: Array<GameSymbol | null>;
  winner?: string | null;
  players?: ModelMultiplayerGameConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserInput = {
  id?: string | null;
  cognitoID?: string | null;
  username: string;
  name?: string | null;
  email?: string | null;
};

export type DeleteUserInput = {
  username: string;
};

export type CreateMultiplayerGameInput = {
  id?: string | null;
  gameID: string;
  userUsername: string;
  createdAt?: string | null;
  users: Array<string>;
};

export type ModelMultiplayerGameConditionInput = {
  gameID?: ModelIDInput | null;
  userUsername?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  users?: ModelStringInput | null;
  and?: Array<ModelMultiplayerGameConditionInput | null> | null;
  or?: Array<ModelMultiplayerGameConditionInput | null> | null;
  not?: ModelMultiplayerGameConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UpdateMultiplayerGameInput = {
  id: string;
  gameID?: string | null;
  userUsername?: string | null;
  createdAt?: string | null;
  users?: Array<string> | null;
};

export type DeleteMultiplayerGameInput = {
  id: string;
};

export type CreateGameInput = {
  id?: string | null;
  status: GameStatus;
  users: Array<string>;
  owner: string;
  turn: string;
  state: Array<GameSymbol | null>;
  winner?: string | null;
};

export type ModelGameConditionInput = {
  status?: ModelGameStatusInput | null;
  users?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  turn?: ModelStringInput | null;
  state?: ModelGameSymbolInput | null;
  winner?: ModelStringInput | null;
  and?: Array<ModelGameConditionInput | null> | null;
  or?: Array<ModelGameConditionInput | null> | null;
  not?: ModelGameConditionInput | null;
};

export type ModelGameStatusInput = {
  eq?: GameStatus | null;
  ne?: GameStatus | null;
};

export type ModelGameSymbolInput = {
  eq?: GameSymbol | null;
  ne?: GameSymbol | null;
};

export type UpdateGameInput = {
  id: string;
  status?: GameStatus | null;
  users?: Array<string> | null;
  owner?: string | null;
  turn?: string | null;
  state?: Array<GameSymbol | null> | null;
  winner?: string | null;
};

export type DeleteGameInput = {
  id: string;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  cognitoID?: ModelStringInput | null;
  username?: ModelStringInput | null;
  name?: ModelStringInput | null;
  email?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type ModelUserConnection = {
  __typename: 'ModelUserConnection';
  items: Array<User | null>;
  nextToken?: string | null;
};

export type ModelMultiplayerGameFilterInput = {
  id?: ModelIDInput | null;
  gameID?: ModelIDInput | null;
  userUsername?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  users?: ModelStringInput | null;
  and?: Array<ModelMultiplayerGameFilterInput | null> | null;
  or?: Array<ModelMultiplayerGameFilterInput | null> | null;
  not?: ModelMultiplayerGameFilterInput | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelGameFilterInput = {
  id?: ModelIDInput | null;
  status?: ModelGameStatusInput | null;
  users?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  turn?: ModelStringInput | null;
  state?: ModelGameSymbolInput | null;
  winner?: ModelStringInput | null;
  and?: Array<ModelGameFilterInput | null> | null;
  or?: Array<ModelGameFilterInput | null> | null;
  not?: ModelGameFilterInput | null;
};

export type ModelGameConnection = {
  __typename: 'ModelGameConnection';
  items: Array<Game | null>;
  nextToken?: string | null;
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  cognitoID?: ModelSubscriptionStringInput | null;
  name?: ModelSubscriptionStringInput | null;
  email?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionMultiplayerGameFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  gameID?: ModelSubscriptionIDInput | null;
  userUsername?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  users?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionMultiplayerGameFilterInput | null> | null;
  or?: Array<ModelSubscriptionMultiplayerGameFilterInput | null> | null;
};

export type ModelSubscriptionGameFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  status?: ModelSubscriptionStringInput | null;
  users?: ModelSubscriptionStringInput | null;
  owner?: ModelSubscriptionStringInput | null;
  turn?: ModelSubscriptionStringInput | null;
  state?: ModelSubscriptionStringInput | null;
  winner?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionGameFilterInput | null> | null;
  or?: Array<ModelSubscriptionGameFilterInput | null> | null;
};

export type StartGameMutationVariables = {
  invitee: string;
};

export type StartGameMutation = {
  startGame?: {
    __typename: 'GameData';
    id: string;
    status: GameStatus;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
  } | null;
};

export type MakeMoveMutationVariables = {
  game: string;
  index: number;
};

export type MakeMoveMutation = {
  makeMove?: {
    __typename: 'GameData';
    id: string;
    status: GameStatus;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
  } | null;
};

export type CreateUserMutationVariables = {
  input: CreateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type CreateUserMutation = {
  createUser?: {
    __typename: 'User';
    id: string;
    cognitoID: string;
    username: string;
    name: string;
    email: string;
    games?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type UpdateUserMutation = {
  updateUser?: {
    __typename: 'User';
    id: string;
    cognitoID: string;
    username: string;
    name: string;
    email: string;
    games?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput;
  condition?: ModelUserConditionInput | null;
};

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: 'User';
    id: string;
    cognitoID: string;
    username: string;
    name: string;
    email: string;
    games?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateMultiplayerGameMutationVariables = {
  input: CreateMultiplayerGameInput;
  condition?: ModelMultiplayerGameConditionInput | null;
};

export type CreateMultiplayerGameMutation = {
  createMultiplayerGame?: {
    __typename: 'MultiplayerGame';
    id: string;
    gameID: string;
    userUsername: string;
    createdAt: string;
    users: Array<string>;
    game: {
      __typename: 'Game';
      id: string;
      status: GameStatus;
      users: Array<string>;
      owner: string;
      turn: string;
      state: Array<GameSymbol | null>;
      winner?: string | null;
      players?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      __typename: 'User';
      id: string;
      cognitoID: string;
      username: string;
      name: string;
      email: string;
      games?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    updatedAt: string;
  } | null;
};

export type UpdateMultiplayerGameMutationVariables = {
  input: UpdateMultiplayerGameInput;
  condition?: ModelMultiplayerGameConditionInput | null;
};

export type UpdateMultiplayerGameMutation = {
  updateMultiplayerGame?: {
    __typename: 'MultiplayerGame';
    id: string;
    gameID: string;
    userUsername: string;
    createdAt: string;
    users: Array<string>;
    game: {
      __typename: 'Game';
      id: string;
      status: GameStatus;
      users: Array<string>;
      owner: string;
      turn: string;
      state: Array<GameSymbol | null>;
      winner?: string | null;
      players?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      __typename: 'User';
      id: string;
      cognitoID: string;
      username: string;
      name: string;
      email: string;
      games?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    updatedAt: string;
  } | null;
};

export type DeleteMultiplayerGameMutationVariables = {
  input: DeleteMultiplayerGameInput;
  condition?: ModelMultiplayerGameConditionInput | null;
};

export type DeleteMultiplayerGameMutation = {
  deleteMultiplayerGame?: {
    __typename: 'MultiplayerGame';
    id: string;
    gameID: string;
    userUsername: string;
    createdAt: string;
    users: Array<string>;
    game: {
      __typename: 'Game';
      id: string;
      status: GameStatus;
      users: Array<string>;
      owner: string;
      turn: string;
      state: Array<GameSymbol | null>;
      winner?: string | null;
      players?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      __typename: 'User';
      id: string;
      cognitoID: string;
      username: string;
      name: string;
      email: string;
      games?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    updatedAt: string;
  } | null;
};

export type CreateGameMutationVariables = {
  input: CreateGameInput;
  condition?: ModelGameConditionInput | null;
};

export type CreateGameMutation = {
  createGame?: {
    __typename: 'Game';
    id: string;
    status: GameStatus;
    users: Array<string>;
    owner: string;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
    players?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateGameMutationVariables = {
  input: UpdateGameInput;
  condition?: ModelGameConditionInput | null;
};

export type UpdateGameMutation = {
  updateGame?: {
    __typename: 'Game';
    id: string;
    status: GameStatus;
    users: Array<string>;
    owner: string;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
    players?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteGameMutationVariables = {
  input: DeleteGameInput;
  condition?: ModelGameConditionInput | null;
};

export type DeleteGameMutation = {
  deleteGame?: {
    __typename: 'Game';
    id: string;
    status: GameStatus;
    users: Array<string>;
    owner: string;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
    players?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type GetUserQueryVariables = {
  username: string;
};

export type GetUserQuery = {
  getUser?: {
    __typename: 'User';
    id: string;
    cognitoID: string;
    username: string;
    name: string;
    email: string;
    games?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListUsersQueryVariables = {
  username?: string | null;
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListUsersQuery = {
  listUsers?: {
    __typename: 'ModelUserConnection';
    items: Array<{
      __typename: 'User';
      id: string;
      cognitoID: string;
      username: string;
      name: string;
      email: string;
      games?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetMultiplayerGameQueryVariables = {
  id: string;
};

export type GetMultiplayerGameQuery = {
  getMultiplayerGame?: {
    __typename: 'MultiplayerGame';
    id: string;
    gameID: string;
    userUsername: string;
    createdAt: string;
    users: Array<string>;
    game: {
      __typename: 'Game';
      id: string;
      status: GameStatus;
      users: Array<string>;
      owner: string;
      turn: string;
      state: Array<GameSymbol | null>;
      winner?: string | null;
      players?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      __typename: 'User';
      id: string;
      cognitoID: string;
      username: string;
      name: string;
      email: string;
      games?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    updatedAt: string;
  } | null;
};

export type ListMultiplayerGamesQueryVariables = {
  filter?: ModelMultiplayerGameFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMultiplayerGamesQuery = {
  listMultiplayerGames?: {
    __typename: 'ModelMultiplayerGameConnection';
    items: Array<{
      __typename: 'MultiplayerGame';
      id: string;
      gameID: string;
      userUsername: string;
      createdAt: string;
      users: Array<string>;
      game: {
        __typename: 'Game';
        id: string;
        status: GameStatus;
        users: Array<string>;
        owner: string;
        turn: string;
        state: Array<GameSymbol | null>;
        winner?: string | null;
        players?: {
          __typename: 'ModelMultiplayerGameConnection';
          nextToken?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      };
      user: {
        __typename: 'User';
        id: string;
        cognitoID: string;
        username: string;
        name: string;
        email: string;
        games?: {
          __typename: 'ModelMultiplayerGameConnection';
          nextToken?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      };
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type MultiplayerGamesByGameIDQueryVariables = {
  gameID: string;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelMultiplayerGameFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type MultiplayerGamesByGameIDQuery = {
  multiplayerGamesByGameID?: {
    __typename: 'ModelMultiplayerGameConnection';
    items: Array<{
      __typename: 'MultiplayerGame';
      id: string;
      gameID: string;
      userUsername: string;
      createdAt: string;
      users: Array<string>;
      game: {
        __typename: 'Game';
        id: string;
        status: GameStatus;
        users: Array<string>;
        owner: string;
        turn: string;
        state: Array<GameSymbol | null>;
        winner?: string | null;
        players?: {
          __typename: 'ModelMultiplayerGameConnection';
          nextToken?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      };
      user: {
        __typename: 'User';
        id: string;
        cognitoID: string;
        username: string;
        name: string;
        email: string;
        games?: {
          __typename: 'ModelMultiplayerGameConnection';
          nextToken?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      };
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type MultiplayerGamesByUserUsernameAndCreatedAtQueryVariables = {
  userUsername: string;
  createdAt?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelMultiplayerGameFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type MultiplayerGamesByUserUsernameAndCreatedAtQuery = {
  multiplayerGamesByUserUsernameAndCreatedAt?: {
    __typename: 'ModelMultiplayerGameConnection';
    items: Array<{
      __typename: 'MultiplayerGame';
      id: string;
      gameID: string;
      userUsername: string;
      createdAt: string;
      users: Array<string>;
      game: {
        __typename: 'Game';
        id: string;
        status: GameStatus;
        users: Array<string>;
        owner: string;
        turn: string;
        state: Array<GameSymbol | null>;
        winner?: string | null;
        players?: {
          __typename: 'ModelMultiplayerGameConnection';
          nextToken?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      };
      user: {
        __typename: 'User';
        id: string;
        cognitoID: string;
        username: string;
        name: string;
        email: string;
        games?: {
          __typename: 'ModelMultiplayerGameConnection';
          nextToken?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      };
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetGameQueryVariables = {
  id: string;
};

export type GetGameQuery = {
  getGame?: {
    __typename: 'Game';
    id: string;
    status: GameStatus;
    users: Array<string>;
    owner: string;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
    players?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListGamesQueryVariables = {
  filter?: ModelGameFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListGamesQuery = {
  listGames?: {
    __typename: 'ModelGameConnection';
    items: Array<{
      __typename: 'Game';
      id: string;
      status: GameStatus;
      users: Array<string>;
      owner: string;
      turn: string;
      state: Array<GameSymbol | null>;
      winner?: string | null;
      players?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnUpdateGameByIdSubscriptionVariables = {
  id: string;
};

export type OnUpdateGameByIdSubscription = {
  onUpdateGameById?: {
    __typename: 'Game';
    id: string;
    status: GameStatus;
    users: Array<string>;
    owner: string;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
    players?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
};

export type OnCreateUserSubscription = {
  onCreateUser?: {
    __typename: 'User';
    id: string;
    cognitoID: string;
    username: string;
    name: string;
    email: string;
    games?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser?: {
    __typename: 'User';
    id: string;
    cognitoID: string;
    username: string;
    name: string;
    email: string;
    games?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser?: {
    __typename: 'User';
    id: string;
    cognitoID: string;
    username: string;
    name: string;
    email: string;
    games?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateMultiplayerGameSubscriptionVariables = {
  filter?: ModelSubscriptionMultiplayerGameFilterInput | null;
};

export type OnCreateMultiplayerGameSubscription = {
  onCreateMultiplayerGame?: {
    __typename: 'MultiplayerGame';
    id: string;
    gameID: string;
    userUsername: string;
    createdAt: string;
    users: Array<string>;
    game: {
      __typename: 'Game';
      id: string;
      status: GameStatus;
      users: Array<string>;
      owner: string;
      turn: string;
      state: Array<GameSymbol | null>;
      winner?: string | null;
      players?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      __typename: 'User';
      id: string;
      cognitoID: string;
      username: string;
      name: string;
      email: string;
      games?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    updatedAt: string;
  } | null;
};

export type OnUpdateMultiplayerGameSubscriptionVariables = {
  filter?: ModelSubscriptionMultiplayerGameFilterInput | null;
};

export type OnUpdateMultiplayerGameSubscription = {
  onUpdateMultiplayerGame?: {
    __typename: 'MultiplayerGame';
    id: string;
    gameID: string;
    userUsername: string;
    createdAt: string;
    users: Array<string>;
    game: {
      __typename: 'Game';
      id: string;
      status: GameStatus;
      users: Array<string>;
      owner: string;
      turn: string;
      state: Array<GameSymbol | null>;
      winner?: string | null;
      players?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      __typename: 'User';
      id: string;
      cognitoID: string;
      username: string;
      name: string;
      email: string;
      games?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    updatedAt: string;
  } | null;
};

export type OnDeleteMultiplayerGameSubscriptionVariables = {
  filter?: ModelSubscriptionMultiplayerGameFilterInput | null;
};

export type OnDeleteMultiplayerGameSubscription = {
  onDeleteMultiplayerGame?: {
    __typename: 'MultiplayerGame';
    id: string;
    gameID: string;
    userUsername: string;
    createdAt: string;
    users: Array<string>;
    game: {
      __typename: 'Game';
      id: string;
      status: GameStatus;
      users: Array<string>;
      owner: string;
      turn: string;
      state: Array<GameSymbol | null>;
      winner?: string | null;
      players?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      __typename: 'User';
      id: string;
      cognitoID: string;
      username: string;
      name: string;
      email: string;
      games?: {
        __typename: 'ModelMultiplayerGameConnection';
        items: Array<{
          __typename: 'MultiplayerGame';
          id: string;
          gameID: string;
          userUsername: string;
          createdAt: string;
          users: Array<string>;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    updatedAt: string;
  } | null;
};

export type OnCreateGameSubscriptionVariables = {
  filter?: ModelSubscriptionGameFilterInput | null;
};

export type OnCreateGameSubscription = {
  onCreateGame?: {
    __typename: 'Game';
    id: string;
    status: GameStatus;
    users: Array<string>;
    owner: string;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
    players?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateGameSubscriptionVariables = {
  filter?: ModelSubscriptionGameFilterInput | null;
};

export type OnUpdateGameSubscription = {
  onUpdateGame?: {
    __typename: 'Game';
    id: string;
    status: GameStatus;
    users: Array<string>;
    owner: string;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
    players?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteGameSubscriptionVariables = {
  filter?: ModelSubscriptionGameFilterInput | null;
};

export type OnDeleteGameSubscription = {
  onDeleteGame?: {
    __typename: 'Game';
    id: string;
    status: GameStatus;
    users: Array<string>;
    owner: string;
    turn: string;
    state: Array<GameSymbol | null>;
    winner?: string | null;
    players?: {
      __typename: 'ModelMultiplayerGameConnection';
      items: Array<{
        __typename: 'MultiplayerGame';
        id: string;
        gameID: string;
        userUsername: string;
        createdAt: string;
        users: Array<string>;
        game: {
          __typename: 'Game';
          id: string;
          status: GameStatus;
          users: Array<string>;
          owner: string;
          turn: string;
          state: Array<GameSymbol | null>;
          winner?: string | null;
          createdAt: string;
          updatedAt: string;
        };
        user: {
          __typename: 'User';
          id: string;
          cognitoID: string;
          username: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};
