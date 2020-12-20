import { TabPanel, Center, Text, AttachmentIcon } from '@chakra-ui/react';

import TabItem from './TabItem';

const TabList = ({ bookmarks }) => {
  return (
    <TabPanel paddingTop="2.5rem">
      {bookmarks && bookmarks.length > 0 ? (
        bookmarks.map(({ id, url, description, likes, title, type }, index) => {
          const props = {
            url,
            description,
            likes,
            title,
            type,
            isLastElement: isLastElement(bookmarks, index),
            icon: <AttachmentIcon />,
          };
          return <TabItem {...props} key={id} />;
        })
      ) : (
        <Center>
          <Text>No links found </Text>
        </Center>
      )}
    </TabPanel>
  );
};

export default TabList;
