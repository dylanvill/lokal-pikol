import { Box, Button, Field, FileUpload, useFileUpload } from '@chakra-ui/react';
import { useFormContext } from '@inertiajs/react';
import { LuFileImage } from 'react-icons/lu';
import ImageListPreview from './ImageListPreview';
import SectionContainer from './SectionContainer';

function PhotosStepContent() {
    const form = useFormContext();
    const errors = form!.errors;

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
            <Field.Root invalid={!!errors.photos}>
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
                <Field.ErrorText>{errors.photos}</Field.ErrorText>
            </Field.Root>
        </SectionContainer>
    );
}

export default PhotosStepContent;
