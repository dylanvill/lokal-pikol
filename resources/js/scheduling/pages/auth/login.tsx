import { Box, Button, Card, Center, Container, Field, Input } from '@chakra-ui/react';
import { Head, useForm } from '@inertiajs/react';
import { login } from '@/actions/App/Http/Scheduling/Auth/Controllers/LoginController';

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
                                    <Card.Title>Login</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Field.Root>
                                        <Field.Label>Email</Field.Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            required
                                            value={form.data.email}
                                            onChange={(e) => form.setData('email', e.target.value)}
                                        />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>Password</Field.Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            required
                                            value={form.data.password}
                                            onChange={(e) => form.setData('password', e.target.value)}
                                        />
                                    </Field.Root>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type="submit">Login</Button>
                                </Card.Footer>
                            </Card.Root>
                        </form>
                    </Box>
                </Center>
            </Container>
        </>
    );
}
