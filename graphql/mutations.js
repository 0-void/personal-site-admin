import { gql } from '@apollo/client';

export const LIKE_THE_BOOKMARK = gql`
  mutation updateLikes($id: uuid) {
    update_likes(where: { id: { _eq: $id } }, _inc: { likes: 1 }) {
      returning {
        likes
        id
      }
    }
  }
`;

export const ADD_NEW_BOOKMARK = gql`
  mutation MyMutation(
    $description: String
    $title: String
    $url: String
    $type: String
  ) {
    insert_bookmarks(
      objects: {
        description: $description
        likes: { data: { likes: 0 } }
        title: $title
        url: $url
        type: $type
      }
    ) {
      returning {
        url
        type
        title
        likes {
          id
          likes
        }
        last_updated
        id
        description
      }
    }
  }
`;

export const REMOVE_BOOKMARK = gql`
  mutation MyMutation($id: uuid, $likesId: uuid) {
    delete_bookmarks(where: { id: { _eq: $id } }) {
      returning {
        id
        description
        last_updated
        title
        likes {
          likes
          id
        }
        url
        type
      }
      affected_rows
    }
    delete_likes(where: { id: { _eq: $likesId } }) {
      returning {
        id
        likes
      }
    }
  }
`;
