import { Card, Container, Field, Input, VStack } from '@chakra-ui/react';
import { router, type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
import ReservationBlock from '../../../components/facility/reservation/ReservationBlock';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';
import type CourtReservationListItem from '../../../models/facility/reservation/CourtReservationListItem';

export interface CreateReservationPageProps extends PageProps {
    courts: CourtReservationListItem[];
    lookupDate: string;
}

function CreateReservationPage() {
    const { props } = usePage<CreateReservationPageProps>();
    const courts = props.courts;

    const [date, setDate] = useState(props.lookupDate);
    const minimumDate = dayjs().format('YYYY-MM-DD');

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
        router.get(`/facility/reservations/create`, { date: e.target.value }, { preserveState: true });
    };

    return (
        <FacilityLayout>
            <FacilityPageHeader title="Create Reservation" description="Select a court, date and time slots to create a new reservation." />
            <Container>
                <Card.Root>
                    <Card.Header>
                        <Field.Root>
                            <Field.Label>Select reservation date</Field.Label>
                            <Input type="date" value={date} onChange={handleDateChange} min={minimumDate} />
                        </Field.Root>
                    </Card.Header>
                    <Card.Body>
                        <VStack gap={12} alignItems="stretch">
                            {courts.map((court) => (
                                <ReservationBlock
                                    key={court.id}
                                    courtName={court.name}
                                    courtId={court.id}
                                    covered={court.covered}
                                    date={date}
                                    slots={court.slots}
                                />
                            ))}
                        </VStack>
                    </Card.Body>
                </Card.Root>
            </Container>
        </FacilityLayout>
    );
}

export default CreateReservationPage;
