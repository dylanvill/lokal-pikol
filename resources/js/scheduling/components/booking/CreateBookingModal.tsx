import { Button, CheckboxCard, Dialog, Field, Input, Portal, RadioCard, SimpleGrid, Text } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';

interface Court {
    id: number;
    name: string;
}

interface CreateBookingModalProps {
    court?: Court;
    courts?: Court[];
}

interface TimeSlot {
    value: string;
    label: string;
}

const TIME_SLOTS: TimeSlot[] = [
    { value: '07:00', label: '7:00 AM' },
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '21:00', label: '9:00 PM' },
    { value: '22:00', label: '10:00 PM' },
    { value: '23:00', label: '11:00 PM' },
    { value: '00:00', label: '12:00 AM' },
];

function CreateBookingModal({ court, courts }: CreateBookingModalProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, processing, errors, reset } = useForm({
        court_id: court ? court.id.toString() : '',
        date: '',
        time_slots: [] as string[],
        booking_name: '',
    });

    function toggleSlot(value: string) {
        const next = data.time_slots.includes(value)
            ? data.time_slots.filter((s) => s !== value)
            : [...data.time_slots, value];
        setData('time_slots', next);
    }

    function handleSubmit() {
        // TODO: wire up once the store controller is ready
        // post(BookingStoreController.url(), {
        //     onSuccess: () => { reset(); setOpen(false); },
        // });
    }

    function handleOpenChange(next: boolean) {
        if (!next) reset();
        setOpen(next);
    }

    const isValid =
        data.booking_name.trim() && data.date && data.time_slots.length > 0 && data.court_id;

    return (
        <Dialog.Root open={open} onOpenChange={(e) => handleOpenChange(e.open)}>
            <Dialog.Trigger asChild>
                {court ? (
                    <Button colorPalette="blue" size="sm" flex="1">
                        <LuPlus />
                        Create booking
                    </Button>
                ) : (
                    <Button colorPalette="blue" size="sm">
                        <LuPlus />
                        New booking
                    </Button>
                )}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content maxH="90vh" display="flex" flexDirection="column">
                        <Dialog.Header>
                            <Dialog.Title>Create booking</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body display="flex" flexDirection="column" gap={4} overflowY="auto">
                            {court ? (
                                <Field.Root>
                                    <Field.Label>Court</Field.Label>
                                    <Text fontSize="sm" fontWeight="medium" color="gray.700" px={1}>
                                        {court.name}
                                    </Text>
                                </Field.Root>
                            ) : (
                                <RadioCard.Root
                                    name="court_id"
                                    value={data.court_id}
                                    onValueChange={(e) => setData('court_id', e.value ?? '')}
                                    invalid={!!errors.court_id}
                                >
                                    <RadioCard.Label>Court</RadioCard.Label>
                                    <Field.Root invalid={!!errors.court_id}>
                                        <Field.ErrorText>{errors.court_id}</Field.ErrorText>
                                    </Field.Root>
                                    <SimpleGrid columns={{ base: 2 }} gap={2}>
                                        {(courts ?? []).map((c) => (
                                            <RadioCard.Item key={c.id} value={c.id.toString()} borderRadius={8}>
                                                <RadioCard.ItemHiddenInput />
                                                <RadioCard.ItemControl>
                                                    <RadioCard.ItemText fontSize="sm">
                                                        {c.name}
                                                    </RadioCard.ItemText>
                                                </RadioCard.ItemControl>
                                            </RadioCard.Item>
                                        ))}
                                    </SimpleGrid>
                                </RadioCard.Root>
                            )}

                            <Field.Root invalid={!!errors.date}>
                                <Field.Label>Date</Field.Label>
                                <Input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                />
                                {errors.date && <Field.ErrorText>{errors.date}</Field.ErrorText>}
                            </Field.Root>

                            <Field.Root invalid={!!errors.time_slots}>
                                <Field.Label>Time slots</Field.Label>
                                <SimpleGrid columns={3} gap={2} w="full">
                                    {TIME_SLOTS.map((slot) => (
                                        <CheckboxCard.Root
                                            key={slot.value}
                                            value={slot.value}
                                            checked={data.time_slots.includes(slot.value)}
                                            onCheckedChange={() => toggleSlot(slot.value)}
                                            size="sm"
                                        >
                                            <CheckboxCard.HiddenInput />
                                            <CheckboxCard.Control borderRadius={6}>
                                                <CheckboxCard.Label fontSize="xs">
                                                    {slot.label}
                                                </CheckboxCard.Label>
                                            </CheckboxCard.Control>
                                        </CheckboxCard.Root>
                                    ))}
                                </SimpleGrid>
                                {errors.time_slots && <Field.ErrorText>{errors.time_slots}</Field.ErrorText>}
                            </Field.Root>

                            <Field.Root invalid={!!errors.booking_name}>
                                <Field.Label>Booking name</Field.Label>
                                <Input
                                    placeholder="e.g. Morning session"
                                    value={data.booking_name}
                                    onChange={(e) => setData('booking_name', e.target.value)}
                                />
                                {errors.booking_name && <Field.ErrorText>{errors.booking_name}</Field.ErrorText>}
                            </Field.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="blue"
                                disabled={!isValid || processing}
                                loading={processing}
                                onClick={handleSubmit}
                            >
                                Create booking
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger />
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default CreateBookingModal;
