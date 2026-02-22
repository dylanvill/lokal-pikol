import { type PageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';
import type CourtReservationListItem from '../../../models/facility/reservation/CourtReservationListItem';
import { Card, Container, Field, Heading, Input, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import DetailWithIcon from '../../../components/shared/DetailWithIcon';
import courtTypeIconParser from '../../../helpers/courtTypeIconParser';
import courtTypeLabelParser from '../../../helpers/courtTypeLabelParser';
import CourtSlotSection from '../../../components/customer/CourtReservationBlock/CourtSlotSection';

export interface CreateReservationPageProps extends PageProps {
    courts: CourtReservationListItem[];
    lookupDate: string;
}

function CreateReservationPage() {
    const { props } = usePage<CreateReservationPageProps>();
    const courts = props.courts;

    const [date, setDate] = useState(props.lookupDate);

    return (
        <FacilityLayout>
            <FacilityPageHeader title="Create Reservation" description="Select a court, date and time slots to create a new reservation." />
            <Container>
                <Card.Root>
                    <Card.Header>
                        <Field.Root>
                            <Field.Label>Select reservation date</Field.Label>
                            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </Field.Root>
                    </Card.Header>
                    <Card.Body>
                        {courts.map((court) => {
                            const form = useForm({ slots: [] });
                            const Icon = courtTypeIconParser(court.covered);
                            const label = courtTypeLabelParser(court.covered);
                            return (
                                <>
                                    <Heading>{court.name}</Heading>
                                    <DetailWithIcon icon={<Icon />} label={label} />

                                    <SimpleGrid columns={{ base: 2, md: 4, lg: 3, xl: 4 }} gap={4}>
                                        {court.slots.map((slot) => (
                                            <CourtSlotSection
                                                courtId={court.id}
                                                startTime={slot.startTime}
                                                endTime={slot.endTime}
                                                price={slot.price}
                                                isAvailable={slot.isAvailable}
                                                form={form}
                                                date={date}
                                            />
                                        ))}
                                    </SimpleGrid>
                                </>
                            );
                        })}
                    </Card.Body>
                </Card.Root>
            </Container>
        </FacilityLayout>
    );
}

export default CreateReservationPage;
