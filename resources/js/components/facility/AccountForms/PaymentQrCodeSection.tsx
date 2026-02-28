import { Box, Button, FileUpload, Flex, Float, Image, useFileUpload, useFileUploadContext } from '@chakra-ui/react';
import { type useForm } from '@inertiajs/react';
import { LuImage, LuImageUp, LuTrash2 } from 'react-icons/lu';

const FileUploadList = ({ currentImageUrl }: { currentImageUrl?: string }) => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;

    if (currentImageUrl) {
        return <Image src={currentImageUrl} alt="Current Payment QR Code" borderRadius={8} maxWidth="sm" alignSelf="center" />;
    }

    if (files.length === 0) {
        return (
            <Box
                backgroundColor="gray.100"
                width="100%"
                height="300px"
                borderRadius={8}
                display="flex"
                alignItems="center"
                justifyContent="center"
                maxWidth="sm"
                alignSelf="center"
            >
                {!currentImageUrl && <LuImage size={96} color="gray" />}
            </Box>
        );
    }

    const file = files[0];
    return (
        <FileUpload.ItemGroup>
            <FileUpload.Item file={file} key={file.name} padding={0} borderRadius={8} maxWidth="sm" alignSelf="center">
                <FileUpload.ItemPreviewImage borderRadius={8} objectFit="cover" maxWidth="sm" />
                <Float placement="top-end">
                    <FileUpload.ItemDeleteTrigger as="button" backgroundColor="red.500" borderRadius={2}>
                        <Box padding={12} borderRadius={8}>
                            <LuTrash2 color="white" />
                        </Box>
                    </FileUpload.ItemDeleteTrigger>
                </Float>
            </FileUpload.Item>
        </FileUpload.ItemGroup>
    );
};

function PaymentQrCodeSection({ form, currentImageUrl }: { form: ReturnType<typeof useForm>; currentImageUrl?: string }) {
    const fileUpload = useFileUpload({
        accept: ['image/jpeg', 'image/png'],
        onFileAccept: (details) => {
            form.setData('paymentQrCode', details.files[0]);
        },
    });

    return (
        <FileUpload.RootProvider value={fileUpload}>
            <FileUpload.HiddenInput />
            <FileUploadList currentImageUrl={currentImageUrl} />
            <Flex justifyContent="center" width="100%">
                <FileUpload.Trigger asChild>
                    <Button variant="ghost" size="xs">
                        <LuImageUp /> Select Payment QR Code
                    </Button>
                </FileUpload.Trigger>
            </Flex>
        </FileUpload.RootProvider>
    );
}

export default PaymentQrCodeSection;
