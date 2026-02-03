import { Box, FileUpload, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { type FileAcceptDetails } from '@zag-js/file-upload';
import { LuUpload } from 'react-icons/lu';
import AppSmallText from '../../app/AppSmallText';
import StepContentContainer from './StepContentContainer';

function PhotosStepContent() {
    const handleFileAccept = (details: FileAcceptDetails) => {
        console.log('Accepted files:', details);
    };

    return (
        <StepContentContainer index={1} key={1} title="Photos">
            <SimpleGrid columns={[3]} gap={4}>
                <Box aspectRatio={1 / 1} backgroundColor="red"></Box>
                <Box aspectRatio={1 / 1} backgroundColor="red"></Box>
                <Box aspectRatio={1 / 1} backgroundColor="red"></Box>
                <Box aspectRatio={1 / 1} backgroundColor="red"></Box>
                <Box aspectRatio={1 / 1} backgroundColor="red">
                    <FileUpload.Root maxFiles={6} onFileAccept={handleFileAccept} accept={['image/jpeg', 'image/png']}>
                        <FileUpload.HiddenInput />
                        <FileUpload.Dropzone>
                            <Icon size="md" color="fg.muted">
                                <LuUpload />
                            </Icon>
                            <FileUpload.DropzoneContent>
                                <Text>Drag and drop files here</Text>
                                <AppSmallText>.png, .jpg up to 5MB</AppSmallText>
                            </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                    </FileUpload.Root>
                </Box>
            </SimpleGrid>
        </StepContentContainer>
    );
}

export default PhotosStepContent;
