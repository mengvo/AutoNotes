import { Flex } from '@chakra-ui/react';
import Header from './components/Header';
import InputSection from './components/InputSection';

function App() {

  return (
    <Flex gap={5} direction="column" justify="flex-start" height="100vh">
      <Header />
      <InputSection />
    </Flex>
  );
}

export default App;
