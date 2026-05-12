import { Box, Button, Card, Center, Container, Field, Image, Input, Text, VStack } from '@chakra-ui/react';
import { Head, useForm } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Scheduling/Auth/Controllers/ResetPasswordController';
import Logo from '../../../../images/logo/lokal-pikol-primary.svg';

interface Props {
    token: string;
    email: string;
}

export default function ResetPasswordPage({ token, email }: Props) {
    const form = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(store().url, {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset Password" />
            <Container fluid backgroundColor="gray.50">
                <Center width="full" height="100vh">
                    <Box width="md">
                        <form onSubmit={handleSubmit}>
                            <Card.Root>
                                <Card.Header>
                                    <VStack align="center" gap={3} py={2}>
                                        <Image src={Logo} alt="Lokal Pikol" maxH={20} />
                                        <Text fontSize="sm" color="gray.500" textAlign="center">
                                            Choose a new password for your account.
                                        </Text>
                                    </VStack>
                                </Card.Header>
                                <Card.Body>
                                    <VStack align="stretch" gap={4}>
                                        <Field.Root invalid={!!form.errors.email}>
                                            <Field.Label>Email</Field.Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                readOnly
                                                value={form.data.email}
                                            />
                                            {form.errors.email && (
                                                <Field.ErrorText>{form.errors.email}</Field.ErrorText>
                                            )}
                                        </Field.Root>
                                        <Field.Root invalid={!!form.errors.password}>
                                            <Field.Label>New password</Field.Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                required
                                                value={form.data.password}
                                                onChange={(e) => form.setData('password', e.target.value)}
                                            />
                                            {form.errors.password && (
                                                <Field.ErrorText>{form.errors.password}</Field.ErrorText>
                                            )}
                                        </Field.Root>
                                        <Field.Root invalid={!!form.errors.password_confirmation}>
                                            <Field.Label>Confirm password</Field.Label>
                                            <Input
                                                type="password"
                                                name="password_confirmation"
                                                required
                                                value={form.data.password_confirmation}
                                                onChange={(e) =>
                                                    form.setData('password_confirmation', e.target.value)
                                                }
                                            />
                                            {form.errors.password_confirmation && (
                                                <Field.ErrorText>
                                                    {form.errors.password_confirmation}
                                                </Field.ErrorText>
                                            )}
                                        </Field.Root>
                                    </VStack>
                                </Card.Body>
                                <Card.Footer>
                                    <Button
                                        type="submit"
                                        colorPalette="blue"
                                        width="full"
                                        loading={form.processing}
                                    >
                                        Reset password
                                    </Button>
                                </Card.Footer>
                            </Card.Root>
                        </form>
                    </Box>
                </Center>
            </Container>
        </>
    );
}
