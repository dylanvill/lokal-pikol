import { Box, Button, Container, Field, Heading, Input, InputGroup, Stack, Text } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import { LuArrowRight } from 'react-icons/lu';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

export default function SignUpPage() {
    return (
        <DefaultPageLayout
            title="Create an account"
            contentContainerProps={{
                maxWidth: 'md',
            }}
        >
            <Container px={4} py={8} colorPalette="blue">
                <Box marginBottom={8}>
                    <Heading>Join Lokal Pikol</Heading>
                    <Text>Create your account and start booking courts in your area.</Text>
                </Box>
                <Form action="/sign-up" method="post" resetOnSuccess>
                    {({ errors, processing, clearErrors, submit }) => (
                        <Stack gap={4}>
                            <Field.Root invalid={!!errors.firstName}>
                                <Field.Label>First Name</Field.Label>
                                <Input placeholder="Juan" name="firstName" required />
                                <Field.ErrorText>{errors.firstName}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!errors.lastName}>
                                <Field.Label>Last Name</Field.Label>
                                <Input placeholder="dela Cruz" name="lastName" required />
                                <Field.ErrorText>{errors.lastName}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!errors.phone}>
                                <Field.Label>Phone Number</Field.Label>
                                <InputGroup startElement="+63">
                                    <Input type="tel" placeholder="912 345 6789" name="phone" required />
                                </InputGroup>
                                <Field.ErrorText>{errors.phone}</Field.ErrorText>
                            </Field.Root>

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

                            <Field.Root invalid={!!errors.password_confirmation}>
                                <Field.Label>Confirm Password</Field.Label>
                                <Input type="password" placeholder="Confirm your password" name="password_confirmation" required />
                                <Field.ErrorText>{errors.password_confirmation}</Field.ErrorText>
                            </Field.Root>

                            <Button
                                type="button"
                                onClick={() => {
                                    clearErrors();
                                    submit();
                                }}
                                colorScheme="blue"
                                size="lg"
                                mt={4}
                                alignSelf="flex-end"
                                loading={processing}
                                disabled={processing}
                            >
                                Create Account
                                <LuArrowRight />
                            </Button>
                        </Stack>
                    )}
                </Form>
            </Container>
        </DefaultPageLayout>
    );
}
