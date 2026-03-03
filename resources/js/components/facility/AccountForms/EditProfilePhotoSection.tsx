import { Box, Button, FileUpload, Flex, Float, Image, useFileUpload, useFileUploadContext } from '@chakra-ui/react';
import { type useForm } from '@inertiajs/react';
import { LuImage, LuImageUp, LuTrash2 } from 'react-icons/lu';

const FileUploadList = ({ currentImageUrl }: { currentImageUrl?: string }) => {
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
                {currentImageUrl ? (
                    <Image
                        src={currentImageUrl}
                        alt="Current Profile"
                        width="full"
                        height="full"
                        borderRadius={8}
                        objectFit="cover"
                        aspectRatio={1 / 1}
                    />
                ) : (
                    <LuImage size={24} color="gray" />
                )}
            </Box>
        );

    const file = files[0];
    return (
        <FileUpload.ItemGroup zIndex={2}>
            <FileUpload.Item file={file} key={file.name} padding={0} borderRadius={8} aspectRatio={1 / 1} zIndex={2}>
                <FileUpload.ItemPreviewImage borderRadius={8} aspectRatio={1 / 1} objectFit="cover" zIndex={2} />
                <Float placement="top-end" zIndex={2}>
                    <FileUpload.ItemDeleteTrigger zIndex={2} as="button" backgroundColor="red.500" borderRadius={2}>
                        <Box padding={12} borderRadius={8}>
                            <LuTrash2 color="white" />
                        </Box>
                    </FileUpload.ItemDeleteTrigger>
                </Float>
            </FileUpload.Item>
        </FileUpload.ItemGroup>
    );
};

function EditProfilePhotoSection({ form, currentImageUrl }: { form: ReturnType<typeof useForm>; currentImageUrl?: string }) {
    const fileUpload = useFileUpload({
        accept: ['image/jpeg', 'image/png'],
        onFileAccept: (details) => {
            form.setData('profilePhoto', details.files[0]);
        },
    });
    return (
        <Box zIndex={2}>
            <FileUpload.RootProvider value={fileUpload} zIndex={2}>
                <FileUpload.HiddenInput />
                <Box width={32} height={32} zIndex={2}>
                    <FileUploadList currentImageUrl={currentImageUrl} />
                </Box>
                <Flex justifyContent="flex-end" zIndex={2}>
                    <FileUpload.Trigger asChild zIndex={2}>
                        <Button variant="ghost" size="xs" zIndex={2}>
                            <LuImageUp /> Select Profile Photo
                        </Button>
                    </FileUpload.Trigger>
                </Flex>
            </FileUpload.RootProvider>
        </Box>
    );
}

export default EditProfilePhotoSection;
