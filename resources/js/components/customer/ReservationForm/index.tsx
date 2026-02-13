import { Box, Button, Card, Field, Grid, GridItem, Heading, Stack, Text, FileUpload, HStack, VStack, Alert } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import { HiUpload } from 'react-icons/hi';
import ImageCarousel from '../CourtReservationBlock/ImageCarousel';

function ReservationForm() {
    return (
        <Form method="post" action="/reservations">
            <VStack gap={6} align="stretch">
                {/* Notice Section */}
                <Alert.Root status="warning" borderRadius="md">
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Title>Time Slot Reserved</Alert.Title>
                        <Alert.Description>
                            Your selected time slots are reserved for 15:00 minutes. Please complete your booking before the timer expires.
                        </Alert.Description>
                    </Alert.Content>
                </Alert.Root>

                {/* Reservation Section */}
                <Card.Root>
                    <Card.Body>
                        <Heading size="md" mb={4}>
                            Reservation Details
                        </Heading>
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
                                <Box>
                                    <Text fontWeight="semibold" mb={1}>
                                        Facility
                                    </Text>
                                    <Text>Central Sports Complex</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="semibold" mb={1}>
                                        Address
                                    </Text>
                                    <Text>123 Sports Avenue, Makati City</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="semibold" mb={1}>
                                        Court
                                    </Text>
                                    <Text>Basketball Court A - Covered</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="semibold" mb={2}>
                                        Reservation Date
                                    </Text>
                                    <Text>February 15, 2026</Text>
                                </Box>
                            </VStack>

                            <Box>
                                <Text fontWeight="semibold" mb={3}>
                                    Selected Time Slots
                                </Text>
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
                            </Box>
                        </Stack>
                    </Card.Body>
                </Card.Root>

                {/* Payment Breakdown */}
                <Card.Root>
                    <Card.Body>
                        <Heading size="md" mb={4}>
                            Payment Breakdown
                        </Heading>
                        <VStack gap={3}>
                            <HStack justify="space-between" width="full">
                                <Text>Court Fee (2 hours)</Text>
                                <Text>₱800.00</Text>
                            </HStack>
                            <HStack justify="space-between" width="full">
                                <Text>Service Fee</Text>
                                <Text>₱50.00</Text>
                            </HStack>
                            <Box height="1px" bg="gray.200" width="full" />
                            <HStack justify="space-between" width="full">
                                <Text fontWeight="bold" fontSize="lg">
                                    Total
                                </Text>
                                <Text fontWeight="bold" fontSize="lg">
                                    ₱850.00
                                </Text>
                            </HStack>
                        </VStack>
                    </Card.Body>
                </Card.Root>

                {/* Payment Section */}
                <Card.Root>
                    <Card.Body>
                        <Heading size="md" mb={4}>
                            Payment
                        </Heading>
                        <VStack gap={4}>
                            <Box>
                                <Text fontWeight="semibold" mb={2}>
                                    Scan QR Code to Pay
                                </Text>
                                <Box
                                    width="200px"
                                    height="200px"
                                    bg="gray.100"
                                    border="2px dashed"
                                    borderColor="gray.300"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius="md"
                                >
                                    <Text color="gray.500">QR Code Placeholder</Text>
                                </Box>
                            </Box>

                            <Field.Root>
                                <Field.Label>
                                    Upload Proof of Payment
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <FileUpload.Root>
                                    <FileUpload.HiddenInput name="payment_proof" />
                                    <FileUpload.Trigger asChild>
                                        <Button variant="outline" size="sm">
                                            <HiUpload /> Upload file
                                        </Button>
                                    </FileUpload.Trigger>
                                    <FileUpload.List />
                                </FileUpload.Root>
                                <Field.HelperText>Upload screenshot or photo of your payment confirmation</Field.HelperText>
                                <Field.ErrorText />
                            </Field.Root>
                        </VStack>
                    </Card.Body>
                </Card.Root>

                {/* Reserve Button */}
                <Button type="submit" colorScheme="blue" size="lg" width="full">
                    Complete Reservation
                </Button>
            </VStack>
        </Form>
    );
}

export default ReservationForm;
