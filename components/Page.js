import { Fade, Box } from '@chakra-ui/react';
import { useWindowSize } from '../lib/window';
import MobileNavigation from './MobileNavigation';

import Navigation from './Navigation';

const Page = ({ children }) => {
  const { width } = useWindowSize();
  if(width === undefined) return null;
  return (
    <>
      {width < 768 ? <MobileNavigation /> : <Navigation />}
      <Box maxWidth="640px" margin="0 auto" pb="3rem" px="1.2rem">
        <Fade in>{children}</Fade>
      </Box>
    </>
  );
};

export default Page;
