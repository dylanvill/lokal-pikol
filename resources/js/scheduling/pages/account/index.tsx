import { Box, Button, Card, Field, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useForm, usePage } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Scheduling/Account/Controllers/ChangePasswordController';
import { toaster } from '../../../shared/components/ui/toaster';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type SchedulingPageProps from '../../types/SchedulingPageProps';

export default function AccountPage() {
    const { facilityAdmin, facility } = usePage<SchedulingPageProps>().props;

    const form = useForm({
        currentPassword: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(store().url, {
            preserveScroll: true,
            onSuccess: (page) => {
                const message = page.flash?.['account-changes-saved'];
                if (typeof message === 'string') {
                    toaster.create({ title: message, type: 'success', duration: 4000 });
                }
                form.reset();
            },
        });
    };

    return (
        <SchedulingLayout title="Account">
            <Stack gap={6} maxW="xl">
                <Card.Root>
                    <Card.Header>
                        <Heading size="sm">Your account</Heading>
                    </Card.Header>
                    <Card.Body>
                        <Stack gap={3}>
                            <Box>
                                <Text fontSize="xs" color="gray.500" fontWeight="medium" textTransform="uppercase" letterSpacing="wide">
                                    Facility
                                </Text>
                                <Text fontWeight="medium">{facility.name}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="xs" color="gray.500" fontWeight="medium" textTransform="uppercase" letterSpacing="wide">
                                    Name
                                </Text>
                                <Text>{facilityAdmin.firstName} {facilityAdmin.lastName}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="xs" color="gray.500" fontWeight="medium" textTransform="uppercase" letterSpacing="wide">
                                    Email
                                </Text>
                                <Text>{facilityAdmin.email}</Text>
                            </Box>
                        </Stack>
                    </Card.Body>
                </Card.Root>

                <Card.Root>
                    <Card.Header>
                        <Heading size="sm">Change password</Heading>
                    </Card.Header>
                    <form onSubmit={handleSubmit}>
                        <Card.Body>
                            <Stack gap={4}>
                                <Field.Root invalid={!!form.errors.currentPassword}>
                                    <Field.Label>Current password</Field.Label>
                                    <Input
                                        type="password"
                                        name="currentPassword"
                                        value={form.data.currentPassword}
                                        onChange={(e) => form.setData('currentPassword', e.target.value)}
                                    />
                                    {form.errors.currentPassword && (
                                        <Field.ErrorText>{form.errors.currentPassword}</Field.ErrorText>
                                    )}
                                </Field.Root>
                                <Field.Root invalid={!!form.errors.password}>
                                    <Field.Label>New password</Field.Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={form.data.password}
                                        onChange={(e) => form.setData('password', e.target.value)}
                                    />
                                    {form.errors.password && (
                                        <Field.ErrorText>{form.errors.password}</Field.ErrorText>
                                    )}
                                </Field.Root>
                                <Field.Root invalid={!!form.errors.password_confirmation}>
                                    <Field.Label>Confirm new password</Field.Label>
                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        value={form.data.password_confirmation}
                                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                                    />
                                    {form.errors.password_confirmation && (
                                        <Field.ErrorText>{form.errors.password_confirmation}</Field.ErrorText>
                                    )}
                                </Field.Root>
                            </Stack>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                type="submit"
                                colorPalette="blue"
                                loading={form.processing}
                                disabled={form.processing || !form.isDirty}
                            >
                                Update password
                            </Button>
                        </Card.Footer>
                    </form>
                </Card.Root>
            </Stack>
        </SchedulingLayout>
    );
}
