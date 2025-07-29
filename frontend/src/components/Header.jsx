import { Flex, Heading, Highlight } from '@chakra-ui/react';

const query = ['Notes', 'AI'];

function Header() {
    return (
        <Flex 
            gap={7} 
            direction="column" 
            align="center" 
            justify="flex-start" 
            width="100vw"
            paddingTop="3%"
            px={4}>            
            <Heading size="5xl" letterSpacing="tight">
                <Highlight query={query} styles={{color: "#3B82F6"}}>
                    Effortless Study Notes — Powered by AI
                </Highlight>
            </Heading>
            <Heading size="md" fontWeight="normal">
                Turn <b>any topic or document</b> into clear, <b>structured notes</b> in seconds. Just <b>upload a file or enter your topic</b>, and let AI do the heavy lifting.
            </Heading>
        </Flex>
    );
}

export default Header;