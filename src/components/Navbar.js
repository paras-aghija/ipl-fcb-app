import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Flex, Heading, Spacer } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex
      width="100%"
      flexDirection="row"
      padding={7}
      justifyContent="space-between"
      background="teal"
    >
      <Heading>IPL-FCB</Heading>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
};

export default Navbar;
