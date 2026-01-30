import { Badge, Box, Container, Heading, HStack, Image, Separator, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import LandingPageLayout from '@/layouts/LandingPageLayout';
import { LuMapPin, LuX, LuCircle, LuGrid2X2, LuCircleCheck, LuCheck } from 'react-icons/lu';
import CourtReservationBlock from '../components/CourtReservationBlock';

interface CourtProps {
    court: string;
}

export default function Court({ court }: CourtProps) {
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
                    <CourtReservationBlock />
                </Box>
            </Container>
        </LandingPageLayout>
    );
}
