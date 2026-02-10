import { Image, Carousel, IconButton, AspectRatio, Box, type IconButtonProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import type Photo from '../../../models/shared/Photo';

const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(function ActionButton(props, ref) {
    return <IconButton {...props} ref={ref} size="xs" variant="outline" rounded="full" position="absolute" zIndex="1" bg="bg" />;
});

interface ImageCarouselProps {
    photos: Photo[];
}

function ImageCarousel({ photos }: ImageCarouselProps) {
    return (
        <Carousel.Root slideCount={photos.length} maxW="2xl" mx="auto" gap="4" position="relative" colorPalette="white">
            <Carousel.Control gap="4" width="full" position="relative">
                <Carousel.PrevTrigger asChild>
                    <ActionButton insetStart="4">
                        <LuArrowLeft />
                    </ActionButton>
                </Carousel.PrevTrigger>

                <Carousel.ItemGroup width="full" borderRadius={12}>
                    {photos.map((photo, index) => (
                        <Carousel.Item key={index} index={index}>
                            <AspectRatio ratio={16 / 9} maxH="72vh" w="full">
                                <Image src={photo.url} alt={`Court ${index + 1}`} objectFit="contain" />
                            </AspectRatio>
                        </Carousel.Item>
                    ))}
                </Carousel.ItemGroup>

                <Carousel.NextTrigger asChild>
                    <ActionButton insetEnd="4">
                        <LuArrowRight />
                    </ActionButton>
                </Carousel.NextTrigger>

                <Box position="absolute" bottom="6" width="full">
                    <Carousel.Indicators
                        transition="width 0.2s ease-in-out"
                        transformOrigin="center"
                        opacity="0.5"
                        boxSize="2"
                        _current={{ width: '10', bg: 'colorPalette.subtle', opacity: 1 }}
                    />
                </Box>
            </Carousel.Control>
        </Carousel.Root>
    );
}

export default ImageCarousel;
