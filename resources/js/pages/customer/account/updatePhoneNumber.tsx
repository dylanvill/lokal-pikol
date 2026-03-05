import { Box, Button, Field, Flex, Heading, Input, InputGroup, Text } from '@chakra-ui/react';
import { useForm, usePage } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Customer/Account/Controllers/UpdatePhoneNumberController';
import SuccessAlert from '../../../components/shared/Alert/SuccessAlert';
import BackNavigationBase from '../../../components/shared/BackNavigationBase';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

function UpdatePhoneNumberPage() {
    const { errors, data, setData, processing, submit, resetAndClearErrors, clearErrors } = useForm({
        phoneNumber: '',
    });

    const { flash } = usePage();

    const isSuccess = !!flash.success;

    const canSubmit = !!data.phoneNumber;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        submit(update(), {
            preserveScroll: true,
            onSuccess: () => resetAndClearErrors(),
        });
    };

    return (
        <DefaultPageLayout title="Update Phone Number" contentContainerProps={{ maxWidth: 'xl' }}>
            <BackNavigationBase href="/" label="Back to facilities" />
            <Heading>Update phone number</Heading>
            <Text>
                While this isn't required right away, updating your phone number helps us quickly contact you in case of any issues with your
                reservations.
            </Text>

            {isSuccess && (
                <Box marginTop={8}>
                    <SuccessAlert
                        title="Phone number updated successfully!"
                        description="Your phone number has been updated. We will use this number to contact you regarding your reservations."
                    />
                </Box>
            )}

            <Box marginTop={8}>
                <form onSubmit={handleSubmit}>
                    <Field.Root invalid={!!errors.phoneNumber} marginBottom={4}>
                        <Field.Label>Phone Number</Field.Label>
                        <InputGroup startElement="+63">
                            <Input
                                value={data.phoneNumber}
                                onChange={(e) => setData('phoneNumber', e.target.value)}
                                type="tel"
                                placeholder="912 345 6789"
                                name="phoneNumber"
                                required
                                disabled={processing}
                            />
                        </InputGroup>
                        <Field.ErrorText>{errors.phoneNumber}</Field.ErrorText>
                    </Field.Root>
                    <Flex alignItems="center" justifyContent="flex-end">
                        <Button type="submit" colorPalette="blue" size="md" disabled={!canSubmit} loading={processing}>
                            Update
                        </Button>
                    </Flex>
                </form>
            </Box>
        </DefaultPageLayout>
    );
}

export default UpdatePhoneNumberPage;
