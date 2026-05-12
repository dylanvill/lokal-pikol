import { Box, Button, Card, Center, Container, Field, Image, Input, Text, VStack } from '@chakra-ui/react';
import { Head, useForm } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Scheduling/Auth/Controllers/SendPasswordResetLinkController';
import Logo from '../../../../images/logo/lokal-pikol-primary.svg';

interface Props {
    status?: string;
}

export default function ForgotPasswordPage({ status }: Props) {
    const form = useForm({
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(store().url, {
            onSuccess: () => form.reset(),
        });
    };

    return (
        <>
            <Head title="Forgot Password" />
            <Container fluid backgroundColor="gray.50">
                <Center width="full" height="100vh">
                    <Box width="md">
                        <form onSubmit={handleSubmit}>
                            <Card.Root>
                                <Card.Header>
                                    <VStack align="center" gap={3} py={2}>
                                        <Image src={Logo} alt="Lokal Pikol" maxH={20} />
                                        <Text fontSize="sm" color="gray.500" textAlign="center">
                                            Enter your email and we'll send you a link to reset your password.
                                        </Text>
                                    </VStack>
                                </Card.Header>
                                <Card.Body>
                                    <VStack align="stretch" gap={4}>
                                        {status && (
                                            <Text fontSize="sm" color="green.600" textAlign="center">
                                                {status}
                                            </Text>
                                        )}
                                        <Field.Root invalid={!!form.errors.email}>
                                            <Field.Label>Email</Field.Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                required
                                                value={form.data.email}
                                                onChange={(e) => form.setData('email', e.target.value)}
                                            />
                                            {form.errors.email && (
                                                <Field.ErrorText>{form.errors.email}</Field.ErrorText>
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
                                        Send reset link
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
