import Link from 'next/link';
import { Text, Flex } from '@chakra-ui/react';

const PostTimeLine = ({ postUrl, title, description }) => {
  return (
    <Link href={postUrl}>
      <a>
        <Flex
          flexDirection="column"
          mt="8px"
          bg="#19191c"
          p="14px"
          px="16px"
          borderRadius="md"
        >
          <Text fontWeight={600} fontSize="lg">
            {title}
          </Text>
          <Text fontWeight={500} mt="4px" fontSize="md" color="#a1a1aa">
            {description}
          </Text>
        </Flex>
      </a>
    </Link>
  );
};

export default PostTimeLine;
