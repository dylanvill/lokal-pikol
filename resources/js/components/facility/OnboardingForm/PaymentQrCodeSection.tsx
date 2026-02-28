import { Box, Button, FileUpload, Flex, Float, useFileUpload, useFileUploadContext } from '@chakra-ui/react';
import { type useForm } from '@inertiajs/react';
import { LuImage, LuImageUp, LuTrash2 } from 'react-icons/lu';

const FileUploadList = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0)
        return (
            <Box
                aspectRatio={1}
                backgroundColor="gray.100"
                width="100%"
                borderRadius={8}
                display="flex"
                alignItems="center"
                justifyContent="center"
                maxWidth="sm"
                alignSelf="center"
                
            >
                <LuImage size={96} color="gray" />
            </Box>
        );

    const file = files[0];
    return (
        <FileUpload.ItemGroup>
            <FileUpload.Item file={file} key={file.name} padding={0} borderRadius={8} maxWidth="sm" alignSelf="center">
                <FileUpload.ItemPreviewImage borderRadius={8} objectFit="cover" maxWidth="sm"  />
                <Float placement="top-end" >
                    <FileUpload.ItemDeleteTrigger  as="button" backgroundColor="red.500" borderRadius={2}>
                        <Box padding={12} borderRadius={8}>
                            <LuTrash2 color="white" />
                        </Box>
                    </FileUpload.ItemDeleteTrigger>
                </Float>
            </FileUpload.Item>
        </FileUpload.ItemGroup>
    );
};

function PaymentQrCodeSection({ form }: { form: ReturnType<typeof useForm> }) {
    const fileUpload = useFileUpload({
        accept: ['image/jpeg', 'image/png'],
        onFileAccept: (details) => {
            form.setData('paymentQrCode', details.files[0]);
        },
    });

    return (
        <Box >
            <FileUpload.RootProvider value={fileUpload} >
                <FileUpload.HiddenInput required />
                <FileUploadList />
                <Flex justifyContent="center" width="100%" >
                    <FileUpload.Trigger asChild >
                        <Button variant="ghost" size="xs" >
                            <LuImageUp /> Select Payment QR Code
                        </Button>
                    </FileUpload.Trigger>
                </Flex>
            </FileUpload.RootProvider>
        </Box>
    );
}

export default PaymentQrCodeSection;
