import { Center, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import TabItem from './TabItem';

const isLastElement = (array, index) => array.length - 1 !== index;

const BookmarkTablePanel = ({ icon, query }) => {
  const { loading, data } = useQuery(query);

  return (
    <>
      {loading ? (
        <Center marginTop="1.5rem">
          <Spinner />
        </Center>
      ) : data && data.bookmarks.length > 0 ? (
        data.bookmarks.map(
          ({ id, url, description, likes, title, type }, index) => {
            const props = {
              url,
              description,
              likes,
              title,
              type,
              isLastElement: isLastElement(data.bookmarks, index),
              icon,
              id,
            };
            return <TabItem {...props} key={id} />;
          }
        )
      ) : (
        <Center>
          <Text>No links found </Text>
        </Center>
      )}
    </>
  );
};

export default BookmarkTablePanel;
