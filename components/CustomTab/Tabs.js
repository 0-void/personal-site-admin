import {
  Center,
  Tabs,
  useDisclosure,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Button,
} from '@chakra-ui/react';
import {
  AttachmentIcon,
  EditIcon,
  StarIcon,
  LinkIcon,
  AddIcon,
} from '@chakra-ui/icons';

import {
  GET_ALL_BOOKMARKS,
  GET_PERSONAL_SITE_BOOKMARKS,
  GET_READING_BOOKMARKS,
  GET_PORTFOLIO_BOOKMARKS,
} from '../../graphql/queries';
import { ADD_NEW_BOOKMARK } from '../../graphql/mutations';

import BookmarkTablePanel from './components/BookmarkTablePanel';
import AddBookMarkModal from '../AddBookmarkModal';
import { useMutation } from '@apollo/client';

const CustomTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addNewBookmark, { loading }] = useMutation(ADD_NEW_BOOKMARK, {
    onCompleted() {
      onClose();
      toast({
        title: 'Bookmark added!',
        description: 'New Bookmark is successfully added to the list',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError() {
      onClose();
      toast({
        title: 'Falied to add new Bookmark!',
        description: 'Something went wrong, when adding new bookmark',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const toast = useToast();

  const updateCache = (client, { data: { insert_bookmarks } }) => {
    try {
      const data = client.readQuery({
        query: GET_ALL_BOOKMARKS,
      });
      const newBookmark = insert_bookmarks.returning[0];
      const newData = {
        bookmarks: [...data.bookmarks, newBookmark],
      };
      client.writeQuery({
        query: GET_ALL_BOOKMARKS,
        data: newData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onAddHandler = ({ payload: { title, description, url, type } }) => {
    addNewBookmark({
      variables: { title, description, url, type },
      update: updateCache,
    });
  };

  return (
    <Tabs isFitted maxWidth="95%" mx="auto" mt="38px" isLazy>
      <AddBookMarkModal
        onOpen={onOpen}
        isOpen={isOpen}
        isLoading={loading}
        onClose={onClose}
        onAdd={onAddHandler}
      />
      <TabList>
        <Tab fontWeight="600">
          <AttachmentIcon mr="6px" />
          All
        </Tab>
        <Tab fontWeight="600">
          <EditIcon mr="6px" />
          Reading
        </Tab>
        <Tab fontWeight="600">
          <StarIcon mr="6px" />
          Portfolio
        </Tab>
        <Tab fontWeight="600">
          <LinkIcon mr="6px" />
          Site
        </Tab>
      </TabList>

      <TabPanels pt="1.8rem" px="10px">
        <TabPanel p={0}>
          <Center>
            <Button mb="18px" onClick={onOpen}>
              <AddIcon />
            </Button>
          </Center>
          <BookmarkTablePanel
            query={GET_ALL_BOOKMARKS}
            icon={<AttachmentIcon />}
          />
        </TabPanel>

        <TabPanel p={0}>
          <BookmarkTablePanel
            query={GET_READING_BOOKMARKS}
            icon={<StarIcon />}
          />
        </TabPanel>

        <TabPanel p={0}>
          <BookmarkTablePanel
            query={GET_PORTFOLIO_BOOKMARKS}
            icon={<LinkIcon />}
          />
        </TabPanel>

        <TabPanel p={0}>
          <BookmarkTablePanel
            query={GET_PERSONAL_SITE_BOOKMARKS}
            icon={<EditIcon />}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CustomTab;
