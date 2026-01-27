
import {
    Container,
    Text,
    VStack,
    HStack,
    SimpleGrid,
} from '@chakra-ui/react';
import { FiClock } from 'react-icons/fi';
import CourtCard from '@/components/CourtCard';
import LandingPageLayout from '@/layouts/LandingPageLayout';

export default function Welcome() {
    return (
        <LandingPageLayout title="Welcome">
            {/* Main Content */}
            <Container maxW="7xl" py={8}>
                    <VStack gap={6} align="stretch">
                        {/* Courts Available Now Indicator */}
                        <HStack gap={2} align="center">
                            <FiClock color="green" />
                            <Text fontWeight="semibold" color="green.600">Courts available now</Text>
                        </HStack>

                        {/* Court Cards Grid */}
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
                            <CourtCard
                                id={1}
                                imageUrl="https://via.placeholder.com/300x200/E2E8F0/4A5568?text=Court+Photo"
                                name="Sunshine Sports Center"
                                address="123 Main St, Quezon City"
                                numberOfCourts={4}
                                covered={true}
                                availableTimes={["3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"]}
                            />
                            
                            <CourtCard
                                id={2}
                                imageUrl="https://via.placeholder.com/300x200/FED7D7/E53E3E?text=Court+Photo"
                                name="Metro Pickleball Hub"
                                address="456 Sports Ave, Makati City"
                                numberOfCourts={2}
                                covered={false}
                                availableTimes={["3:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"]}
                            />
                            
                            <CourtCard
                                id={3}
                                imageUrl="https://via.placeholder.com/300x200/C6F6D5/38A169?text=Court+Photo"
                                name="BGC Recreation Center"
                                address="789 Bonifacio St, Taguig City"
                                numberOfCourts={6}
                                covered={true}
                                availableTimes={["3:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"]}
                            />
                            
                            <CourtCard
                                id={4}
                                imageUrl="https://via.placeholder.com/300x200/FEEBC8/DD6B20?text=Court+Photo"
                                name="Eastwood Sports Complex"
                                address="321 Eastwood Ave, Quezon City"
                                numberOfCourts={3}
                                covered={false}
                                availableTimes={["4:00 PM", "5:00 PM", "7:00 PM", "8:00 PM"]}
                            />
                        </SimpleGrid>
                    </VStack>
                </Container>
        </LandingPageLayout>
    );
}
