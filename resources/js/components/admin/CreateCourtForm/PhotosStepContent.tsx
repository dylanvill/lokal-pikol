import { Box, Button, FileUpload, useFileUpload, useStepsContext } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { LuFileImage } from 'react-icons/lu';
import AppSmallText from '../../app/AppSmallText';
import CtaButtonContainer from './CtaButtonContainer';
import ImageListPreview from './ImageListPreview';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import StepContentContainer from './StepContentContainer';

export interface PhotosStepContentProps {
    onPhotosSubmitted: (photos: File[]) => void;
}

function PhotosStepContent({ onPhotosSubmitted }: PhotosStepContentProps) {
    const { handleSubmit } = useForm();
    const { goToNextStep } = useStepsContext();

    const handleOnSubmit = () => {
        onPhotosSubmitted(fileUpload.acceptedFiles);
        goToNextStep();
    };

    const fileUpload = useFileUpload({
        maxFiles: 6,
        accept: ['image/jpeg', 'image/png'],
    });

    const disableSubmit = fileUpload.acceptedFiles.length === 0 || fileUpload.rejectedFiles.length > 6;

    return (
        <StepContentContainer index={1} key={1} title="Photos">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <FileUpload.RootProvider value={fileUpload}>
                    <FileUpload.HiddenInput />
                    <ImageListPreview />
                    <Box>
                        <FileUpload.Trigger asChild>
                            <Button size="sm">
                                <LuFileImage /> Select Images
                            </Button>
                        </FileUpload.Trigger>
                        <AppSmallText marginTop={2}>You can upload up to 6 images. Accepted formats: JPG, PNG.</AppSmallText>
                    </Box>
                </FileUpload.RootProvider>
                <CtaButtonContainer renderPrevious={<PreviousButton />} renderNext={<NextButton type="submit" disabled={disableSubmit} />} />
            </form>
        </StepContentContainer>
    );
}

export default PhotosStepContent;
