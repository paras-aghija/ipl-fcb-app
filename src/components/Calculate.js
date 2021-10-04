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
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';

import axios from 'axios';
import calc from './calc';
import { useState, useEffect } from 'react';
import SelectTeam from './SelectTeam';

const Calculate = ({ errorAlert, scoreUrl }) => {
  const [prun, setPrun] = useState(0);
  const [pwicket, setPwicket] = useState(0);
  const [maxp, setMaxp] = useState(0);
  const [data, setData] = useState(null);
  const [st1, setSt1] = useState(null);
  const [st2, setSt2] = useState(null);
  const [t1, setT1] = useState([]);
  const [t2, setT2] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(scoreUrl)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
        errorAlert('Some Error Occured Calculation is Not Possible');
      });
  }, []);

  // console.log(t1);
  // console.log(t2);

  // console.log(data);

  const calculate = () => {
    setSt1(calc(t1, data.innings, prun, pwicket));
    setSt2(calc(t2, data.innings, prun, pwicket));
    onOpen();
  };

  if (data === null) {
    return (
      <Box
        flexGrow="1"
        flexShrink="1"
        flexBasis="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Center my={6} flexDirection="column">
        <Heading size="lg" my={3}>
          Set Game Rules
        </Heading>
        <Stack direction={['column', 'column', 'row']} p={4} spacing={4}>
          <InputGroup>
            <InputLeftAddon children=" Max players: " />
            <Input
              type="tel"
              placeholder="Less than 11"
              onChange={e => {
                if (isNaN(Number(e.target.value))) {
                  errorAlert('Please Enter a valid number');
                  return;
                }
                if (Number(e.target.value) > 11) {
                  errorAlert('Max players cannot be greater than 11');
                  return;
                } else {
                  setMaxp(Number(e.target.value));
                }
              }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Per Run: " />
            <Input
              type="tel"
              placeholder="Points"
              onChange={e => setPrun(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Per Wicket: " />
            <Input
              type="tel"
              placeholder="Points"
              onChange={e => setPwicket(e.target.value)}
            />
          </InputGroup>
        </Stack>
      </Center>
      <Divider />
      <Box>
        <Stack direction={['column', 'column', 'row']} p={4} spacing={4}>
          <SelectTeam
            teams={data.matchInfo.teams}
            setTeam={setT1}
            tVal={t1}
            tname="Team1"
          />
          <SelectTeam
            teams={data.matchInfo.teams}
            setTeam={setT2}
            tVal={t2}
            tname="Team2"
          />
        </Stack>
        <Center width="100%" my={4}>
          <Button width={200} colorScheme="teal" onClick={calculate}>
            Submit
          </Button>
        </Center>
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent padding={4}>
          <ModalHeader>Match Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={5}>
            <Center height="50px">
              <Text width="50%" textAlign="center">
                Team1: {st1}
              </Text>
              <Divider orientation="vertical" />
              <Text width="50%" textAlign="center">
                Team2: {st2}
              </Text>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Calculate;
