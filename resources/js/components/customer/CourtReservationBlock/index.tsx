import { Button, Field, GridItem, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import courtTypeIconParser from '../../../helpers/courtTypeIconParser';
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
    covered: boolean;
    photos: Photo[];
    slots: CourtSlot[];
    date: string;
}

function CourtReservationBlock({ facilityId, courtId, name, photos, slots, date, covered }: CourtReservationBlockProps) {
    const { isLoggedIn } = useCustomer();

    const form = useForm<{ slots: string[] }>({
        slots: [],
    });

    const dateDisplay = date ? dayjs(date).format('dddd, MMMM D, YYYY') : null;

    const canBook = form.data.slots.length > 0 && date;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.transform((data) => ({
            ...data,
            date: date,
        }));
        form.post(`/facilities/${facilityId}/courts/${courtId}/reserve`);
    };

    const Icon = courtTypeIconParser(covered);

    useEffect(() => {
        form.setData('slots', []);
    }, [date]);

    return (
        <SimpleGrid columns={{ base: 1, lg: 6 }} gap={8}>
            <GridItem width="full" colSpan={{ base: 1, lg: 2 }}>
                <ImageCarousel photos={photos} />
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 4 }}>
                <Heading fontWeight="bold">{name}</Heading>
                <HStack marginBottom={4} gap={1}>
                    <Icon color={covered ? 'green' : 'orange'} />
                    <Text>{covered ? 'Covered Court' : 'Outdoor Court'}</Text>
                </HStack>
                <form onSubmit={handleSubmit}>
                    <Text marginBottom={2}>
                        Select time slots for{' '}
                        <Text as="span" fontWeight="bold">
                            {dateDisplay}
                        </Text>
                        :
                    </Text>
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
