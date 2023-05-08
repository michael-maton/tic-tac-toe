/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateGameById = /* GraphQL */ `
  subscription OnUpdateGameById($id: ID!) {
    onUpdateGameById(id: $id) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateMultiplayerGame = /* GraphQL */ `
  subscription OnCreateMultiplayerGame($filter: ModelSubscriptionMultiplayerGameFilterInput) {
    onCreateMultiplayerGame(filter: $filter) {
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
export const onUpdateMultiplayerGame = /* GraphQL */ `
  subscription OnUpdateMultiplayerGame($filter: ModelSubscriptionMultiplayerGameFilterInput) {
    onUpdateMultiplayerGame(filter: $filter) {
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
export const onDeleteMultiplayerGame = /* GraphQL */ `
  subscription OnDeleteMultiplayerGame($filter: ModelSubscriptionMultiplayerGameFilterInput) {
    onDeleteMultiplayerGame(filter: $filter) {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
    onCreateGame(filter: $filter) {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
    onUpdateGame(filter: $filter) {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
    onDeleteGame(filter: $filter) {
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
