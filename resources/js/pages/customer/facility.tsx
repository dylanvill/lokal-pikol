import { Alert, Container, Field, Heading, HStack, Input, Separator, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuGrid2X2 } from 'react-icons/lu';
import CourtReservationBlock from '../../components/customer/CourtReservationBlock';
import FacilityHeader from '../../components/customer/FacilityHeader';
import DefaultPageLayout from '../../layouts/DefaultPageLayout';
import useCustomer from '../../lib/hooks/useCustomer';
import type Court from '../../models/customer/court/Court';
import type Facility from '../../models/customer/facility/Facility';
interface CourtPageProps extends PageProps {
    courts: Court[];
    facility: Facility;
}

export default function CourtPage() {
    const page = usePage<CourtPageProps>();

    const courts = page.props.courts || [];
    const facility = page.props.facility;

    const customer = useCustomer();

    const today = dayjs().format('YYYY-MM-DD');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.value;
    };

    return (
        <DefaultPageLayout title={facility.name}>
            <Container maxW="7xl" px={4} py={4}>
                <FacilityHeader
                    name={facility.name}
                    address={facility.address}
                    city={facility.city}
                    email={facility.email}
                    phone={facility.phone}
                    profilePhotoUrl={facility.profilePhoto.url}
                />
                <Separator marginY={8} />
                <HStack flex={1} marginBottom={4}>
                    <LuGrid2X2 />
                    <Heading size="lg">Available Courts</Heading>
                </HStack>
                <Field.Root marginBottom={4} maxW="sm">
                    <Field.Label htmlFor="date">Date:</Field.Label>
                    <Input type="date" name="date" onChange={handleChange} defaultValue={today} min={today} />
                    <Field.HelperText>Select a date to view available courts.</Field.HelperText>
                </Field.Root>
                {!customer.isLoggedIn && (
                    <Alert.Root status="warning" marginBottom={4}>
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title>Account needed for booking</Alert.Title>
                            <Alert.Description>
                                Create an account to manage bookings all in one place!{' '}
                                <Link href="/login" style={{ color: 'blue' }}>
                                    Login
                                </Link>{' '}
                                or{' '}
                                <Link href="/sign-up" style={{ color: 'blue' }}>
                                    create an account
                                </Link>{' '}
                                to get started.
                            </Alert.Description>
                        </Alert.Content>
                    </Alert.Root>
                )}
                <VStack alignItems="stretch" justifyContent="flex" width="full" gap={8}>
                    {courts.map((court) => (
                        <CourtReservationBlock courtId={court.id} name={court.name} photos={court.photos} slots={court.slots} />
                    ))}
                </VStack>
            </Container>
        </DefaultPageLayout>
    );
}
