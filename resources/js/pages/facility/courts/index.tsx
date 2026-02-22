import { Box, Text, Button, SimpleGrid, Flex, EmptyState } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { router, usePage } from '@inertiajs/react';
import { LuX } from 'react-icons/lu';
import CourtCard from '../../../components/facility/CourtCard';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';
import type Court from '../../../models/facility/Court';

interface CourtPageProps extends PageProps {
    courts: Court[];
}

function Courts() {
    const page = usePage<CourtPageProps>();

    const courts = page.props.courts || [];

    const handleRegisterNewCourt = () => {
        router.visit('/facility/courts/create');
    };

    return (
        <FacilityLayout>
            <Box>
                {/* Header Section */}
                <Flex justifyContent="space-between" alignItems="center" mb={6}>
                    <Text fontSize="2xl" fontWeight="bold">
                        Courts
                    </Text>
                    {courts.length > 0 && (
                        <Button colorPalette="blue" onClick={handleRegisterNewCourt}>
                            Register New Court
                        </Button>
                    )}
                </Flex>
                {courts.length === 0 ? (
                    <EmptyState.Root>
                        <EmptyState.Content gap={0}>
                            <EmptyState.Indicator>
                                <LuX />
                            </EmptyState.Indicator>
                            <EmptyState.Title marginBottom={2}>No courts registered yet</EmptyState.Title>
                            <EmptyState.Description>Start by registering a new court to manage your facility's offerings.</EmptyState.Description>
                            <Button colorPalette="blue" mt={4} onClick={handleRegisterNewCourt}>
                                Register New Court
                            </Button>
                        </EmptyState.Content>
                    </EmptyState.Root>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4, '2xl': 6 }} gap={6}>
                        {courts.map((court) => (
                            <CourtCard
                                key={court.id}
                                id={court.id}
                                name={court.name}
                                photo={court.photos[0] ? court.photos[0].url : undefined!}
                                covered={court.covered}
                                courtPricings={court.courtPricings}
                            />
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </FacilityLayout>
    );
}

export default Courts;
