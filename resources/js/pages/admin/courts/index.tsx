import { Box, Text, Button, SimpleGrid, Flex } from '@chakra-ui/react';
import React from 'react';
import CourtCard from '../../../components/admin/CourtCard';
import AdminLayout from '../../../layouts/admin/AdminLayout';

// Mock data for demonstration
const mockCourts = [
    {
        id: 1,
        name: 'Court A',
        image: 'https://picsum.photos/1280/720',
        slots: ['9:00-10:00', '10:00-11:00', '11:00-12:00'],
        type: 'covered' as const,
    },
    {
        id: 2,
        name: 'Court B',
        image: 'https://picsum.photos/1280/720',
        slots: ['8:00-9:00', '14:00-15:00'],
        type: 'outdoor' as const,
    },
    {
        id: 3,
        name: 'Court B',
        image: 'https://picsum.photos/1280/720',
        slots: ['8:00-9:00', '14:00-15:00'],
        type: 'outdoor' as const,
    },
    {
        id: 4,
        name: 'Court B',
        image: 'https://picsum.photos/1280/720',
        slots: ['8:00-9:00', '14:00-15:00'],
        type: 'outdoor' as const,
    },
    {
        id: 5,
        name: 'Court B',
        image: 'https://picsum.photos/1280/720',
        slots: ['8:00-9:00', '14:00-15:00'],
        type: 'outdoor' as const,
    },
    {
        id: 6,
        name: 'Court B',
        image: 'https://picsum.photos/1280/720',
        slots: ['8:00-9:00', '14:00-15:00'],
        type: 'outdoor' as const,
    },
];

function Courts() {
    const handleRegisterNewCourt = () => {
        console.log('Register new court');
    };

    return (
        <AdminLayout>
            <Box>
                {/* Header Section */}
                <Flex justifyContent="space-between" alignItems="center" mb={6}>
                    <Text fontSize="2xl" fontWeight="bold">
                        Courts
                    </Text>
                    <Button colorScheme="blue" onClick={handleRegisterNewCourt}>
                        Register New Court
                    </Button>
                </Flex>

                {/* Courts Grid */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4, '2xl': 6 }} gap={6}>
                    {mockCourts.map((court) => (
                        <CourtCard key={court.id} id={court.id} name={court.name} image={court.image} slots={court.slots} type={court.type} />
                    ))}
                </SimpleGrid>
            </Box>
        </AdminLayout>
    );
}

export default Courts;
