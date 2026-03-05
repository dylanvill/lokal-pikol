import { Box, Field, Input, Separator, Text, VStack } from '@chakra-ui/react';
import { router, type PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LuCircleAlert } from 'react-icons/lu';
import CourtReservationBlock from '../../components/customer/CourtReservationBlock';
import FacilityProfileHeader from '../../components/customer/FacilityProfileHeader';
import DefaultPageLayout from '../../layouts/DefaultPageLayout';
import useCustomer from '../../lib/hooks/useCustomer';
import type Court from '../../models/customer/court/Court';
import type Facility from '../../models/customer/facility/Facility';
interface CourtPageProps extends PageProps {
    courts: Court[];
    facility: Facility;
    lookupDate: string;
}

export default function CourtPage() {
    const page = usePage<CourtPageProps>();

    const courts = page.props.courts || [];
    const facility = page.props.facility;

    const customer = useCustomer();

    const [date, setDate] = useState(dayjs(page.props.lookupDate).format('YYYY-MM-DD'));

    const today = dayjs().format('YYYY-MM-DD');

    const handleDateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
        router.get(
            `/facilities/${facility.id}`,
            { date: e.target.value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <DefaultPageLayout title={facility.name} contentContainerProps={{ padding: 4 }}>
            <FacilityProfileHeader
                name={facility.name}
                address={facility.address}
                city={facility.city}
                email={facility.email}
                phone={facility.phone}
                profilePhotoUrl={facility.profilePhoto.url}
                coverPhotoUrl={facility.coverPhoto.url}
                description={facility.description}
                googleMapsUrl={facility.googleMapsUrl}
            />
            <Separator marginY={8} />
            {!customer.isLoggedIn && (
                <Box marginBottom={4}>
                    <Text color="orange.500" fontStyle="italic" display="flex" alignItems="center" gap={2}>
                        <LuCircleAlert size={16} />
                        Create an account to manage bookings all in one place!{' '}
                        <Link href="/login" style={{ color: 'blue' }}>
                            Login
                        </Link>{' '}
                        or{' '}
                        <Link href="/sign-up" style={{ color: 'blue' }}>
                            create an account
                        </Link>{' '}
                        to get started.
                    </Text>
                </Box>
            )}
            <VStack alignItems="stretch" justifyContent="flex" width="full" gap={8}>
                <Box>
                    <Field.Root marginBottom={8} maxW={{ base: 'full', md: 'sm' }}>
                        <Field.Label htmlFor="date" as="text">
                            Date:
                        </Field.Label>
                        <Input type="date" name="date" min={today} value={date} onChange={handleDateChanged} required />
                        <Field.HelperText>Select a date to view available courts.</Field.HelperText>
                    </Field.Root>
                </Box>
                <VStack alignItems="stretch" gap={28}>
                    {courts.map((court) => (
                        <CourtReservationBlock
                            covered={court.covered}
                            facilityId={facility.id}
                            courtId={court.id}
                            name={court.name}
                            photos={court.photos}
                            slots={court.slots}
                            date={date}
                        />
                    ))}
                </VStack>
            </VStack>
        </DefaultPageLayout>
    );
}
