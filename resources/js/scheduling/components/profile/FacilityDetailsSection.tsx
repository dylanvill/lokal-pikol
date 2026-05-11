import { Box, Button, Field, Flex, Heading, Input, InputGroup, Stack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import UpdateFacilityDetailsController from '@/actions/App/Http/Scheduling/Profile/Controllers/UpdateFacilityDetailsController';
import { toaster } from '../../../shared/components/ui/toaster';
import { PROFILE_SUCCESS_MESSAGE_KEY } from './constants';
import FacilityCourtTypeRadioCard from './FacilityCourtTypeRadioCard';
import FacilityNumberOfCourtsRadioCard from './FacilityNumberOfCourtsRadioCard';

interface FacilityDetailsSectionProps {
    initial: {
        name: string;
        courtType: string | null;
        numberOfCourts: number | null;
        email: string | null;
        phone: string | null;
        googleMapsUrl: string | null;
        bookingUrl: string | null;
    };
}

function FacilityDetailsSection({ initial }: FacilityDetailsSectionProps) {
    const form = useForm({
        name: initial.name ?? '',
        courtType: initial.courtType ?? '',
        numberOfCourts: initial.numberOfCourts ? initial.numberOfCourts.toString() : '',
        email: initial.email ?? '',
        phone: initial.phone ?? '',
        googleMapsUrl: initial.googleMapsUrl ?? '',
        bookingUrl: initial.bookingUrl ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.patch(UpdateFacilityDetailsController.update.url(), {
            preserveScroll: true,
            onSuccess: (page) => {
                const message = page.flash?.[PROFILE_SUCCESS_MESSAGE_KEY];
                if (typeof message === 'string') {
                    toaster.create({ title: message, type: 'success', duration: 4000 });
                }
            },
        });
    };

    return (
        <Box as="section" borderWidth={1} borderRadius={8} bg="white" padding={6}>
            <Heading size="md" marginBottom={4}>Listing details</Heading>
            <form onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Field.Root invalid={!!form.errors.name}>
                        <Field.Label>
                            <span style={{ color: 'red' }}>*</span>Facility name
                        </Field.Label>
                        <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} disabled={form.processing} />
                        <Field.ErrorText>{form.errors.name}</Field.ErrorText>
                    </Field.Root>

                    <FacilityNumberOfCourtsRadioCard
                        value={form.data.numberOfCourts}
                        onChange={(value) => form.setData('numberOfCourts', value)}
                        disabled={form.processing}
                        invalid={!!form.errors.numberOfCourts}
                    />
                    {form.errors.numberOfCourts && (
                        <Field.Root invalid>
                            <Field.ErrorText>{form.errors.numberOfCourts}</Field.ErrorText>
                        </Field.Root>
                    )}

                    <FacilityCourtTypeRadioCard
                        value={form.data.courtType}
                        onChange={(value) => form.setData('courtType', value)}
                        disabled={form.processing}
                        invalid={!!form.errors.courtType}
                    />
                    {form.errors.courtType && (
                        <Field.Root invalid>
                            <Field.ErrorText>{form.errors.courtType}</Field.ErrorText>
                        </Field.Root>
                    )}

                    <Field.Root invalid={!!form.errors.email}>
                        <Field.Label>Public contact email</Field.Label>
                        <Input
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            disabled={form.processing}
                            placeholder="you@example.com"
                        />
                        <Field.HelperText>Shown on your listing for players to reach you. This is not your login email.</Field.HelperText>
                        <Field.ErrorText>{form.errors.email}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!form.errors.phone}>
                        <Field.Label>Phone</Field.Label>
                        <InputGroup startElement="+63">
                            <Input
                                type="tel"
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.target.value)}
                                disabled={form.processing}
                                placeholder="916 123 4567"
                            />
                        </InputGroup>
                        <Field.ErrorText>{form.errors.phone}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!form.errors.googleMapsUrl}>
                        <Field.Label>Google Maps URL</Field.Label>
                        <Input
                            value={form.data.googleMapsUrl}
                            onChange={(e) => form.setData('googleMapsUrl', e.target.value)}
                            disabled={form.processing}
                            placeholder="https://www.google.com/maps/place/Your+Facility"
                        />
                        <Field.ErrorText>{form.errors.googleMapsUrl}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!form.errors.bookingUrl}>
                        <Field.Label>Booking URL</Field.Label>
                        <Input
                            value={form.data.bookingUrl}
                            onChange={(e) => form.setData('bookingUrl', e.target.value)}
                            disabled={form.processing}
                            placeholder="https://www.custom-booking.com"
                        />
                        <Field.HelperText>
                            The website where your players can reserve your courts. You can put your Facebook page URL if you use Facebook for bookings, otherwise leave this blank.
                        </Field.HelperText>
                        <Field.ErrorText>{form.errors.bookingUrl}</Field.ErrorText>
                    </Field.Root>
                </Stack>

                <Flex justifyContent="flex-end" marginTop={6}>
                    <Button type="submit" colorPalette="blue" disabled={form.processing || !form.isDirty} loading={form.processing}>
                        Save
                    </Button>
                </Flex>
            </form>
        </Box>
    );
}

export default FacilityDetailsSection;
