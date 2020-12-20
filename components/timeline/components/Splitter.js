import { Flex, Box, Circle } from '@chakra-ui/react';
import { getTimelineIcon } from '../../../utils';

const Splitter = ({ isLastElement, type }) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Circle
        size="40px"
        bg={type === 'post' ? '#112c18' : '#3c3c40'}
        color="white"
      >
        {getTimelineIcon(type)}
      </Circle>
      {isLastElement && (
        <Box
          height="100%"
          width="1px"
          marginTop="8px"
          bg="#3c3c40"
          mt="4px"
          minHeight="80%"
        />
      )}
    </Flex>
  );
};

export default Splitter;
