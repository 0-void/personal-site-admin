import { Box, Text } from '@chakra-ui/react';

const Year2020 = ({ year, month }) => (
  <Box
    alignItems="center"
    justifyContent="space-between"
    display="flex"
    marginLeft="64px"
    mb="30px"
    mt="20px"
  >
    <Text fontWeight="700" fontSize="xl">
      {`${month}, ${year}`}
    </Text>
    <Box flex="1" marginLeft="16px" height="1px" bg="#3c3c40" />
  </Box>
);

export default Year2020;
