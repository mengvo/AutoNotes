import { Flex, Text, Button, Icon } from '@chakra-ui/react';
import { HiOutlineDocumentText, HiOutlineDocument, HiTrash } from "react-icons/hi";

function InputListDisplay({ files, topic, handleDeleteFile, handleDeleteTopic }) {
    return (
        <Flex width="100%" gap="3" direction="column">
            {files.map((file) => (
                <Flex key={file.name} width="100%" justify="space-between">
                    <Flex gap="3">
                        <Icon as={HiOutlineDocument} boxSize={5} />
                        <Text>{file.name}</Text>
                    </Flex>
                    <Button 
                        size="sm" 
                        variant="plain" 
                        background="gray.800"
                        paddingBottom="7"
                        onClick={() => handleDeleteFile(file)}>
                        <HiTrash color="white"/> 
                    </Button>
                </Flex>
            ))}
            {(topic !== '') && (
                <Flex width="100%" justify="space-between">
                    <Flex gap="3">
                        <Icon as={HiOutlineDocumentText} boxSize={5} />
                        <Text>Topic: {topic.split(' ').slice(0, 3).join(' ')}{topic.split(' ').length > 3 ? '...' : ''}</Text>
                    </Flex>
                    <Button 
                        size="sm" 
                        variant="plain" 
                        background="gray.800"
                        paddingBottom="7"
                        onClick={() => handleDeleteTopic('')}>
                        <HiTrash color="white"/> 
                    </Button>
                </Flex>
            )}
        </Flex>
    );
}

export default InputListDisplay;