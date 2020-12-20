import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  useSystemColorMode: true,
};

const customTheme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('#f7fafc', '#08090d')(props),
      },
    }),
  },
});

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ChakraProvider theme={customTheme}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
