import { Box, Container, Heading, HStack, Image, Separator, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { usePage } from '@inertiajs/react';
import { LuMapPin, LuGrid2X2, LuPhone, LuMail } from 'react-icons/lu';
import CourtReservationBlock from '../../components/CourtReservationBlock';
import DefaultPageLayout from '../../layouts/DefaultPageLayout';

export default function Court() {
    const page = usePage();

    const courts = (page.props.courts as []) || ([] as []);
    const facility = page.props.facility;
    console.log('🚀 ~ Court ~ courts:', courts);

    return (
        <DefaultPageLayout title="Court">
            <Container maxW="7xl" px={4} py={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}></SimpleGrid>
                <Box>
                    <VStack justifyItems="center" alignItems="center" gap={0}>
                        <Image
                            src={facility.profilePhoto}
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
                    <VStack gap={4}>
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
                    </VStack>
                </Box>
            </Container>
        </DefaultPageLayout>
    );
}
