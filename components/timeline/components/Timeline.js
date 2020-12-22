import React from 'react';
import {
  useDisclosure,
  Flex,
  IconButton,
  Text,
  Box,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import Header from './Header';
import Splitter from './Splitter';
import { isLastElement, isPost } from '../../../utils';
import PostTimeLine from './PostTimeline';
import DeleteTimelineItem from '../../CustomPopUpModal';
import { useMutation } from '@apollo/client';
import { REMOVE_TIMELINE } from '../../../graphql/mutations';
import { GET_ALL_TIMELINE_ENTRIES } from '../../../graphql/queries';

const TimeLineEntry = ({
  id,
  monthData,
  index,
  type,
  title,
  date,
  post,
  rest,
  toast
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isModalOpen, setIsOpen] = React.useState(false);

  const cancelRef = React.useRef();

  const onModalClose = () => setIsOpen(false);

  const [removeTimeline] = useMutation(REMOVE_TIMELINE, {
    onCompleted() {
      onModalClose();
      toast({
        title: 'Timeline deleted!',
        description: 'Timeline delete successfully form the list',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError() {
      onModalClose();
      toast({
        title: 'Falied to delete timeline!',
        description: 'Something went wrong, when deleting the timeline',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const updateCache = (client) => {
    try {
      const { timeline } = client.readQuery({
        query: GET_ALL_TIMELINE_ENTRIES,
      });
      client.evict({
        fieldName: 'timeline',
        broadcast: false,
      });

      const newData = {
        timeline: timeline.filter((t) => t.id !== id),
      };

      client.writeQuery({
        query: GET_ALL_TIMELINE_ENTRIES,
        data: newData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteHandler = () => {
    removeTimeline({
      variables: { id, postId: post.id },
      update: updateCache,
    });
  };

  const renderBody = (type, post, { description, imageUrl }) => {
    if (isPost(type)) {
      const { postUrl, title, description } = post;
      const props = { postUrl, title, description };
      return <PostTimeLine {...props} />;
    }

    return (
      <Flex flexDirection="column" mt="8px">
        {description && (
          <Text fontWeight={500} mt="4px" fontSize="md">
            {description}
          </Text>
        )}
        {imageUrl && (
          <Box rounded="lg" maxWidth="100%" maxHeight="100%">
            <img src={imageUrl} />
          </Box>
        )}
      </Flex>
    );
  };
  return (
    <Flex key={id} pb="36px">
      <DeleteTimelineItem
        title={'this Timeline'}
        description="Are you sure? You can't undo this action afterwards."
        onDelete={onDeleteHandler}
        onClose={onModalClose}
        isOpen={isModalOpen}
        cancelRef={cancelRef}
      />
      <Splitter isLastElement={isLastElement(monthData, index)} type={type} />
      <Flex flexDirection="column" marginLeft="24px">
        <Header title={title} date={date} />
        {renderBody(type, post, rest)}
        <Flex mt="8px">
          <IconButton>
            <EditIcon onClick={onOpen} />
          </IconButton>
          <IconButton ml="8px" onClick={() => setIsOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TimeLineEntry;
