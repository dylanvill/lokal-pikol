import { Box, Button, FileUpload, Flex, Float, IconButton, useFileUploadContext } from '@chakra-ui/react';
import { LuImage, LuImageUp, LuTrash2 } from 'react-icons/lu';

const FileUploadList = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0)
        return (
            <Box
                aspectRatio={16 / 9}
                backgroundColor="gray.100"
                width="100%"
                borderRadius={8}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
            >
                <LuImage size={96} color="gray" />
            </Box>
        );

    const file = files[0];
    return (
        <FileUpload.ItemGroup zIndex={1}>
            <FileUpload.Item file={file} key={file.name} padding={0} borderRadius={8} aspectRatio={16 / 9} zIndex={1}>
                <FileUpload.ItemPreviewImage borderRadius={8} aspectRatio={16 / 9} objectFit="cover" zIndex={1} />
                <Float placement="top-end" zIndex={1}>
                    <FileUpload.ItemDeleteTrigger zIndex={1}>
                        <IconButton colorPalette="red" size="xs" zIndex={1}>
                            <LuTrash2 />
                        </IconButton>
                    </FileUpload.ItemDeleteTrigger>
                </Float>
            </FileUpload.Item>
        </FileUpload.ItemGroup>
    );
};

function CoverPhotoSection() {
    return (
        <Box zIndex={1}>
            <FileUpload.Root accept="image/*" zIndex={1}>
                <FileUpload.HiddenInput />
                <FileUploadList />
                <Flex justifyContent="flex-end" width="100%" zIndex={1}>
                    <FileUpload.Trigger asChild zIndex={1}>
                        <Button variant="ghost" size="xs" zIndex={1}>
                            <LuImageUp /> Select Cover Photo
                        </Button>
                    </FileUpload.Trigger>
                </Flex>
            </FileUpload.Root>
        </Box>
    );
}

export default CoverPhotoSection;
