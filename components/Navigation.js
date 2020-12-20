import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { isActivePath } from '../utils/index';

const Navigation = () => {
  const pathname = useRouter().pathname;

  const value = useColorModeValue('white', '#101012');

  const activePathColor = useColorModeValue('#dadfe2', '#151c29');

  const isActive = isActivePath.bind(this, pathname, activePathColor);

  const { colorMode } = useColorMode();

  return (
    <Box
      bg={value}
      py="4px"
      boxShadow={colorMode === 'light' && 'rgba(0, 0, 0, 0.06) 0px 1px 0px'}
    >
      <Flex justifyContent="center">
        <Link href="/">
          <a>
            <Box
              borderRadius="md"
              px={4}
              px="8"
              py="2"
              background={isActive('/')}
              mx="2px"
              fontWeight={600}
            >
              Home
            </Box>
          </a>
        </Link>
        {/* <Link href="/about">
          <a>
            <Box
              fontWeight={600}
              borderRadius="md"
              px={4}
              mx="2px"
              px="8"
              py="2"
              background={isActive('/about')}
            >
              About
            </Box>
          </a>
        </Link> */}

        {/* <Link href="/writing">
          <a>
            <Box
              borderRadius="md"
              fontWeight={600}
              px={4}
              mx="2px"
              px="8"
              py="2"
              background={isActive('/writing')}
            >
              Writing
            </Box>
          </a>
        </Link> */}

        <Link href="/bookmarks">
          <a>
            <Box
              borderRadius="md"
              mx="2px"
              px={4}
              px="8"
              py="2"
              fontWeight={600}
              background={isActive('/bookmarks')}
            >
              Bookmarks
            </Box>
          </a>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navigation;
