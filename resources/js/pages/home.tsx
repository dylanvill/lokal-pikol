import { Container, Text, VStack, HStack, SimpleGrid, Box, createListCollection } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { useState } from 'react';
import { FiClock, FiMapPin } from 'react-icons/fi';
import CourtCard from '@/components/CourtCard';
import LandingPageLayout from '@/layouts/LandingPageLayout';

export default function Welcome() {
    const cities = [
        { label: "Dumaguete", value: "dumaguete" },
        { label: "Valencia", value: "valencia" },
        { label: "Bacong", value: "bacong" },
        { label: "Sibulan", value: "sibulan" },
        { label: "Tanjay", value: "tanjay" }
    ];

    const collection = createListCollection({ items: cities });
    const [selectedCity, setSelectedCity] = useState(['dumaguete']);
    return (
        <LandingPageLayout title="Welcome">
            {/* Main Content */}
            <Container maxW="7xl" py={8}>
                <VStack gap={6} align="stretch">
                    {/* City Selection */}
                    <Box>
                        <HStack gap={2} align="center" mb={2}>
                            <FiMapPin color="gray" />
                            <Text fontWeight="medium" color="gray.700">
                                Select City
                            </Text>
                        </HStack>
                        <Select.Root
                            collection={collection}
                            value={selectedCity}
                            onValueChange={(details) => setSelectedCity(details.value)}
                            maxW="300px"
                        >
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Choose a city" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Select.Positioner>
                                <Select.Content>
                                    {collection.items.map((item) => (
                                        <Select.Item key={item.value} item={item}>
                                            <Select.ItemText>{item.label}</Select.ItemText>
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Select.Root>
                    </Box>

                    {/* Courts Available Now Indicator */}
                    <HStack gap={2} align="center">
                        <FiClock color="green" />
                        <Text fontWeight="semibold" color="green.600">
                            Courts available now
                        </Text>
                    </HStack>

                    {/* Court Cards Grid */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
                        <CourtCard
                            id={1}
                            imageUrl="https://picsum.photos/400/300"
                            name="Sunshine Sports Center"
                            address="123 Main St, Quezon City"
                            numberOfCourts={4}
                            covered={true}
                            availableTimes={['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM']}
                        />

                        <CourtCard
                            id={2}
                            imageUrl="https://picsum.photos/400/300"
                            name="Metro Pickleball Hub"
                            address="456 Sports Ave, Makati City"
                            numberOfCourts={2}
                            covered={false}
                            availableTimes={['3:00 PM', '4:00 PM', '6:00 PM', '8:00 PM']}
                        />

                        <CourtCard
                            id={3}
                            imageUrl="https://picsum.photos/400/300"
                            name="BGC Recreation Center"
                            address="789 Bonifacio St, Taguig City"
                            numberOfCourts={6}
                            covered={true}
                            availableTimes={['3:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']}
                        />

                        <CourtCard
                            id={4}
                            imageUrl="https://picsum.photos/400/300"
                            name="Eastwood Sports Complex"
                            address="321 Eastwood Ave, Quezon City"
                            numberOfCourts={3}
                            covered={false}
                            availableTimes={['4:00 PM', '5:00 PM', '7:00 PM', '8:00 PM']}
                        />
                    </SimpleGrid>
                </VStack>
            </Container>
        </LandingPageLayout>
    );
}
