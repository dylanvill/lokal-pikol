import { Box, Card, Grid, GridItem, Stack, VStack } from '@chakra-ui/react';
import ImageCarousel from '../CourtReservationBlock/ImageCarousel';
import CardHeading from './CardHeading';
import DetailItem from './DetailItem';

function ReservationDetails() {
    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Reservation Details" />
                <Stack gap={6}>
                    {/* Facility Photos */}
                    <Box>
                        <ImageCarousel
                            photos={[
                                { id: '1', url: 'https://via.placeholder.com/800x450/4299e1/white?text=Court+Photo+1' },
                                { id: '2', url: 'https://via.placeholder.com/800x450/06b6d4/white?text=Court+Photo+2' },
                                { id: '3', url: 'https://via.placeholder.com/800x450/059669/white?text=Court+Photo+3' },
                            ]}
                        />
                    </Box>

                    {/* Facility and Court Information */}
                    <VStack align="start" gap={3}>
                        <DetailItem label="Facility" value="Central Sports Complex"></DetailItem>
                        <DetailItem label="Address" value="123 Sports Avenue, Makati City"></DetailItem>
                        <DetailItem label="Court" value="Basketball Court A - Covered"></DetailItem>
                        <DetailItem label="Reservation Date" value="February 15, 2026"></DetailItem>
                        <DetailItem label="Selected Time Slots">
                            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                                {['8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16'].map((time) => (
                                    <GridItem key={time}>
                                        <Box
                                            border="1px solid"
                                            borderColor="gray.200"
                                            borderRadius="md"
                                            p={2}
                                            textAlign="center"
                                            bg="blue.50"
                                            color="blue.700"
                                            fontSize="sm"
                                        >
                                            {time}:00
                                        </Box>
                                    </GridItem>
                                ))}
                            </Grid>
                        </DetailItem>
                    </VStack>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default ReservationDetails;
