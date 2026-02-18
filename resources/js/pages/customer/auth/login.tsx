import { Box, Button, Container, Field, Heading, Input, Stack, Text, Image, HStack } from '@chakra-ui/react';
import { Form, Link, router } from '@inertiajs/react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import Logo from '../../../../images/logo/lokal-pikol-horizontal-primary.svg';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';
import typographyTokens from '../../../lib/tokens/typography';

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
                    <Text>Sign in to your account to start managing your court bookings.</Text>
                    <Text fontSize={typographyTokens.small.fontSize} fontStyle="italic" marginTop={2} color="gray.600">
                        Don't have an account?{' '}
                        <Link href="/sign-up">
                            <Text as="span" color="blue.500">
                                Sign up
                            </Text>
                        </Link>{' '}
                        now
                    </Text>
                </Box>
                <Form action="/login" method="post" resetOnSuccess>
                    {({ errors, processing, clearErrors, submit }) => (
                        <Stack gap={4}>
                            <Field.Root invalid={!!errors.email}>
                                <Field.Label>Email</Field.Label>
                                <Input type="email" placeholder="juan@example.com" name="email" required />
                                <Field.ErrorText>{errors.email}</Field.ErrorText>
                            </Field.Root>
                            <Box>
                                <Field.Root invalid={!!errors.password}>
                                    <Field.Label>Password</Field.Label>
                                    <Input type="password" placeholder="Enter your password" name="password" required />
                                    <Field.ErrorText>{errors.password}</Field.ErrorText>
                                    <Field.HelperText color="blue.500">
                                        <Link href="/forgot-password">Forgot password?</Link>
                                    </Field.HelperText>
                                </Field.Root>
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
