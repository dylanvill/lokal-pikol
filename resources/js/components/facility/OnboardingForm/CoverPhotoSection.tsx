import { Box, Button, FileUpload, Flex, Float, useFileUpload, useFileUploadContext } from '@chakra-ui/react';
import { type useForm } from '@inertiajs/react';
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
                    <FileUpload.ItemDeleteTrigger zIndex={1} as="button" backgroundColor="red.500" borderRadius={2}>
                        <Box padding={12} borderRadius={8}>
                            <LuTrash2 color="white" />
                        </Box>
                    </FileUpload.ItemDeleteTrigger>
                </Float>
            </FileUpload.Item>
        </FileUpload.ItemGroup>
    );
};

function CoverPhotoSection({ form }: { form: ReturnType<typeof useForm> }) {
    const fileUpload = useFileUpload({
        accept: ['image/jpeg', 'image/png'],
        onFileAccept: (details) => {
            form.setData('coverPhoto', details.files[0]);
        },
    });

    return (
        <Box zIndex={1}>
            <FileUpload.RootProvider value={fileUpload} zIndex={1}>
                <FileUpload.HiddenInput required />
                <FileUploadList />
                <Flex justifyContent="flex-end" width="100%" zIndex={1}>
                    <FileUpload.Trigger asChild zIndex={1}>
                        <Button variant="ghost" size="xs" zIndex={1}>
                            <LuImageUp /> Select Cover Photo
                        </Button>
                    </FileUpload.Trigger>
                </Flex>
            </FileUpload.RootProvider>
        </Box>
    );
}

export default CoverPhotoSection;
