import { Box, Button, Card, Center, Field, Flex, VStack } from '@chakra-ui/react';
import { useForm, usePage } from '@inertiajs/react';
import { LuQrCode } from 'react-icons/lu';
import SuccessAlert from '../../shared/Alert/SuccessAlert';
import SectionHeader from '../OnboardingForm/SectionHeader';
import PaymentQrCodeSection from './PaymentQrCodeSection';

interface PaymentQrFormProps {
    currentPaymentQrCodeUrl?: string;
}

function PaymentQrForm({ currentPaymentQrCodeUrl }: PaymentQrFormProps) {
    const { flash } = usePage();

    const form = useForm({
        paymentQrCode: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/facility/account/update-payment-qr', {
            preserveScroll: true,
        });
    };

    const successMessage = flash?.['update-payment-qr-success'] as string | undefined;

    return (
        <Card.Root>
            <Card.Header>
                <SectionHeader
                    icon={<LuQrCode />}
                    title="Payment QR Code"
                    description="This QR code will be used by users to make payments. Please upload a QR code that is linked to your facility's payment account."
                />
            </Card.Header>
            <Card.Body>
                {successMessage && (
                    <Box marginBottom={4}>
                        <SuccessAlert title="Payment QR Code Updated" description={successMessage} />
                    </Box>
                )}
                <form onSubmit={handleSubmit}>
                    <VStack gap={6}>
                        <Field.Root invalid={!!form.errors.paymentQrCode}>
                            <Center width="100%">
                                <Field.Label textAlign="center">Payment QR Code</Field.Label>
                            </Center>
                            <PaymentQrCodeSection form={form} currentImageUrl={currentPaymentQrCodeUrl} />
                            <Center width="100%">
                                <Field.HelperText textAlign="center">
                                    Upload a clear image of your payment QR code (PNG, JPG, or JPEG format).
                                </Field.HelperText>
                                <Field.ErrorText textAlign="center">{form.errors.paymentQrCode}</Field.ErrorText>
                            </Center>
                        </Field.Root>

                        <Flex width="full" justifyContent="flex-end">
                            <Button type="submit" disabled={form.processing || !form.data.paymentQrCode} colorPalette="blue">
                                Update QR Code
                            </Button>
                        </Flex>
                    </VStack>
                </form>
            </Card.Body>
        </Card.Root>
    );
}

export default PaymentQrForm;
