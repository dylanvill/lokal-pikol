import { Box, Container, Heading, HStack, Image, Separator, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { LuMapPin, LuGrid2X2, LuPhone, LuMail } from 'react-icons/lu';
import CourtReservationBlock from '../../components/customer/CourtReservationBlock';
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
        <DefaultPageLayout title="Court">
            <Container maxW="7xl" px={4} py={4}>
                <Box>
                    <VStack justifyItems="center" alignItems="center" gap={0}>
                        <Image
                            src={facility.profilePhoto.url}
                            alt="Profile"
                            w="36"
                            h="36"
                            objectFit="cover"
                            borderRadius="md"
                            border="2px solid white"
                            shadow="xs"
                            marginBottom={4}
                        />
                        <Heading size="xl" textAlign="center">
                            {facility.name}
                        </Heading>
                        <HStack alignItems="center" justify="center" gap={1}>
                            <LuMapPin color="gray" />
                            <Text fontSize="sm" color="gray">
                                {facility.address} {facility.city}
                            </Text>
                        </HStack>
                        <HStack alignItems="center" justify="center" gap={1}>
                            <LuMail color="gray" />
                            <Text fontSize="sm" color="gray">
                                {facility.email}
                            </Text>
                        </HStack>
                        <HStack alignItems="center" justify="center" gap={1}>
                            <LuPhone color="gray" />
                            <Text fontSize="sm" color="gray">
                                {facility.phone}
                            </Text>
                        </HStack>
                    </VStack>
                    <Separator marginY={8} />
                    <HStack gap={1} alignItems="center" marginBottom={4}>
                        <LuGrid2X2 />
                        <Heading size="lg">Available Courts</Heading>
                    </HStack>
                </Box>
                {courts.map((court) => (
                    <CourtReservationBlock
                        courtId={court.id}
                        name={court.name}
                        photos={court.photos}
                        slots={court.slots}
                        onSlotSelected={(id, slot) => console.log('Clicked slot', id, slot)}
                        onSlotDeselected={(id, slot) => console.log('Clicked slot', id, slot)}
                    />
                ))}
            </Container>
        </DefaultPageLayout>
    );
}
