import { Box, Container, Heading, HStack, Image, Separator, Text, VStack } from '@chakra-ui/react';
import { usePage } from '@inertiajs/react';
import { LuMapPin, LuGrid2X2 } from 'react-icons/lu';
import CourtReservationBlock from '../../components/CourtReservationBlock';
import type { CourtSlotState } from '../../components/CourtReservationBlock/CourtSlot/types';
import DefaultPageLayout from '../../layouts/DefaultPageLayout';

export default function Court() {
    const page = usePage();

    const courts = (page.props.courts as []) || ([] as []);

    return (
        <DefaultPageLayout title="Court">
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
                        {courts.map((court) => (
                            <CourtReservationBlock
                                courtId={1}
                                courtName="Court 1"
                                onSlotSelected={(id, slot) => console.log('Clicked slot', id, slot)}
                                onSlotDeselected={(id, slot) => console.log('Clicked slot', id, slot)}
                            />
                        ))}
                    </VStack>
                </Box>
            </Container>
        </DefaultPageLayout>
    );
}
