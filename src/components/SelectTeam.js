import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
  Flex,
  Container,
  StackDivider,
  InputGroup,
  Button,
  Input,
  InputLeftAddon,
  Alert,
  AlertIcon,
  Center,
  Stack,
  Divider,
  CheckboxGroup,
  Checkbox,
  useCheckboxGroup,
} from '@chakra-ui/react';

const SelectTeam = ({ teams, setTeam, tVal, tname }) => {
  //   console.log(tVal);
  return (
    <Box
      display="flex"
      flexDirection="column"
      width={{
        md: '50%',
        sm: '100%',
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Heading my={4} textAlign="center">
        {tname}
      </Heading>
      <CheckboxGroup
        defaultValue={tVal}
        colorScheme="green"
        onChange={val => {
          setTeam(val);
        }}
      >
        <VStack>
          <Stack direction="row" p={4} spacing={4}>
            <Box display="flex" flexDirection="column">
              {teams[0].players.map(player => (
                <Checkbox key={player.id} value={String(player.id)}>
                  {player.shortName}
                </Checkbox>
              ))}
            </Box>
            <Box display="flex" flexDirection="column">
              {teams[1].players.map(player => (
                <Checkbox key={player.id} value={String(player.id)}>
                  {player.shortName}
                </Checkbox>
              ))}
            </Box>
          </Stack>
        </VStack>
      </CheckboxGroup>
    </Box>
  );
};

export default SelectTeam;
