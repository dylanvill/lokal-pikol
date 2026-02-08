import { Box, Container, Heading, HStack, Image, Separator, Text, VStack } from '@chakra-ui/react';
import { LuMapPin, LuGrid2X2 } from 'react-icons/lu';
import LandingPageLayout from '@/layouts/LandingPageLayout';
import CourtReservationBlock from '../../components/CourtReservationBlock';
import type { CourtSlotState } from '../../components/CourtReservationBlock/CourtSlot/types';

const dummyData: { id: number; state: CourtSlotState; label: string }[] = [
    { id: 1, state: 'reserved', label: '07:00 AM' },
    { id: 2, state: 'available', label: '08:00 AM' },
    { id: 3, state: 'available', label: '09:00 AM' },
    { id: 4, state: 'available', label: '10:00 AM' },
    { id: 5, state: 'reserved', label: '11:00 AM' },
    { id: 6, state: 'reserved', label: '12:00 PM' },
    { id: 7, state: 'available', label: '01:00 PM' },
    { id: 8, state: 'available', label: '02:00 PM' },
    { id: 9, state: 'selected', label: '03:00 PM' },
    { id: 10, state: 'available', label: '04:00 PM' },
    { id: 11, state: 'available', label: '05:00 PM' },
    { id: 12, state: 'available', label: '06:00 PM' },
    { id: 13, state: 'reserved', label: '07:00 PM' },
    { id: 14, state: 'reserved', label: '08:00 PM' },
    { id: 15, state: 'reserved', label: '09:00 PM' },
    { id: 16, state: 'available', label: '10:00 PM' },
    { id: 17, state: 'available', label: '11:00 PM' },
];

export default function Court() {
    return (
        <LandingPageLayout title="Court">
            <Container maxW="7xl" px={4} py={4}>
                <Box>
                    <VStack justifyItems="center" alignItems="center" gap={0}>
                        <Image
                            src="https://picsum.photos/1000/1000"
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
                            Sports Center
                        </Heading>
                        <HStack alignItems="center" justify="center" gap={1}>
                            <LuMapPin color="gray" />
                            <Text fontSize="sm" color="gray">
                                123 Main St, Cityville
                            </Text>
                        </HStack>
                        <Text textAlign="center" marginTop={2}>
                            A premier sports facility offering top-notch amenities and courts for various sports.
                        </Text>
                    </VStack>
                    <Separator marginY={8} />
                    <HStack gap={1} alignItems="center" marginBottom={4}>
                        <LuGrid2X2 />
                        <Heading size="lg">Available Courts</Heading>
                    </HStack>
                    <VStack gap={4}>
                        <CourtReservationBlock
                            courtId={1}
                            courtName="Court 1"
                            slots={dummyData}
                            onSlotSelected={(id, slot) => console.log('Clicked slot', id, slot)}
                            onSlotDeselected={(id, slot) => console.log('Clicked slot', id, slot)}
                        />
                        <CourtReservationBlock
                            courtId={2}
                            courtName="Court 2"
                            slots={dummyData}
                            onSlotSelected={(id, slot) => console.log('Clicked slot', id, slot)}
                            onSlotDeselected={(id, slot) => console.log('Clicked slot', id, slot)}
                        />
                    </VStack>
                </Box>
            </Container>
        </LandingPageLayout>
    );
}
