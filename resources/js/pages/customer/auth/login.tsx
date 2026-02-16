import { Box, Button, Container, Field, Heading, Input, Stack, Text, Image, HStack } from '@chakra-ui/react';
import { Form, Link, router } from '@inertiajs/react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import Logo from '../../../../images/logo/lokal-pikol-horizontal-primary.svg';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

export default function LoginPage() {
    return (
        <DefaultPageLayout
            title="Login"
            contentContainerProps={{
                maxWidth: 'md',
            }}
        >
            <Container px={4} py={8} colorPalette="blue">
                <Box marginBottom={8}>
                    <Link
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            router.visit(window.history.back()!);
                        }}
                    >
                        <HStack gap={1}>
                            <LuArrowLeft size={16} />
                            <Text fontSize="sm">Back</Text>
                        </HStack>
                    </Link>
                </Box>
                <Image src={Logo} alt="Lokal Pikol" mb={8} mx="auto" maxHeight={48} />
                <Box marginBottom={8}>
                    <Heading>Login</Heading>
                    <Text>Sign in to your account to start managing your cort bookings.</Text>
                </Box>
                <Form action="/login" method="post" resetOnSuccess>
                    {({ errors, processing, clearErrors, submit }) => (
                        <Stack gap={4}>
                            <Field.Root invalid={!!errors.email}>
                                <Field.Label>Email</Field.Label>
                                <Input type="email" placeholder="juan@example.com" name="email" required />
                                <Field.ErrorText>{errors.email}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!errors.password}>
                                <Field.Label>Password</Field.Label>
                                <Input type="password" placeholder="Enter your password" name="password" required />
                                <Field.ErrorText>{errors.password}</Field.ErrorText>
                            </Field.Root>

                            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                <Link href="/forgot-password" color="blue.500">
                                    <Text>Forgot password?</Text>
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                onClick={() => {
                                    clearErrors();
                                    submit();
                                }}
                                colorScheme="blue"
                                mt={4}
                                alignSelf="flex-end"
                                loading={processing}
                                disabled={processing}
                            >
                                Sign In
                                <LuArrowRight />
                            </Button>
                        </Stack>
                    )}
                </Form>
            </Container>
        </DefaultPageLayout>
    );
}
