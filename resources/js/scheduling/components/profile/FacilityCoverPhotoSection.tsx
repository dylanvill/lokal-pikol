import { Box, Button, FileUpload, Flex, Image, useFileUpload, useFileUploadContext } from '@chakra-ui/react';
import { memo } from 'react';
import { LuImage, LuImageUp } from 'react-icons/lu';

interface FacilityCoverPhotoSectionProps {
    currentPhotoUrl: string | null;
    setData: (value: File) => void;
}

const PreviewArea = ({ currentPhotoUrl }: { currentPhotoUrl: string | null }) => {
    const fileUpload = useFileUploadContext();
    const file = fileUpload.acceptedFiles[0];

    if (file) {
        return (
            <FileUpload.ItemGroup>
                <FileUpload.Item file={file} key={file.name} padding={0} borderRadius={8} aspectRatio={16 / 9}>
                    <FileUpload.ItemPreviewImage borderRadius={8} aspectRatio={16 / 9} objectFit="cover" />
                </FileUpload.Item>
            </FileUpload.ItemGroup>
        );
    }

    if (currentPhotoUrl) {
        return <Image src={currentPhotoUrl} alt="Cover photo" aspectRatio={16 / 9} objectFit="cover" borderRadius={8} width="100%" />;
    }

    return (
        <Box aspectRatio={16 / 9} backgroundColor="gray.100" width="100%" borderRadius={8} display="flex" alignItems="center" justifyContent="center">
            <LuImage size={96} color="gray" />
        </Box>
    );
};

const FacilityCoverPhotoSection = memo(({ currentPhotoUrl, setData }: FacilityCoverPhotoSectionProps) => {
    const fileUpload = useFileUpload({
        accept: ['image/jpeg', 'image/png'],
        onFileAccept: (details) => setData(details.files[0]),
    });

    return (
        <Box>
            <FileUpload.RootProvider value={fileUpload}>
                <FileUpload.HiddenInput />
                <PreviewArea currentPhotoUrl={currentPhotoUrl} />
                <Flex justifyContent="flex-end" width="100%">
                    <FileUpload.Trigger asChild>
                        <Button variant="ghost" size="xs">
                            <LuImageUp /> Replace cover photo
                        </Button>
                    </FileUpload.Trigger>
                </Flex>
            </FileUpload.RootProvider>
        </Box>
    );
});

FacilityCoverPhotoSection.displayName = 'FacilityCoverPhotoSection';

export default FacilityCoverPhotoSection;
