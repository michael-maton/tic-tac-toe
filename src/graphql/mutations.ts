/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const startGame = /* GraphQL */ `
  mutation StartGame($invitee: String!) {
    startGame(invitee: $invitee) {
      id
      status
      turn
      state
      winner
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
    deleteUser(input: $input, condition: $condition) {
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
export const createMultiplayerGame = /* GraphQL */ `
  mutation CreateMultiplayerGame($input: CreateMultiplayerGameInput!, $condition: ModelMultiplayerGameConditionInput) {
    createMultiplayerGame(input: $input, condition: $condition) {
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
export const updateMultiplayerGame = /* GraphQL */ `
  mutation UpdateMultiplayerGame($input: UpdateMultiplayerGameInput!, $condition: ModelMultiplayerGameConditionInput) {
    updateMultiplayerGame(input: $input, condition: $condition) {
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
export const deleteMultiplayerGame = /* GraphQL */ `
  mutation DeleteMultiplayerGame($input: DeleteMultiplayerGameInput!, $condition: ModelMultiplayerGameConditionInput) {
    deleteMultiplayerGame(input: $input, condition: $condition) {
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
export const createGame = /* GraphQL */ `
  mutation CreateGame($input: CreateGameInput!, $condition: ModelGameConditionInput) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame($input: UpdateGameInput!, $condition: ModelGameConditionInput) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame($input: DeleteGameInput!, $condition: ModelGameConditionInput) {
    deleteGame(input: $input, condition: $condition) {
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
