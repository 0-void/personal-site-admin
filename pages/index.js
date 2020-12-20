// import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { Box, Flex, Text, Center, Heading } from '@chakra-ui/react';
import Link from 'next/link';

import { initializeApollo, addApolloState } from '../lib/apolloClient';
import Page from '../components/Page';
import Timeline from '../components/timeline';
import { GET_ALL_TIMELINE_ENTRIES } from '../graphql/queries';

const Home = () => (
  <Page>
    <Flex flexDirection="column">
      <Timeline />
    </Flex>
  </Page>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_TIMELINE_ENTRIES,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}
export default Home;
