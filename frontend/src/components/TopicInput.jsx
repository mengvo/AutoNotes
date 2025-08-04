import { Box, Textarea, Heading, Flex, Button } from '@chakra-ui/react';
import { HiOutlineX } from 'react-icons/hi';
import { useState } from 'react';

function TopicInput({ setShowTopicInput, setTopic }) {
    const [input, setInput] = useState('');

    const handleClose = () => { setShowTopicInput(false); };

    const handleSubmit = () => {
        setTopic(input);
        setShowTopicInput(false);
    };

    return (
        <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            background="gray.700"
            padding="5"
            borderRadius="md"
            boxShadow="sm"
            height="50vh"
            width="45vw"
            zIndex="1000">
            <Flex width="100%" justify="space-between" align="center">
                <Heading size="3xl" paddingBottom="3" color="white">Enter your topic here</Heading>
                <Button 
                    size="2xl" 
                    variant="plain" 
                    background="gray.700"
                    paddingBottom="7"
                    onClick={handleClose}>
                    <HiOutlineX color="white"/>
                </Button>
            </Flex>
            <Textarea 
                resize="none" 
                placeholder="Enter topic..." 
                height="60%"
                onChange={(e) => setInput(e.target.value)}/>
            <Flex width="100%" justifyContent="center" paddingTop="3">
                <Button 
                    rounded="full" 
                    color="white" 
                    background="gray.800" 
                    maxWidth="75vw" 
                    width="17vw" 
                    height="7vh"
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </Flex>
        </Box>
    );
}

export default TopicInput;