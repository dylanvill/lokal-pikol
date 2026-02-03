import { Box, Button, FileUpload } from '@chakra-ui/react';
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
    return (
        <StepContentContainer index={1} key={1} title="Photos">
            <FileUpload.Root maxFiles={6} accept={['image/jpeg', 'image/png']}>
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
            </FileUpload.Root>
            <CtaButtonContainer renderPrevious={<PreviousButton />} renderNext={<NextButton />} />
        </StepContentContainer>
    );
}

export default PhotosStepContent;
