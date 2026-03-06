import { Box, Field, Heading, Text, Input, Button, Flex } from '@chakra-ui/react';
import { useForm, usePage } from '@inertiajs/react';
import { send } from '@/actions/App/Http/Customer/Auth/Controllers/ForgotPasswordController';
import SuccessAlert from '../../../components/shared/Alert/SuccessAlert';
import BackNavigation from '../../../components/shared/BackNavigation';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

function ForgotPasswordPage() {
    const { flash } = usePage();

    const { submit, data, setData, processing } = useForm({
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(send());
    };

    const canSubmit = data.email;

    const resetPasswordSuccess = flash?.['forgot-password-success'] as string | null;

    return (
        <DefaultPageLayout
            title="Send Reset Password Link"
            contentContainerProps={{
                maxWidth: 'lg',
            }}
        >
            <BackNavigation />
            <Box marginBottom={8}>
                <Heading>Forgot password</Heading>
                <Text>We'll send you an email with instructions to reset your password.</Text>
            </Box>
            {resetPasswordSuccess ? <Box marginBottom={4}>
                <SuccessAlert title="Reset password email sent" description={resetPasswordSuccess} />
            </Box> : null}
            <form onSubmit={handleSubmit}>
                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                    />
                </Field.Root>
                <Flex justifyContent="flex-end" mt={4}>
                    <Button type="submit" size="md" loading={processing} disabled={processing || !canSubmit}>
                        Submit
                    </Button>
                </Flex>
            </form>
        </DefaultPageLayout>
    );
}

export default ForgotPasswordPage;
