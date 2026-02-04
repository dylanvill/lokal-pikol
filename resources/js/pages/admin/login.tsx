import { Field, Box, Button, Card, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';

function Login() {
    return (
        <Box minHeight="100vh" colorPalette="blue" display="flex" alignItems="center" justifyContent="center" bg="gray.100" p={4}>
            <Card.Root maxWidth="md" width="full" borderRadius={8}>
                <Card.Header>
                    <Heading size="lg" textAlign="center">
                        Admin Login
                    </Heading>
                    <Text color="gray.600" textAlign="center">
                        Sign in to your account
                    </Text>
                </Card.Header>

                <Card.Body>
                    <Form method="post" action="/admin/auth/login">
                        {({ processing, errors }) => (
                            <Stack gap={4}>
                                <Field.Root invalid={!!errors.email}>
                                    <Field.Label>Email</Field.Label>
                                    <Input type="email" name="email" placeholder="Enter your email" required />
                                    {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
                                </Field.Root>

                                <Field.Root invalid={!!errors.password}>
                                    <Field.Label>Password</Field.Label>
                                    <Input type="password" name="password" placeholder="Enter your password" required />
                                    {errors.password && <Field.ErrorText>{errors.password}</Field.ErrorText>}
                                </Field.Root>

                                {errors.general && (
                                    <Text color="red.500" fontSize="sm">
                                        {errors.general}
                                    </Text>
                                )}

                                <Button type="submit" colorScheme="blue" width="full" disabled={processing} loading={processing} mt={2}>
                                    Sign In
                                </Button>
                            </Stack>
                        )}
                    </Form>
                </Card.Body>
            </Card.Root>
        </Box>
    );
}

export default Login;
