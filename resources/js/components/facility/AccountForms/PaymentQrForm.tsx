import { Button, Card, Field, Flex, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { LuQrCode } from 'react-icons/lu';
import SectionHeader from '../OnboardingForm/SectionHeader';
import PaymentQrCodeSection from './PaymentQrCodeSection';

interface PaymentQrFormProps {
    currentQrCodeUrl?: string;
}

function PaymentQrForm({ currentQrCodeUrl = 'https://picsum.photos/200/300' }: PaymentQrFormProps) {
    const form = useForm({
        paymentQrCode: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/facility/payment-qr', {
            onSuccess: () => {
                // Reset form or show success message
            },
        });
    };

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
                <form onSubmit={handleSubmit}>
                    <VStack gap={6}>
                        <Field.Root invalid={!!form.errors.paymentQrCode}>
                            <Field.Label>Payment QR Code</Field.Label>
                            <PaymentQrCodeSection form={form} currentImageUrl={currentQrCodeUrl} />
                            <Field.HelperText>Upload a clear image of your payment QR code (PNG, JPG, or JPEG format).</Field.HelperText>
                            <Field.ErrorText>{form.errors.paymentQrCode}</Field.ErrorText>
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
