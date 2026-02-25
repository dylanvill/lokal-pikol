import { Box, Button, SimpleGrid, EmptyState, HStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { Link, router, usePage } from '@inertiajs/react';
import { LuPlus, LuX } from 'react-icons/lu';
import CourtCard from '../../../components/facility/CourtCard';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
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
                <HStack justifyContent="space-between" alignItems="center">
                    <FacilityPageHeader title="Courts" description="Manage the courts available at your facility" />
                    <Link href="/facility/courts/create">
                        <Button size="sm" colorPalette="blue">
                            Add Court <LuPlus />
                        </Button>
                    </Link>
                </HStack>
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
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }} gap={6}>
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
