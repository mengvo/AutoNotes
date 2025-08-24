import { Flex, Box, Button, FileUpload, Icon, VStack } from '@chakra-ui/react';
import { HiDocumentAdd, HiOutlinePencilAlt, HiSparkles } from 'react-icons/hi';
import { LuUpload } from 'react-icons/lu';
import { useState, useRef } from 'react';
import TopicInput from './TopicInput';
import InputListDisplay from './InputListDisplay';
import NotesDisplay from './NotesDisplay';

function InputSection() {
    const [files, setFiles] = useState([]);
    const lastProcessedIndex = useRef(-1);
    const [topic, setTopic] = useState('');
    const [showTopicInput, setShowTopicInput] = useState(false);
    const [notes, setNotes] = useState('');

    // sends post request to api
    const handleSubmit = async () => {
        if(files.length === 0 && !topic.trim()) {
            console.error('Nothing uploaded');
            return;
        }

        const formData = new FormData();

        if(files.length > 0) {
            files.forEach((file) => {
                formData.append('files', file, file.name);
            });
        }
        
        if(topic.trim() !== '') {
            formData.append('topic', topic);
        }

        console.time('POST request');
        const res = await fetch('http://127.0.0.1:8000/generate_notes', {
            method: 'POST',
            body: formData
        });
        console.timeEnd('POST request');

        if (!res.ok) {
            console.error('Failed to send file');
        } else {
            console.time('Parsing response');
            const data = await res.json();
            setNotes(data.generated_notes);
            console.timeEnd('Parsing response');
            console.log('Response from backend:', data);
        }
    };

    const handlePrompt = () => { setShowTopicInput(true) };

    const handleFileAccept = (details) => {
        console.log(details.files);
        const newFiles = details.files.slice(lastProcessedIndex.current + 1);
        if (newFiles.length > 0) {
            setFiles(prev => [...prev, ...newFiles]);
            lastProcessedIndex.current = details.files.length - 1;
        }
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles((prev) => prev.filter((file) => file !== fileToDelete));
    };

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
            {notes !== '' && (
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
                    <NotesDisplay
                        notes={notes}
                        setNotes={setNotes}/>
                </>
            )}
            <Flex gap={5} direction="column" justify="flex-end" alignItems="center">
                <Box 
                    background="gray.800"
                    width="75vw"
                    padding="4"
                    color="white"
                    borderRadius="lg">
                    <VStack>
                        <FileUpload.Root 
                            accept={['application/pdf']} 
                            maxFiles={25}
                            onFileAccept={handleFileAccept}> 
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
                                    <Box color="fg.muted">supported formats: .pdf</Box>
                                </FileUpload.DropzoneContent>
                            </FileUpload.Dropzone>

                            {(files.length > 0 || topic !== '') && (
                                <InputListDisplay
                                    files={files}
                                    topic={topic}
                                    handleDeleteFile={handleDeleteFile}
                                    handleDeleteTopic={setTopic}/>
                            )}
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