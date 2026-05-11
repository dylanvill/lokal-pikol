import { Alert, Box, Button, Field, Flex, HStack, Heading, Input, List, Stack, Text } from '@chakra-ui/react';
import { useForm, usePage } from '@inertiajs/react';
import UpdateFacilityHoursController from '@/actions/App/Http/Scheduling/Profile/Controllers/UpdateFacilityHoursController';
import { toaster } from '../../../shared/components/ui/toaster';
import { PROFILE_SUCCESS_MESSAGE_KEY } from './constants';

interface HoursConflict {
    type: 'reservation' | 'block';
    name: string;
    courtName: string;
    when: string;
    timeRange: string;
}

interface FacilityHoursSectionProps {
    initial: {
        openingTime: string | null;
        closingTime: string | null;
    };
}

const HOURS_CONFLICTS_KEY = 'hours-conflicts';

function FacilityHoursSection({ initial }: FacilityHoursSectionProps) {
    const page = usePage();
    const conflicts = (page.flash?.[HOURS_CONFLICTS_KEY] as HoursConflict[] | undefined) ?? [];

    const form = useForm({
        openingTime: initial.openingTime ?? '',
        closingTime: initial.closingTime ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.patch(UpdateFacilityHoursController.update.url(), {
            preserveScroll: true,
            onSuccess: (response) => {
                const message = response.flash?.[PROFILE_SUCCESS_MESSAGE_KEY];
                if (typeof message === 'string') {
                    toaster.create({ title: message, type: 'success', duration: 4000 });
                }
            },
        });
    };

    const handleTimeChanged = (field: 'openingTime' | 'closingTime', value: string) => {
        const hour = value.split(':')[0];
        if (hour) {
            form.setData(field, `${hour}:00`);
        }
    };

    return (
        <Box as="section" borderWidth={1} borderRadius={8} bg="white" padding={6}>
            <Heading size="md" marginBottom={4}>Operating hours</Heading>

            {conflicts.length > 0 && (
                <Box marginBottom={4}>
                    <Alert.Root status="error">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title fontWeight="bold">These bookings would fall outside the new hours</Alert.Title>
                            <Alert.Description>
                                <Text fontSize="sm" marginBottom={2}>
                                    Please remove or adjust these before tightening your operating hours.
                                </Text>
                                <List.Root paddingLeft={4}>
                                    {conflicts.map((conflict, index) => (
                                        <List.Item key={`${conflict.type}-${index}`} fontSize="sm">
                                            <strong>{conflict.name}</strong> on {conflict.courtName} — {conflict.when}, {conflict.timeRange}
                                        </List.Item>
                                    ))}
                                </List.Root>
                            </Alert.Description>
                        </Alert.Content>
                    </Alert.Root>
                </Box>
            )}

            <form onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <HStack alignItems="flex-start">
                        <Field.Root invalid={!!form.errors.openingTime}>
                            <Field.Label>
                                <span style={{ color: 'red' }}>*</span>Opening time
                            </Field.Label>
                            <Input
                                type="time"
                                value={form.data.openingTime}
                                onChange={(e) => handleTimeChanged('openingTime', e.target.value)}
                                disabled={form.processing}
                            />
                            <Field.ErrorText>{form.errors.openingTime}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!form.errors.closingTime}>
                            <Field.Label>
                                <span style={{ color: 'red' }}>*</span>Closing time
                            </Field.Label>
                            <Input
                                type="time"
                                value={form.data.closingTime}
                                onChange={(e) => handleTimeChanged('closingTime', e.target.value)}
                                disabled={form.processing}
                            />
                            <Field.ErrorText>{form.errors.closingTime}</Field.ErrorText>
                        </Field.Root>
                    </HStack>
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

export default FacilityHoursSection;
