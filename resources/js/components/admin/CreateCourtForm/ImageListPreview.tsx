import { FileUpload, Float, IconButton, SimpleGrid, useFileUploadContext } from '@chakra-ui/react';
import { LuTrash } from 'react-icons/lu';

function ImageListPreview() {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0) return null;
    return (
        <FileUpload.ItemGroup>
            <SimpleGrid columns={3} gap={4}>
                {files.map((file) => (
                    <FileUpload.Item aspectRatio={1 / 1} file={file} key={file.name} padding={0} borderRadius={4}>
                        <FileUpload.ItemPreviewImage borderRadius={4} width="100%" height="100%" objectFit="cover" />
                        <Float placement="top-end" offsetX={5} offsetY={5}>
                            <FileUpload.ItemDeleteTrigger>
                                <IconButton colorPalette="red" size="xs" aria-label="Delete Image" >
                                    <LuTrash />
                                </IconButton>
                            </FileUpload.ItemDeleteTrigger>
                        </Float>
                    </FileUpload.Item>
                ))}
            </SimpleGrid>
        </FileUpload.ItemGroup>
    );
}

export default ImageListPreview;
