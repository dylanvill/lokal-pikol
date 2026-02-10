import { VStack, SimpleGrid } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import CourtCard from '@/components/customer/CourtCard';
import HomePageLayout from '@/layouts/HomePageLayout';
import type FacilityList from '../../models/customer/facility/FacilityList';

interface HomePageProps extends PageProps {
    facilities: FacilityList[];
}

export default function Home() {
    const page = usePage<HomePageProps>();

    const facilities = page.props.facilities || [];

    return (
        <HomePageLayout title="Home">
            <VStack gap={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
                    {facilities.map((facility) => (
                        <CourtCard
                            id={facility.id}
                            name={facility.name}
                            coverPhoto={facility.coverPhoto}
                            profilePhoto={facility.profilePhoto}
                            address={facility.address}
                            numberOfCourts={facility.numberOfCourts}
                            types={[]}
                            availableTimes={['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM']}
                            city={facility.city}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
        </HomePageLayout>
    );
}
