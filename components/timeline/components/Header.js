import { Text } from '@chakra-ui/react';
const Header = ({ title, date }) => (
  <>
    <Text fontWeight={600} fontSize="lg">
      {title}
    </Text>
    <Text fontWeight={600} fontSize="sm" color="#999">
      {new Date(date).toDateString()}
    </Text>
  </>
);

export default Header;
