import gql from 'graphql-tag';

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
