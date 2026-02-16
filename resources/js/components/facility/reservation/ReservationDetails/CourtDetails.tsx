import { Box, Card, Stack, VStack } from '@chakra-ui/react';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import DetailItem from '../../../shared/DetailItem';
import ImageCarousel from '../../../shared/ImageCarousel';

function CourtDetails() {
    // Static photos data for now
    const courtPhotos = [
        { id: "1", url: 'https://picsum.photos/800/450?random=1' },
        { id: "2", url: 'https://picsum.photos/800/450?random=2' },
        { id: "3", url: 'https://picsum.photos/800/450?random=3' },
    ];

    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Court Details" />
                <Stack gap={6}>
                    {/* Court Photos */}
                    <Box>
                        <ImageCarousel photos={courtPhotos} />
                    </Box>

                    {/* Court Information */}
                    <VStack align="start" gap={4}>
                        <DetailItem label="Court Name" value="Central Tennis Court A" />
                        <DetailItem label="Court Type" value="Indoor" />
                    </VStack>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default CourtDetails;
