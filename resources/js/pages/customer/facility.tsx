import { Container, Heading, HStack, Separator, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { LuGrid2X2 } from 'react-icons/lu';
import CourtReservationBlock from '../../components/customer/CourtReservationBlock';
import FacilityHeader from '../../components/customer/FacilityHeader';
import DefaultPageLayout from '../../layouts/DefaultPageLayout';
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
                <HStack gap={1} alignItems="center" marginBottom={4}>
                    <LuGrid2X2 />
                    <Heading size="lg">Available Courts</Heading>
                </HStack>
                <VStack alignItems="stretch" justifyContent="flex" width="full" gap={8}>
                    {courts.map((court) => (
                        <CourtReservationBlock courtId={court.id} name={court.name} photos={court.photos} slots={court.slots} />
                    ))}
                </VStack>
            </Container>
        </DefaultPageLayout>
    );
}
