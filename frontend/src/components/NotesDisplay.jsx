import { Box, Flex, Button, Text, Heading, Clipboard } from '@chakra-ui/react';
import { HiOutlineX } from 'react-icons/hi';

function NotesDisplay({ notes, setNotes }) {

    const handleClose = () => { setNotes(''); };

    return(
        <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            background="gray.700"
            padding="5"
            borderRadius="md"
            boxShadow="sm"
            height="70vh"
            width="55vw"
            zIndex="1000">
            <Heading size="3xl" paddingBottom="3" color="white">Generated Notes:</Heading>
            <Text background="gray.600" padding={2} height="53vh">
                {notes}
            </Text>
            <Flex width="100%" justify="space-between" align="center" paddingTop={2}>
                <Clipboard.Root value={notes}>
                    <Clipboard.Trigger asChild>
                        <Button 
                            rounded="full" 
                            color="white" 
                            background="gray.800" 
                            maxWidth="15vw" 
                            width="8vw" 
                            height="5vh">
                            <Clipboard.Indicator color="white"/>
                            Copy
                        </Button>
                    </Clipboard.Trigger>
                </Clipboard.Root>
                <Button 
                    rounded="full" 
                    color="white" 
                    background="gray.800" 
                    maxWidth="15vw" 
                    width="8vw" 
                    height="5vh"
                    onClick={handleClose}>
                    <HiOutlineX color="white"/>
                    Close
                </Button>
            </Flex>
        </Box>
    );
}

export default NotesDisplay;