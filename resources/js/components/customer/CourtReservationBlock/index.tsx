import { Button, Field, GridItem, Heading, HStack, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuArrowRight, LuSun } from 'react-icons/lu';
import useCustomer from '../../../lib/hooks/useCustomer';
import type CourtSlot from '../../../models/shared/CourtSlot';
import type Photo from '../../../models/shared/Photo';
import ImageCarousel from '../../shared/ImageCarousel';

import { Tooltip } from '../../ui/Tooltip';
import CourtSlotSection from './CourtSlotSection';
export interface CourtReservationBlockProps {
    facilityId: string;
    courtId: string;
    name: string;
    photos: Photo[];
    slots: CourtSlot[];
}

function CourtReservationBlock({ facilityId, courtId, name, photos, slots }: CourtReservationBlockProps) {
    const { isLoggedIn } = useCustomer();
    const today = dayjs().format('YYYY-MM-DD');

    const form = useForm<{ date: string; slots: string[] }>({
        date: today,
        slots: [],
    });

    const canBook = form.data.slots.length > 0 && form.data.date;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(`/facilities/${facilityId}/courts/${courtId}/reserve`);
    };

    return (
        <SimpleGrid columns={{ base: 1, lg: 6 }} gap={8}>
            <GridItem width="full" colSpan={{ base: 1, lg: 2 }}>
                <ImageCarousel photos={photos} />
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 4 }}>
                <Heading fontWeight="bold">{name}</Heading>
                <HStack marginBottom={4}>
                    <LuSun />
                    <Text>Outdoor Court</Text>
                </HStack>
                <form onSubmit={handleSubmit}>
                    <Field.Root marginBottom={8} maxW={{ base: 'full', md: 'sm' }} invalid={!!form.errors.date}>
                        <Field.Label htmlFor="date" as="text">
                            Date:
                        </Field.Label>
                        <Input
                            type="date"
                            name="date"
                            value={form.data.date}
                            onChange={(e) => form.setData('date', e.target.value)}
                            min={today}
                            required
                        />
                        <Field.HelperText>Select a date to view available courts.</Field.HelperText>
                        <Field.ErrorText>{form.errors.date}</Field.ErrorText>
                    </Field.Root>
                    <Text marginBottom={2}>Select time slots:</Text>
                    <Field.Root marginBottom={4} invalid={!!form.errors.slots}>
                        <Field.ErrorText>{form.errors.slots}</Field.ErrorText>
                    </Field.Root>
                    <SimpleGrid columns={{ base: 2, md: 4, lg: 3, xl: 4 }} gap={4}>
                        {slots.map((slot) => (
                            <CourtSlotSection
                                form={form}
                                key={`${courtId}-${slot.startTime}-${slot.endTime}`}
                                courtId={courtId}
                                startTime={slot.startTime}
                                endTime={slot.endTime}
                                price={slot.price}
                                isAvailable={slot.isAvailable}
                            />
                        ))}
                    </SimpleGrid>
                    {canBook && (
                        <VStack alignItems="flex-end" gap={1}>
                            <Tooltip content="You must be logged in to reserve slots" disabled={isLoggedIn} openDelay={50}>
                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    marginTop={4}
                                    disabled={form.processing || !isLoggedIn}
                                    loading={form.processing}
                                >
                                    Reserve Slots
                                    <LuArrowRight />
                                </Button>
                            </Tooltip>
                            <Text fontSize="xs" color="gray.500">
                                Proceed to book {name}
                            </Text>
                        </VStack>
                    )}
                </form>
            </GridItem>
        </SimpleGrid>
    );
}

export default CourtReservationBlock;
