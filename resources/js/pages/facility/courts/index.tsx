import { Box, Text, Button, SimpleGrid, Flex } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { router, usePage } from '@inertiajs/react';
import CourtCard from '../../../components/facility/CourtCard';
import ClientLayout from '../../../layouts/facility/FacilityLayout';
import type Court from '../../../models/client/Court';

interface CourtPageProps extends PageProps {
    courts: Court[];
}

function Courts() {
    const page = usePage<CourtPageProps>();

    const courts = page.props.courts || [];

    const handleRegisterNewCourt = () => {
        router.visit('/client/courts/create');
    };

    return (
        <ClientLayout>
            <Box>
                {/* Header Section */}
                <Flex justifyContent="space-between" alignItems="center" mb={6}>
                    <Text fontSize="2xl" fontWeight="bold">
                        Courts
                    </Text>
                    <Button colorPalette="blue" onClick={handleRegisterNewCourt}>
                        Register New Court
                    </Button>
                </Flex>

                {/* Courts Grid */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4, '2xl': 6 }} gap={6}>
                    {courts.map((court) => (
                        <CourtCard
                            key={court.uuid}
                            id={court.uuid}
                            name={court.name}
                            photo={court.photos[0] ? court.photos[0].url : undefined!}
                            slots={court.slots}
                            covered={court.covered}
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </ClientLayout>
    );
}

export default Courts;
