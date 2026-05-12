import { Box, Button, Card, Center, Container, Field, Image, Input, Text, VStack } from '@chakra-ui/react';
import { Head, useForm } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Scheduling/Auth/Controllers/StoreRegistrationController';
import Logo from '../../../../images/logo/lokal-pikol-primary.svg';

type Props = {
    email: string;
    token: string;
    listingName: string;
};

export default function RegisterPage({ email, token, listingName }: Props) {
    const form = useForm({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(store({ token }).url);
    };

    return (
        <>
            <Head title="Set Up Your Account" />
            <Container fluid backgroundColor="gray.50">
                <Center width="full" height="100vh">
                    <Box width="md">
                        <form onSubmit={handleSubmit}>
                            <Card.Root>
                                <Card.Header>
                                    <VStack align="center" gap={3} py={2}>
                                        <Image src={Logo} alt="Lokal Pikol" maxH={20} />
                                        <Text fontWeight="semibold" fontSize="md" textAlign="center">
                                            Register an admin account for {listingName}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500" textAlign="center">
                                            You'll be able to update your directory listing and manage court scheduling and availability.
                                        </Text>
                                    </VStack>
                                </Card.Header>
                                <Card.Body>
                                    <VStack align="stretch" gap={4}>
                                        <Field.Root>
                                            <Field.Label>Email</Field.Label>
                                            <Input
                                                type="email"
                                                value={email}
                                                readOnly
                                                variant="subtle"
                                            />
                                        </Field.Root>
                                        <Field.Root invalid={!!form.errors.firstName}>
                                            <Field.Label>First name</Field.Label>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                required
                                                value={form.data.firstName}
                                                onChange={(e) => form.setData('firstName', e.target.value)}
                                            />
                                            {form.errors.firstName && (
                                                <Field.ErrorText>{form.errors.firstName}</Field.ErrorText>
                                            )}
                                        </Field.Root>
                                        <Field.Root invalid={!!form.errors.lastName}>
                                            <Field.Label>Last name</Field.Label>
                                            <Input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={form.data.lastName}
                                                onChange={(e) => form.setData('lastName', e.target.value)}
                                            />
                                            {form.errors.lastName && (
                                                <Field.ErrorText>{form.errors.lastName}</Field.ErrorText>
                                            )}
                                        </Field.Root>
                                        <Field.Root invalid={!!form.errors.phoneNumber}>
                                            <Field.Label>Phone number</Field.Label>
                                            <Input
                                                type="text"
                                                name="phoneNumber"
                                                required
                                                value={form.data.phoneNumber}
                                                onChange={(e) => form.setData('phoneNumber', e.target.value)}
                                            />
                                            {form.errors.phoneNumber && (
                                                <Field.ErrorText>{form.errors.phoneNumber}</Field.ErrorText>
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
                                        Set up account
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
