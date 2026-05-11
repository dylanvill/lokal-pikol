import { Box, Button, FileUpload, Flex, Image, useFileUpload, useFileUploadContext } from '@chakra-ui/react';
import { memo } from 'react';
import { LuImage, LuImageUp } from 'react-icons/lu';

interface FacilityProfilePhotoSectionProps {
    currentPhotoUrl: string | null;
    setData: (value: File) => void;
}

const PreviewArea = ({ currentPhotoUrl }: { currentPhotoUrl: string | null }) => {
    const fileUpload = useFileUploadContext();
    const file = fileUpload.acceptedFiles[0];

    if (file) {
        return (
            <FileUpload.ItemGroup>
                <FileUpload.Item file={file} key={file.name} padding={0} borderRadius={8} aspectRatio={1 / 1}>
                    <FileUpload.ItemPreviewImage borderRadius={8} aspectRatio={1 / 1} objectFit="cover" />
                </FileUpload.Item>
            </FileUpload.ItemGroup>
        );
    }

    if (currentPhotoUrl) {
        return <Image src={currentPhotoUrl} alt="Profile photo" aspectRatio={1 / 1} objectFit="cover" borderRadius={8} width="100%" />;
    }

    return (
        <Box aspectRatio={1 / 1} backgroundColor="gray.100" width="100%" borderRadius={8} display="flex" alignItems="center" justifyContent="center">
            <LuImage size={24} color="gray" />
        </Box>
    );
};

const FacilityProfilePhotoSection = memo(({ currentPhotoUrl, setData }: FacilityProfilePhotoSectionProps) => {
    const fileUpload = useFileUpload({
        accept: ['image/jpeg', 'image/png'],
        onFileAccept: (details) => setData(details.files[0]),
    });

    return (
        <Box>
            <FileUpload.RootProvider value={fileUpload}>
                <FileUpload.HiddenInput />
                <Box width={{ base: 24, md: 32 }} height={{ base: 24, md: 32 }}>
                    <PreviewArea currentPhotoUrl={currentPhotoUrl} />
                </Box>
                <Flex justifyContent="flex-end">
                    <FileUpload.Trigger asChild>
                        <Button variant="ghost" size="xs">
                            <LuImageUp /> Replace profile photo
                        </Button>
                    </FileUpload.Trigger>
                </Flex>
            </FileUpload.RootProvider>
        </Box>
    );
});

FacilityProfilePhotoSection.displayName = 'FacilityProfilePhotoSection';

export default FacilityProfilePhotoSection;
