import { Box, Button, FileUpload, useFileUpload } from '@chakra-ui/react';
import { LuFileImage } from 'react-icons/lu';
import ImageListPreview from './ImageListPreview';
import SectionContainer from './SectionContainer';

function PhotosStepContent() {
    const fileUpload = useFileUpload({
        maxFiles: 6,
        accept: ['image/jpeg', 'image/png'],
    });

    return (
        <SectionContainer
            renderIcon={() => <LuFileImage size={24} />}
            title="Photos"
            description="Upload photos of your court to showcase it to customers. You can upload up to 6 images."
        >
            <FileUpload.RootProvider value={fileUpload}>
                <FileUpload.HiddenInput name="photos[]" />
                <ImageListPreview />
                <Box>
                    <FileUpload.Trigger asChild>
                        <Button size="sm">
                            <LuFileImage /> Select Images
                        </Button>
                    </FileUpload.Trigger>
                </Box>
            </FileUpload.RootProvider>
        </SectionContainer>
    );
}

export default PhotosStepContent;
