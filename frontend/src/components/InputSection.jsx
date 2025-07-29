import { Flex, Box, Button, FileUpload, Icon, VStack } from '@chakra-ui/react';
import { HiDocumentAdd, HiOutlinePencilAlt, HiSparkles, HiTrash } from 'react-icons/hi';
import { LuUpload } from 'react-icons/lu';
import { useState } from 'react';
import TopicInput from './TopicInput';

function InputSection() {
    const [files, setFiles] = useState([]);
    const [topic, setTopic] = useState('');
    const [showTopicInput, setShowTopicInput] = useState(false);

    const handleSubmit = async () => {
        if(files.length === 0) {
            console.error('No files uploaded')
            return;
        }

        const formData = new FormData();

        files.forEach((file) => {
            formData.append('files', file, file.name)
        });

        const res = await fetch('http://127.0.0.1:8000/generate_notes', {
            method: 'POST',
            body: formData
        });

        if (!res.ok) {
            console.error('Failed to send file');
        } else {
            const data = await res.json();
            console.log('Response from backend:', data);
        }
        console.log('Topic', topic)
    };

    const handlePrompt = () => { setShowTopicInput(true) };

    return (
        <Box position="relative" width="100%" height="100%">
            {showTopicInput && (
                <>
                    <Box 
                        position="fixed"
                        top="0"
                        left="0"
                        width="100vw"
                        height="100vh"
                        backdropFilter="blur(3px)"
                        background="rgba(0, 0, 0, 0.3)"
                        zIndex="999"/>
                    <TopicInput 
                        setShowTopicInput={setShowTopicInput}
                        setTopic={setTopic}/>
                </>
            )}
            <Flex gap={5} direction="column" justify="flex-end" alignItems="center">
                <Box 
                    background="gray.800"
                    width="75vw"
                    padding="4"
                    color="white"
                    borderRadius="lg">
                    <VStack> {/* Depending on AI, may add more file types */}
                        <FileUpload.Root 
                            accept={['application/pdf', 'text/*']} 
                            maxFiles={5}
                            onChange={(e) => { setFiles(Array.from(e.target?.files) || []) }}> 
                            <FileUpload.HiddenInput />

                            <Flex gap={4} justify="center">
                                    <FileUpload.Trigger asChild>
                                        <Button 
                                            variant="outline" 
                                            height="10vh" 
                                            width ="36vw" 
                                            background="gray.800" 
                                            borderColor="gray.700" 
                                            color="white">
                                            <HiDocumentAdd color="#3B82F6"/> Upload file
                                        </Button>
                                    </FileUpload.Trigger>

                                <Button 
                                    variant="outline" 
                                    height="10vh" 
                                    width ="36vw" 
                                    background="gray.800" 
                                    borderColor="gray.700"
                                    color="white"
                                    onClick={handlePrompt}>
                                    <HiOutlinePencilAlt color="#3B82F6"/> Enter a topic
                                </Button>
                            </Flex>

                            <FileUpload.Dropzone background="#45494f" borderColor="#3B82F6" width="100%">
                                <Icon size="md" color="fg.muted">
                                    <LuUpload color="#3B82F6"/>
                                </Icon>
                                <FileUpload.DropzoneContent>
                                    <Box color="white">Drag and drop files here</Box>
                                    <Box color="fg.muted">supported formats: .pdf</Box> {/* Depending on AI, may add more file types */}
                                </FileUpload.DropzoneContent>
                            </FileUpload.Dropzone>

                            <FileUpload.ItemGroup>
                                <FileUpload.Context>
                                    {({ acceptedFiles }) =>
                                        acceptedFiles.map((file) => (
                                            <FileUpload.Item key={file.name} file={file}>
                                            <FileUpload.ItemPreview />
                                            <FileUpload.ItemName />
                                            <FileUpload.ItemSizeText />
                                            <FileUpload.ItemDeleteTrigger boxSize="8">
                                                <Icon as={HiTrash} boxSize={6} />
                                            </FileUpload.ItemDeleteTrigger>
                                            </FileUpload.Item>
                                        ))
                                    }
                                </FileUpload.Context>
                            </FileUpload.ItemGroup>

                        </FileUpload.Root>
                    </VStack>
                </Box>
                <Button 
                    rounded="full" 
                    color="white" 
                    background="gray.800" 
                    maxWidth="75vw" 
                    width="17vw" 
                    height="7vh"
                    onClick={handleSubmit}>
                    <HiSparkles color="#3B82F6"/> Generate notes
                </Button>
            </Flex>
        </Box>
    );
}

export default InputSection;