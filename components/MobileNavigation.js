import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  useColorMode,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { getActualPath, isActivePath } from '../utils/index';

const MobileNavigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = useRouter().pathname;

  const value = useColorModeValue('white', '#101012');

  const activePathColor = useColorModeValue('#dadfe2', '#151c29');

  const isActive = isActivePath.bind(this, pathname, activePathColor);

  const currentPath = getActualPath(pathname);

  return (
    <Box bg={value} py="4px">
      {!isModalOpen ? (
        <Flex alignItems="center">
          <IconButton
            aria-label="open modal"
            icon={<HamburgerIcon />}
            bg="none"
            onClick={() => setIsModalOpen(true)}
            mx="4px"
          />
          <Text fontWeight={600}>{currentPath}</Text>
        </Flex>
      ) : (
        <Flex justifyContent="center" flexDirection="column">
          <IconButton
            aria-label="modal close"
            icon={<CloseIcon />}
            bg="none"
            alignSelf="flex-start"
            ml="8px"
            mb="6px"
            onClick={() => setIsModalOpen(false)}
          />
          <Link href="/">
            <a>
              <Box
                borderRadius="md"
                px="4"
                py="2"
                background={isActive('/')}
                mx="6px"
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
                mx="6px"
                px="4"
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
                mx="6px"
                px="4"
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
                mx="6px"
                px="4"
                py="2"
                fontWeight={600}
                background={isActive('/bookmarks')}
              >
                Bookmarks
              </Box>
            </a>
          </Link>
        </Flex>
      )}
    </Box>
  );
};

export default MobileNavigation;
