import { gql } from '@apollo/client';

export const GET_ALL_BOOKMARKS = gql`
  query getAllBookmarks {
    bookmarks {
      description
      id
      likes {
        id
        likes
      }
      type
      url
      title
    }
  }
`;

export const GET_READING_BOOKMARKS = gql`
  query getReadingBookmarks {
    bookmarks(where: { type: { _eq: "reading" } }) {
      description
      id
      likes {
        likes
        id
      }
      type
      url
      title
    }
  }
`;

export const GET_PORTFOLIO_BOOKMARKS = gql`
  query getPortfolioBookmarks {
    bookmarks(where: { type: { _eq: "portfolio" } }) {
      description
      id
      likes {
        likes
        id
      }
      type
      url
      title
    }
  }
`;

export const GET_PERSONAL_SITE_BOOKMARKS = gql`
  query getPersonalSiteBookmarks {
    bookmarks(where: { type: { _eq: "Personal site" } }) {
      description
      id
      likes {
        likes
        id
      }
      type
      url
      title
    }
  }
`;

export const GET_ALL_TIMELINE_ENTRIES = gql`
  query MyQuery {
    timeline {
      date
      description
      id
      imageUrl
      last_modified
      type
      twitter
      title
      post {
        description
        id
        postUrl
        title
      }
    }
  }
`;
