import { VStack, Container, Heading, Box, Table, Card } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import Footer from '../../components/facility/ReservationsTable/Footer';
import Header from '../../components/facility/ReservationsTable/Header';
import Row from '../../components/facility/ReservationsTable/Row';
import FacilityLayout from '../../layouts/facility/FacilityLayout';
import type ReservationListItem from '../../models/facility/reservation/ReservationListItem';
import type PaginatedData from '../../models/shared/Pagination';

interface ReservationsPageProps extends PageProps {
    reservations: PaginatedData<ReservationListItem>;
}

function ReservationsPage() {
    const { props } = usePage<ReservationsPageProps>();

    const reservations = props.reservations.data || [];

    return (
        <FacilityLayout>
            <Card.Root>
                <Card.Header><Card.Title>Reservations</Card.Title></Card.Header>
                <Card.Body>
                    <Table.Root size="sm" variant="outline" striped>
                        <Header />
                        <Table.Body>
                            {reservations.map((reservation) => (
                                <Row
                                    key={reservation.id}
                                    id={reservation.id}
                                    courtName={reservation.courtName}
                                    customerName={reservation.customerName}
                                    reservationDate={reservation.reservationDate}
                                    startTime={reservation.startTime}
                                    endTime={reservation.endTime}
                                    status={reservation.status}
                                    paymentReceipt={reservation.paymentReceipt}
                                    requestedAt={reservation.createdAt}
                                />
                            ))}
                        </Table.Body>
                        <Footer />
                    </Table.Root>
                </Card.Body>
            </Card.Root>
        </FacilityLayout>
    );
}

export default ReservationsPage;
