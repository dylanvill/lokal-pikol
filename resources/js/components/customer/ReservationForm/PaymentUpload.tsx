import { Box, Button, Card, Center, Field, FileUpload, Flex, Image, VStack } from '@chakra-ui/react';
import { LuArrowRight, LuUpload } from 'react-icons/lu';
import CardHeading from './CardHeading';

function PaymentUpload() {
    return (
        <Box>
            <Card.Root>
                <Card.Body>
                    <CardHeading text="Upload Payment" />
                    <VStack gap={4}>
                        <VStack gap={2} alignItems="center">
                            <Image
                                src="https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
                                alt="QR Code"
                                width="full"
                                maxWidth="md"
                                borderRadius={8}
                            />
                        </VStack>

                        <Field.Root>
                            <Center>
                                <Field.Label fontWeight="normal">
                                    Scan QR code and upload receipt or screenshot of your payment confirmation
                                    <Field.RequiredIndicator />
                                </Field.Label>
                            </Center>
                            <FileUpload.Root>
                                <FileUpload.HiddenInput name="payment_proof" />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        <LuUpload /> Upload receipt
                                    </Button>
                                </FileUpload.Trigger>
                                <FileUpload.List />
                            </FileUpload.Root>
                            <Field.ErrorText />
                        </Field.Root>
                    </VStack>
                </Card.Body>
            </Card.Root>

            <Flex alignItems="center" justifyContent="flex-end">
                <Button type="button" colorScheme="blue" width="auto" marginTop={4}>
                    Complete Reservation
                    <LuArrowRight />
                </Button>
            </Flex>
        </Box>
    );
}

export default PaymentUpload;
