import { Box, Button, Card, Field, Flex, HStack, Input, NativeSelect, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import courtTypeIconParser from '../../../helpers/courtTypeIconParser';
import courtTypeLabelParser from '../../../helpers/courtTypeLabelParser';
import type CreateBlockBooking from '../../../models/facility/CreateBlockBooking';
import BlockBookingSlot from './BlockBookingSlot';

interface CourtBlockBookingFormProps extends PageProps {
    court: CreateBlockBooking;
}

function CourtBlockBookingForm() {
    const { props } = usePage<CourtBlockBookingFormProps>();
    const { data, setData, post, errors, clearErrors, reset, processing } = useForm({
        name: '',
        dayOfTheWeek: '',
        slots: [] as string[],
    });
    const court = props.court;

    const canSubmit = data.name.trim() !== '' && data.dayOfTheWeek !== '' && data.slots.length > 0;

    const Icon = courtTypeIconParser(court.covered); // Example usage, replace with actual court type data
    const courtTypeLabel = courtTypeLabelParser(court.covered); // Example usage, replace with actual court type data

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        post(`/facility/courts/block-bookings/${court.id}/create`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        if (data.dayOfTheWeek) {
            reset('slots');
            clearErrors('slots');
            router.get(
                `/facility/courts/block-bookings/${court.id}/create`,
                {
                    dayOfTheWeek: data.dayOfTheWeek,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }

        return () => {};
    }, [data.dayOfTheWeek]);

    return (
        <Card.Root>
            <Card.Header>
                <Card.Title>{court.name}</Card.Title>
                <HStack alignItems="center" gap={1}>
                    <Icon />
                    <Text>{courtTypeLabel}</Text>
                </HStack>
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <VStack alignItems="stretch" gap={8}>
                        <Field.Root invalid={!!errors.name}>
                            <Field.Label>Name</Field.Label>
                            <Input
                                placeholder="Enter block booking name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                maxLength={50}
                            />
                            <Field.ErrorText>{errors.name}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!errors.dayOfTheWeek}>
                            <Field.Label>Schedule</Field.Label>
                            <NativeSelect.Root invalid={!!errors.dayOfTheWeek}>
                                <NativeSelect.Field
                                    name="dayOfTheWeek"
                                    value={data.dayOfTheWeek}
                                    onChange={(e) => setData('dayOfTheWeek', e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>
                                        Select a day of the week
                                    </option>
                                    <option value="1">Every Monday</option>
                                    <option value="2">Every Tuesday</option>
                                    <option value="3">Every Wednesday</option>
                                    <option value="4">Every Thursday</option>
                                    <option value="5">Every Friday</option>
                                    <option value="6">Every Saturday</option>
                                    <option value="0">Every Sunday</option>
                                </NativeSelect.Field>
                            </NativeSelect.Root>
                            <Field.ErrorText>{errors.dayOfTheWeek}</Field.ErrorText>
                        </Field.Root>
                        {data.dayOfTheWeek && (
                            <Box>
                                <Field.Root marginBottom={1} invalid={!!errors.slots}>
                                    <Field.Label>Time Slots</Field.Label>
                                    <Field.ErrorText>{errors.slots}</Field.ErrorText>
                                </Field.Root>
                                <SimpleGrid columns={4} gap={2} width="full">
                                    {court.blockBookings.map((slot) => (
                                        <BlockBookingSlot
                                            key={`${slot.startTime}-${slot.endTime}`}
                                            slots={data.slots}
                                            setSlots={setData}
                                            startTime={slot.startTime}
                                            endTime={slot.endTime}
                                            disabled={!slot.isAvailable || processing}
                                            name={slot.name}
                                        />
                                    ))}
                                </SimpleGrid>
                            </Box>
                        )}
                        <Flex justifyContent="flex-end">
                            <Button type="submit" colorPalette="blue" disabled={!canSubmit || processing} loading={processing}>
                                Create Block Booking
                            </Button>
                        </Flex>
                    </VStack>
                </form>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card.Root>
    );
}

export default CourtBlockBookingForm;
