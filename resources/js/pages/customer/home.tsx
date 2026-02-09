import { VStack, SimpleGrid } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import CourtCard from '@/components/customer/CourtCard';
import HomePageLayout from '@/layouts/HomePageLayout';
import type Court from '../../models/customer/court/Court';

interface HomePageProps extends PageProps {
    courts: Court[];
}

export default function Home() {
    const page = usePage<HomePageProps>();

    const courts = page.props.courts || [];

    return (
        <HomePageLayout title="Home">
            <VStack gap={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
                    {courts.map((court) => (
                        <CourtCard
                            id={court.id}
                            name={court.name}
                            coverPhotoUrl={court.coverPhoto}
                            profilePhotoUrl={court.profilePhoto}
                            address={court.address}
                            numberOfCourts={court.numberOfCourts}
                            types={court.courtTypes}
                            availableTimes={['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM']}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
        </HomePageLayout>
    );
}
