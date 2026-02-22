import { Button, Field, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuArrowRight } from 'react-icons/lu';
import courtTypeIconParser from '../../../../helpers/courtTypeIconParser';
import courtTypeLabelParser from '../../../../helpers/courtTypeLabelParser';
import type CourtSlot from '../../../../models/shared/CourtSlot';
import CourtSlotSection from '../../../customer/CourtReservationBlock/CourtSlotSection';
import SuccessAlert from '../../../shared/Alert/SuccessAlert';
import DetailWithIcon from '../../../shared/DetailWithIcon';

export interface ReservationBlockProps {
    courtId: string;
    courtName: string;
    covered: boolean;
    date: string;
    slots: CourtSlot[];
}

function ReservationBlock({ courtId, courtName, covered, date, slots }: ReservationBlockProps) {
    const form = useForm<{ slots: string[] }>({
        slots: [],
    });

    const { flash } = usePage();
    const hasSuccess = flash?.[`${courtId}-success`];

    const Icon = courtTypeIconParser(covered);
    const label = courtTypeLabelParser(covered);

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.transform((data) => ({
            ...data,
            date: date,
            courtId: courtId,
        }));
        form.post(`/facility/reservations/create`, {
            preserveScroll: true,
            onSuccess: () => form.reset('slots'),
        });
    };

    const disableSubmit = form.data.slots.length === 0 || form.processing;
    const dateDisplay = dayjs(date).format('dddd, MMMM D, YYYY');

    return (
        <form onSubmit={handleOnSubmit}>
            <VStack gap={4} alignItems="stretch">
                <VStack gap={2} alignItems="start">
                    <Heading size="md">{courtName}</Heading>
                    <DetailWithIcon icon={<Icon />} label={label} />
                </VStack>

                <Field.Root marginBottom={4} invalid={!!form.errors.slots}>
                    <Field.ErrorText>{form.errors.slots}</Field.ErrorText>
                </Field.Root>
                {hasSuccess ? <SuccessAlert title="Reservation created successfully!" description={flash?.[`${courtId}-success`] as string} /> : null}

                <Text>
                    Select slots for <strong>{dateDisplay}</strong>
                </Text>
                <SimpleGrid columns={{ base: 2, md: 4, lg: 3, xl: 4 }} gap={4}>
                    {slots.map((slot) => (
                        <CourtSlotSection
                            courtId={courtId}
                            startTime={slot.startTime}
                            endTime={slot.endTime}
                            price={slot.price}
                            isAvailable={slot.isAvailable}
                            form={form}
                            date={date}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
            <Flex marginTop={4} justifyContent="flex-end">
                <Button type="submit" colorPalette="blue" disabled={disableSubmit}>
                    Reserve
                    <LuArrowRight />
                </Button>
            </Flex>
        </form>
    );
}

export default ReservationBlock;
