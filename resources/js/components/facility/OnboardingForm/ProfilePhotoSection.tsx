import { Box, Button, FileUpload, Flex, Float, IconButton, useFileUploadContext } from '@chakra-ui/react';
import { LuImage, LuImageUp, LuTrash2 } from 'react-icons/lu';

const FileUploadList = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0)
        return (
            <Box
                aspectRatio={1 / 1}
                backgroundColor="gray.100"
                width="100%"
                borderRadius={8}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderWidth={4}
                borderColor="white"
                zIndex={2}
            >
                <LuImage size={24} color="gray" />
            </Box>
        );

    const file = files[0];
    return (
        <FileUpload.ItemGroup zIndex={2}>
            <FileUpload.Item file={file} key={file.name} padding={0} borderRadius={8} aspectRatio={1 / 1} zIndex={2}>
                <FileUpload.ItemPreviewImage borderRadius={8} aspectRatio={1 / 1} objectFit="cover" zIndex={2} />
                <Float placement="top-end" zIndex={2}>
                    <FileUpload.ItemDeleteTrigger zIndex={2}>
                        <IconButton colorPalette="red" size="xs" zIndex={2}>
                            <LuTrash2 />
                        </IconButton>
                    </FileUpload.ItemDeleteTrigger>
                </Float>
            </FileUpload.Item>
        </FileUpload.ItemGroup>
    );
};

function ProfilePhotoSection() {
    return (
        <Box zIndex={2}>
            <FileUpload.Root accept="image/*" zIndex={2}>
                <FileUpload.HiddenInput />
                <Box width={32} height={32} zIndex={2}>
                    <FileUploadList />
                </Box>
                <Flex justifyContent="flex-end" zIndex={2}>
                    <FileUpload.Trigger asChild zIndex={2}>
                        <Button variant="ghost" size="xs" zIndex={2}>
                            <LuImageUp /> Select Profile Photo
                        </Button>
                    </FileUpload.Trigger>
                </Flex>
            </FileUpload.Root>
        </Box>
    );
}

export default ProfilePhotoSection;
