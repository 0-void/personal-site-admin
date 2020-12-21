import React from 'react';
import { useMutation } from '@apollo/client';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Link,
  Circle,
  Flex,
  Box,
  Text,
  useColorModeValue,
  IconButton,
  useToast,
} from '@chakra-ui/react';

import { LIKE_THE_BOOKMARK, REMOVE_BOOKMARK } from '../../../graphql/mutations';

import { getIcon, getIconColor } from '../../../utils/index';
import DeleteBookMarkModal from '../../DeleteBookmarkModal';
import { GET_ALL_BOOKMARKS } from '../../../graphql/queries';

const TabItem = ({
  id,
  url,
  title,
  likes,
  description,
  type,
  isLastElement,
}) => {
  const [likeTheBookmark] = useMutation(LIKE_THE_BOOKMARK);

  const toast = useToast();

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const [removeABookmark] = useMutation(REMOVE_BOOKMARK, {
    onCompleted() {
      onClose();
      toast({
        title: 'Bookmark deleted!',
        description: 'Bookmark delete successfully form the list',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError() {
      onClose();
      toast({
        title: 'Falied to delete bookmark!',
        description: 'Something went wrong, when deleting the bookmark',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const updateCache = (client) => {
    const { bookmarks } = client.readQuery({
      query: GET_ALL_BOOKMARKS,
    });
    client.evict({
      fieldName: 'bookmarks',
      broadcast: false,
    });

    const newData = {
      bookmarks: bookmarks.filter((t) => t.id !== id),
    };

    client.writeQuery({
      query: GET_ALL_BOOKMARKS,
      data: newData,
    });
  };

  const cancelRef = React.useRef();

  const dividerColor = useColorModeValue('#adafb5', '#191f33');

  const onDeleteHandler = () => {
    removeABookmark({
      variables: { id, likesId: likes.id },
      update: updateCache,
    });
  };

  return (
    <Flex marginBottom="8px">
      <DeleteBookMarkModal
        title={title}
        description="Are you sure? You can't undo this action afterwards."
        onDelete={onDeleteHandler}
        onClose={onClose}
        isOpen={isOpen}
        cancelRef={cancelRef}
      />
      <Flex flexDirection="column" alignItems="center">
        <Circle size="46px" bg={getIconColor(type)} color="white">
          {getIcon(type)}
        </Circle>
        {isLastElement && (
          <Box height="48px" width="2px" marginTop="8px" bg={dividerColor} />
        )}
      </Flex>
      <Flex flexDirection="column" marginLeft="24px">
        <Link
          href={url}
          isExternal
          fontWeight={600}
          color="#6697ff"
          fontSize="lg"
        >
          {title}
        </Link>
        <Flex flexDirection="column">
          <Flex alignItems="center">
            <button
              onClick={() => {
                likeTheBookmark({ variables: { id: likes.id } });
              }}
            >
              <Flex fontSize="sm" alignItems="center" color="#858b98">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="10"
                  height="10"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="#f04444"
                    d="M7.655 14.9159C7.65523 14.9161 7.65543 14.9162 8 14.25C8.34457 14.9162 8.34477 14.9161 8.34501 14.9159C8.12889 15.0277 7.87111 15.0277 7.655 14.9159ZM7.655 14.9159L8 14.25L8.34501 14.9159L8.34731 14.9147L8.35269 14.9119L8.37117 14.9022C8.38687 14.8939 8.40926 14.882 8.4379 14.8665C8.49516 14.8356 8.57746 14.7904 8.6812 14.7317C8.8886 14.6142 9.18229 14.442 9.53358 14.2199C10.2346 13.7767 11.1728 13.13 12.1147 12.3181C13.9554 10.7312 16 8.35031 16 5.5C16 2.83579 13.9142 1 11.75 1C10.2026 1 8.84711 1.80151 8 3.01995C7.15289 1.80151 5.79736 1 4.25 1C2.08579 1 0 2.83579 0 5.5C0 8.35031 2.04459 10.7312 3.8853 12.3181C4.82717 13.13 5.76538 13.7767 6.46642 14.2199C6.81771 14.442 7.1114 14.6142 7.3188 14.7317C7.42254 14.7904 7.50484 14.8356 7.5621 14.8665C7.59074 14.882 7.61313 14.8939 7.62883 14.9022L7.64731 14.9119L7.65269 14.9147L7.655 14.9159Z"
                  ></path>
                </svg>
                <Text marginLeft="6px">{likes.likes}</Text>
              </Flex>
            </button>
            <Flex fontSize="sm" color="#858b98" alignItems="center">
              <Text mx="8px">/</Text> {type}
            </Flex>
          </Flex>
          <Text fontWeight={500} mt="4px">
            {description}
          </Text>
        </Flex>
        <Flex mt="8px">
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton ml="8px" onClick={() => setIsOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default TabItem;
