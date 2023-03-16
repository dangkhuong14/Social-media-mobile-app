import {gql} from '@apollo/client';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      name
      email
      website
      nofFollowings
      nofFollowers
      nofPosts
      bio
      image
      Posts {
        items {
          id
          image
          images
          video
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
