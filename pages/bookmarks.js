import { Heading } from '@chakra-ui/react';

import Page from '../components/Page';
import Tabs from '../components/CustomTab/Tabs';

const Bookmarks = () => {
  return (
    <Page>
      <Heading as="h1" textAlign="center" mt="4rem" size="xl" fontWeight="800">
        Bookmarks
      </Heading>
      <Heading as="h3" textAlign="center" size="md" mt="12px">
        Internet things, saved for later
      </Heading>
      <Tabs />
    </Page>
  );
};

export default Bookmarks;
