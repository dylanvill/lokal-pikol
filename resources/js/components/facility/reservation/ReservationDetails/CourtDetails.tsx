import { Box, Card, Stack, VStack } from '@chakra-ui/react';
import type Photo from '../../../../models/shared/Photo';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import DetailItem from '../../../shared/DetailItem';
import ImageCarousel from '../../../shared/ImageCarousel';

export interface CourtDetailsProps {
    courtName: string;
    covered: boolean;
    photos: Photo[];
}

function CourtDetails({ courtName, covered, photos }: CourtDetailsProps) {
    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Court Details" />
                <Stack gap={6}>
                    {/* Court Photos */}
                    <Box>
                        <ImageCarousel photos={photos} />
                    </Box>

                    {/* Court Information */}
                    <VStack align="start" gap={4}>
                        <DetailItem label="Court Name" value={courtName} />
                        <DetailItem label="Court Type" value={covered ? 'Covered' : 'Outdoor'} />
                    </VStack>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default CourtDetails;
