import { Box, Button, Card, Center, Container, Field, Image, Input, Text, VStack } from '@chakra-ui/react';
import { Head, useForm } from '@inertiajs/react';
import { login } from '@/actions/App/Http/Scheduling/Auth/Controllers/LoginController';
import Logo from '../../../../images/logo/lokal-pikol-primary.svg';

export default function LoginPage() {
    const form = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(login().url);
    };

    return (
        <>
            <Head title="Login" />
            <Container fluid backgroundColor="gray.50">
                <Center width="full" height="100vh">
                    <Box width="md">
                        <form onSubmit={handleSubmit}>
                            <Card.Root>
                                <Card.Header>
                                    <VStack align="center" gap={3} py={2}>
                                        <Image src={Logo} alt="Lokal Pikol" maxH={20} />
                                        <Text fontSize="sm" color="gray.500" textAlign="center">
                                            Sign in to manage your courts, reservations, and availability
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
                                                required
                                                value={form.data.email}
                                                onChange={(e) => form.setData('email', e.target.value)}
                                            />
                                            {form.errors.email && (
                                                <Field.ErrorText>{form.errors.email}</Field.ErrorText>
                                            )}
                                        </Field.Root>
                                        <Field.Root invalid={!!form.errors.password}>
                                            <Field.Label>Password</Field.Label>
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
                                    </VStack>
                                </Card.Body>
                                <Card.Footer>
                                    <Button
                                        type="submit"
                                        colorPalette="blue"
                                        width="full"
                                        loading={form.processing}
                                    >
                                        Sign in
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
