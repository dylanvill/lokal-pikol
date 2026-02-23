import { Badge, Card, CheckboxCard, CheckboxGroup, Field, Fieldset, HStack, Input, NativeSelect, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import courtTypeIconParser from '../../helpers/courtTypeIconParser';
import courtTypeLabelParser from '../../helpers/courtTypeLabelParser';
import CreateBlockBooking from '../../models/facility/CreateBlockBooking';
import { usePage } from '@inertiajs/react';
import militaryTimeToAmPmTime from '../../helpers/militaryTimeToAmPmTime';

interface CourtBlockBookingFormProps extends PageProps {
    court: CreateBlockBooking;
}

function CourtBlockBookingForm() {
    const { props } = usePage<CourtBlockBookingFormProps>();
    const court = props.court;

    const Icon = courtTypeIconParser(court.covered); // Example usage, replace with actual court type data
    const courtTypeLabel = courtTypeLabelParser(court.covered); // Example usage, replace with actual court type data

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
                <form>
                    <VStack alignItems="stretch" gap={4}>
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input placeholder="Enter block booking name" />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Schedule</Field.Label>
                            <NativeSelect.Root>
                                <NativeSelect.Field>
                                    <option value="1">Every Monday</option>
                                    <option value="2">Every Tuesday</option>
                                    <option value="3">Every Wednesday</option>
                                    <option value="4">Every Thursday</option>
                                    <option value="5">Every Friday</option>
                                    <option value="6">Every Saturday</option>
                                    <option value="0">Every Sunday</option>
                                </NativeSelect.Field>
                            </NativeSelect.Root>
                        </Field.Root>
                        <Fieldset.Root>
                            <Field.Root>
                                <Field.Label>Time Slots</Field.Label>
                            </Field.Root>
                            <CheckboxGroup name="slots">
                                <SimpleGrid columns={3} gap={2}>
                                    {court.blockBookings.map((slot) => (
                                        <CheckboxCard.Root
                                            key={slot.startTime}
                                            value={`${slot.startTime}-${slot.endTime}`}
                                            disabled={!slot.isAvailable}
                                            colorPalette="green"
                                            {...(!slot.isAvailable && { pointerEvents: 'none', backgroundColor: 'red.200' })}
                                        >
                                            <CheckboxCard.HiddenInput />
                                            <CheckboxCard.Control>
                                                <CheckboxCard.Content>
                                                    <CheckboxCard.Label>{`${militaryTimeToAmPmTime(slot.startTime)} - ${militaryTimeToAmPmTime(slot.endTime)}`}</CheckboxCard.Label>
                                                </CheckboxCard.Content>
                                            </CheckboxCard.Control>
                                            <CheckboxCard.Addon>
                                                {slot.isAvailable ? (
                                                    <Badge colorPalette="green">Available</Badge>
                                                ) : (
                                                    <Badge colorPalette="red">{slot.name}</Badge>
                                                )}
                                            </CheckboxCard.Addon>
                                        </CheckboxCard.Root>
                                    ))}
                                </SimpleGrid>
                            </CheckboxGroup>
                        </Fieldset.Root>
                    </VStack>
                </form>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card.Root>
    );
}

export default CourtBlockBookingForm;
