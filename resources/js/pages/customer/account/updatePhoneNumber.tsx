import { Box, Button, Field, Flex, Heading, Input, InputGroup, Text } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Customer/Account/Controllers/UpdatePhoneNumberController';
import BackNavigationBase from '../../../components/shared/BackNavigationBase';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

function UpdatePhoneNumberPage({ fromAuth }: { fromAuth?: boolean }) {
    const { errors, data, setData, processing, submit, resetAndClearErrors, clearErrors } = useForm({
        phoneNumber: '',
    });

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
            <Heading>{fromAuth ? 'Almost there! Just add a phone number' : 'Add phone number'}</Heading>
            <Text>
                While this isn't required right away, adding your phone number helps us quickly contact you in case of any issues with your
                reservations.
            </Text>

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
                            Save
                        </Button>
                    </Flex>
                </form>
            </Box>
        </DefaultPageLayout>
    );
}

export default UpdatePhoneNumberPage;
