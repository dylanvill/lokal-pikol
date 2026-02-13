import { Button, Field, GridItem, Heading, HStack, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuArrowRight, LuSun } from 'react-icons/lu';
import type CourtSlot from '../../../models/customer/court/CourtSlot';
import type Photo from '../../../models/shared/Photo';
import CourtSlotSection from './CourtSlotSection';
import ImageCarousel from './ImageCarousel';

export interface CourtReservationBlockProps {
    facilityId: string;
    courtId: string;
    name: string;
    photos: Photo[];
    slots: CourtSlot[];
}

function CourtReservationBlock({ facilityId, courtId, name, photos, slots }: CourtReservationBlockProps) {
    const today = dayjs().format('YYYY-MM-DD');
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
                <Form action={`/facilities/${facilityId}/courts/${courtId}/reserve`} method="post">
                    {({ submit, clearErrors }) => (
                        <>
                            <Field.Root marginBottom={8} maxW={{ base: 'full', md: 'sm' }}>
                                <Field.Label htmlFor="date" as="text">
                                    Date:
                                </Field.Label>
                                <Input type="date" name="date" defaultValue={today} min={today} />
                                <Field.HelperText>Select a date to view available courts.</Field.HelperText>
                            </Field.Root>
                            <Text marginBottom={2}>Select time slots:</Text>
                            <SimpleGrid columns={{ base: 2, md: 4, lg: 3, xl: 4 }} gap={4}>
                                {slots.map((slot) => (
                                    <CourtSlotSection
                                        key={`${courtId}-${slot.startTime}-${slot.endTime}`}
                                        courtId={courtId}
                                        label={`${slot.startTime} - ${slot.endTime}`}
                                        startTime={slot.startTime}
                                        endTime={slot.endTime}
                                        price={slot.price}
                                        onSlotSelected={() => {}}
                                        onSlotDeselected={() => {}}
                                    />
                                ))}
                            </SimpleGrid>
                            <Button
                                type="submit"
                                onClick={() => {
                                    submit();
                                    clearErrors();
                                }}
                                colorScheme="blue"
                                marginTop={4}
                            >
                                Reserve
                                <LuArrowRight />
                            </Button>
                        </>
                    )}
                </Form>
            </GridItem>
        </SimpleGrid>
    );
}

export default CourtReservationBlock;
