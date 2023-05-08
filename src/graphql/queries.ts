/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      cognitoID
      username
      name
      email
      games {
        items {
          id
          gameID
          userUsername
          createdAt
          users
          game {
            id
            status
            users
            owner
            turn
            state
            winner
            createdAt
            updatedAt
          }
          user {
            id
            cognitoID
            username
            name
            email
            createdAt
            updatedAt
          }
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $username: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        cognitoID
        username
        name
        email
        games {
          items {
            id
            gameID
            userUsername
            createdAt
            users
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMultiplayerGame = /* GraphQL */ `
  query GetMultiplayerGame($id: ID!) {
    getMultiplayerGame(id: $id) {
      id
      gameID
      userUsername
      createdAt
      users
      game {
        id
        status
        users
        owner
        turn
        state
        winner
        players {
          items {
            id
            gameID
            userUsername
            createdAt
            users
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        cognitoID
        username
        name
        email
        games {
          items {
            id
            gameID
            userUsername
            createdAt
            users
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listMultiplayerGames = /* GraphQL */ `
  query ListMultiplayerGames($filter: ModelMultiplayerGameFilterInput, $limit: Int, $nextToken: String) {
    listMultiplayerGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gameID
        userUsername
        createdAt
        users
        game {
          id
          status
          users
          owner
          turn
          state
          winner
          players {
            nextToken
          }
          createdAt
          updatedAt
        }
        user {
          id
          cognitoID
          username
          name
          email
          games {
            nextToken
          }
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const multiplayerGamesByGameID = /* GraphQL */ `
  query MultiplayerGamesByGameID(
    $gameID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMultiplayerGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    multiplayerGamesByGameID(
      gameID: $gameID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameID
        userUsername
        createdAt
        users
        game {
          id
          status
          users
          owner
          turn
          state
          winner
          players {
            nextToken
          }
          createdAt
          updatedAt
        }
        user {
          id
          cognitoID
          username
          name
          email
          games {
            nextToken
          }
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const multiplayerGamesByUserUsernameAndCreatedAt = /* GraphQL */ `
  query MultiplayerGamesByUserUsernameAndCreatedAt(
    $userUsername: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMultiplayerGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    multiplayerGamesByUserUsernameAndCreatedAt(
      userUsername: $userUsername
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameID
        userUsername
        createdAt
        users
        game {
          id
          status
          users
          owner
          turn
          state
          winner
          players {
            nextToken
          }
          createdAt
          updatedAt
        }
        user {
          id
          cognitoID
          username
          name
          email
          games {
            nextToken
          }
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
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
          id
          gameID
          userUsername
          createdAt
          users
          game {
            id
            status
            users
            owner
            turn
            state
            winner
            createdAt
            updatedAt
          }
          user {
            id
            cognitoID
            username
            name
            email
            createdAt
            updatedAt
          }
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames($filter: ModelGameFilterInput, $limit: Int, $nextToken: String) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        users
        owner
        turn
        state
        winner
        players {
          items {
            id
            gameID
            userUsername
            createdAt
            users
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
