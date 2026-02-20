import { Card, Box, Badge, Link as ChakraLink, Button, Spinner, VStack, Text } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { Link, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { LuArrowRight, LuCheck, LuExternalLink } from 'react-icons/lu';
import SuccessAlert from '../../../components/shared/Alert/SuccessAlert';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';
import statusColorParser from '../../../helpers/statusColorParser';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';
import type ReservationListItem from '../../../models/facility/reservation/ReservationListItem';
import type PaginatedData from '../../../models/shared/Pagination';

interface ReservationsPageProps extends PageProps {
    reservations: PaginatedData<ReservationListItem>;
}

function ReservationsPage() {
    const { props, flash } = usePage<ReservationsPageProps>();
    const [fetchingData, setFetchingData] = useState(false);

    const reservations = props.reservations.data || [];
    const meta = props.reservations.meta;

    const successFlash = flash?.success as string;

    const onConfirmClicked = (id: string) => {
        router.post(`/facility/reservations/${id}/confirm`);
    };

    const columns = [
        {
            id: 'courtName',
            name: 'Court Name',
            selector: (row: ReservationListItem) => row.courtName,
        },
        {
            id: 'customerName',
            name: 'Customer Name',
            selector: (row: ReservationListItem) => row.customerName,
        },
        {
            id: 'customerPhone',
            name: 'Customer Phone',
            selector: (row: ReservationListItem) => row.customerPhone,
        },
        {
            id: 'customerEmail',
            name: 'Customer Email',
            selector: (row: ReservationListItem) => row.customerEmail,
        },
        {
            id: 'reservationDate',
            name: 'Reservation Date',
            selector: (row: ReservationListItem) => row.reservationDate,
            format: (row: ReservationListItem) => dayjs(row.reservationDate).format('MMMM D, YYYY'),
        },
        {
            id: 'time',
            name: 'Time',
            selector: (row: ReservationListItem) => `${militaryTimeToAmPmTime(row.startTime)} - ${militaryTimeToAmPmTime(row.endTime)}`,
        },
        {
            id: 'paymentReceipt',
            name: 'Payment Receipt',
            cell: (row: ReservationListItem) => {
                const hasPaymentReceipt = !!row.paymentReceipt?.url;
                return hasPaymentReceipt ? (
                    <ChakraLink href={row.paymentReceipt.url} target="_blank">
                        View Receipt <LuExternalLink />
                    </ChakraLink>
                ) : (
                    'N/A'
                );
            },
        },
        {
            id: 'status',
            name: 'Status',
            cell: (row: ReservationListItem) => {
                const statusColor = statusColorParser(row.status);
                return (
                    <Badge textTransform="capitalize" colorPalette={statusColor}>
                        {row.status}
                    </Badge>
                );
            },
        },
        {
            id: 'approve',
            name: 'Approve',
            cell: (row: ReservationListItem) => {
                return row.status === 'pending' ? (
                    <Button size="xs" colorPalette="green" onClick={() => onConfirmClicked(row.id)}>
                        <LuCheck />
                        Confirm
                    </Button>
                ) : (
                    ''
                );
            },
        },
        {
            id: 'createdAt',
            name: 'Requested Reservation At',
            selector: (row: ReservationListItem) => dayjs(row.createdAt).format('MMMM D, YYYY h:mm A'),
        },
        {
            id: 'fullDetails',
            name: 'View Reservation',
            cell: (row: ReservationListItem) => {
                return (
                    <Link href={`/facility/reservations/${row.id}`}>
                        <Button size="sm" variant="ghost">
                            Full Details
                            <LuArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                );
            },
        },
    ];

    const handlePageChange = (page: number) => {
        router.get(
            `/facility/reservations`,
            { page },
            {
                preserveState: true,
                onStart: () => setFetchingData(true),
                onFinish: () => setFetchingData(false),
            },
        );
    };

    return (
        <FacilityLayout>
            <Card.Root>
                <Card.Header>
                    <Card.Title>Reservations</Card.Title>
                </Card.Header>
                <Card.Body>
                    {successFlash ? (
                        <Box marginBottom={4}>
                            <SuccessAlert title="Reservation confirmed" description={successFlash} />
                        </Box>
                    ) : null}

                    <DataTable
                        columns={columns}
                        data={reservations}
                        progressPending={fetchingData}
                        progressComponent={
                            <VStack colorPalette="blue">
                                <Spinner size="xl" animationDuration="1s" borderWidth="3px" />
                                <Text>Getting reservations</Text>
                            </VStack>
                        }
                        pagination
                        paginationServer
                        paginationTotalRows={meta.total}
                        expandableRows={false}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={meta.per_page}
                        onChangePage={handlePageChange}
                    />
                </Card.Body>
            </Card.Root>
        </FacilityLayout>
    );
}

export default ReservationsPage;
