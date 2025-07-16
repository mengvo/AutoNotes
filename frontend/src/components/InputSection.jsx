import { Flex, Box, Button, FileUpload, Icon, VStack } from '@chakra-ui/react';
import { HiDocumentAdd, HiOutlinePencilAlt, HiSparkles } from 'react-icons/hi'
import { LuUpload } from 'react-icons/lu'

function InputSection() {
    return (
        <Flex gap={5} direction="column" justify="flex-end" alignItems="center">
            <Box 
                background="gray.800"
                width="75vw"
                padding="4"
                color="white"
                borderRadius="lg">
                <VStack>
                    <Flex gap={4} justify="center">
                        <FileUpload.Root accept={['application/pdf']}> {/* Depending on AI, may add more file types */}
                            <FileUpload.HiddenInput />
                            <FileUpload.Trigger asChild>
                                <Button variant="outline" height="10vh" width ="36vw" background="gray.800" borderColor="gray.700">
                                    <HiDocumentAdd color="#3B82F6"/> Upload file
                                </Button>
                            </FileUpload.Trigger>
                        </FileUpload.Root>

                        <Button variant="outline" height="10vh" width ="36vw" background="gray.800" borderColor="gray.700">
                            <HiOutlinePencilAlt color="#3B82F6"/> Enter a topic
                        </Button>
                    </Flex>

                    <FileUpload.Root alignItems="stretch" maxFiles={3}>
                        <FileUpload.HiddenInput />
                        <FileUpload.Dropzone background="#45494f" borderColor="#3B82F6" width="100%">
                            <Icon size="md" color="fg.muted">
                                <LuUpload color="#3B82F6"/>
                            </Icon>
                            <FileUpload.DropzoneContent>
                                <Box>Drag and drop files here</Box>
                                <Box color="fg.muted">supported formats: .pdf</Box> {/* Depending on AI, may add more file types */}
                            </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                        <FileUpload.List />
                    </FileUpload.Root>
                </VStack>
            </Box>
            <Button rounded="full" color="white" background="gray.800" maxWidth="75vw" width="17vw" height="7vh">
                <HiSparkles color="#3B82F6"/> Generate notes
            </Button>
        </Flex>
    );
}

export default InputSection;