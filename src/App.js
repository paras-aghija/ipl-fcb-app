import React, { useState } from 'react';
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
  InputRightElement,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Calculate from './components/Calculate';
import axios from 'axios';

function App() {
  const [scoreUrl, setScoreUrl] = useState(null);
  const [url, setUrl] = useState('');
  const [urlErr, setUrlErr] = useState('');

  const errorAlert = msg => {
    setUrlErr(msg);
    setTimeout(() => {
      setUrlErr('');
    }, 3000);
  };

  const urlSubmit = async () => {
    if (url === '') {
      errorAlert('PLease Enter the API URL');
      return;
    }
    try {
      await axios.get(url);
      setScoreUrl(url + 'scoring');
    } catch (error) {
      console.log(error);
      errorAlert('Some Error Occured');
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection="column" height="100vh">
        <Navbar />
        {urlErr !== '' && (
          <Alert status="error">
            <AlertIcon />
            {urlErr}
          </Alert>
        )}

        {scoreUrl === null ? (
          <Box
            flexGrow="1"
            flexShrink="1"
            flexBasis="auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              minWidth="60vw"
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Input
                placeholder="Enter the scoring api url"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
              <Button colorScheme="teal" ml={4} onClick={urlSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        ) : (
          <Calculate errorAlert={errorAlert} scoreUrl={scoreUrl} />
        )}
      </Flex>
    </ChakraProvider>
  );
}

export default App;
