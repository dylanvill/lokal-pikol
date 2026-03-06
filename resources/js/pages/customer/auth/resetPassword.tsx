import { Box, Field, Heading, Text, Input, Button, Flex, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { reset } from '@/actions/App/Http/Customer/Auth/Controllers/ResetPasswordController';
import BackNavigationBase from '../../../components/shared/BackNavigationBase';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

function ForgotPasswordPage({ token, email }: { token: string; email: string }) {
    const { submit, data, setData, processing, errors } = useForm({
        email: email,
        password: '',
        password_confirmation: '',
        token: token,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(reset());
    };

    const canSubmit = data.email && data.password && data.password_confirmation;

    return (
        <DefaultPageLayout
            title="Reset Password"
            contentContainerProps={{
                maxWidth: 'lg',
            }}
        >
            <BackNavigationBase href="/login" label="Back to login" />
            <Box marginBottom={8}>
                <Heading>Reset password</Heading>
                <Text>Create a new password for your account</Text>
            </Box>
            <form onSubmit={handleSubmit}>
                <VStack gap={4} alignItems="stretch">
                    <Field.Root invalid={!!errors.email}>
                        <Field.Label>Email</Field.Label>
                        <Input type="email" required placeholder="Enter your email address" value={data.email} onChange={() => null} readOnly />
                        <Field.ErrorText>{errors.email}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!errors.password}>
                        <Field.Label>Password</Field.Label>
                        <Input
                            type="password"
                            required
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                        />
                        <Field.ErrorText>{errors.password}</Field.ErrorText>
                        <Field.HelperText>
                            Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
                        </Field.HelperText>
                    </Field.Root>
                    <Field.Root invalid={!!errors.password_confirmation}>
                        <Field.Label>Confirm Password</Field.Label>
                        <Input
                            type="password"
                            required
                            placeholder="Confirm your password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                        />
                        <Field.ErrorText>{errors.password_confirmation}</Field.ErrorText>
                    </Field.Root>
                    <Flex justifyContent="flex-end" mt={4}>
                        <Button type="submit" size="md" loading={processing} disabled={processing || !canSubmit}>
                            Reset Password
                        </Button>
                    </Flex>
                </VStack>
            </form>
        </DefaultPageLayout>
    );
}

export default ForgotPasswordPage;
