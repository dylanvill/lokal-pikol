import { VStack, SimpleGrid, Box } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { InfiniteScroll, usePage } from '@inertiajs/react';
import { LuSearchX } from 'react-icons/lu';
import FacilityCard from '@/components/customer/FacilityCard';
import HomePageLayout from '@/layouts/HomePageLayout';
import SearchFilterDisplay from '../../components/customer/SearchFilterDisplay';
import SuccessAlert from '../../components/shared/Alert/SuccessAlert';
import Empty from '../../components/shared/Empty';
import type FacilityList from '../../models/customer/facility/FacilityList';
import type PaginatedData from '../../models/shared/Pagination';

interface HomePageProps extends PageProps {
    facilities: PaginatedData<FacilityList>;
    queryData: {
        date: string;
        startTime: string;
        endTime: string;
        city: string | null;
    };
}

export default function Home() {
    const page = usePage<HomePageProps>();

    const facilities = page.props.facilities || [];

    const justVerified = page.flash?.verificationSuccess || false;
    const justUpdateMobileNumber = page.flash?.['initial-phone-number-update-success'] || false;

    const queryData = page.props.queryData;

    return (
        <HomePageLayout title="Home">
            <VStack gap={2} align="stretch">
                {justVerified && (
                    <Box marginBottom={4}>
                        <SuccessAlert title="Email verified!" description="Your email has been successfully verified. You can now book courts." />
                    </Box>
                )}
                {justUpdateMobileNumber && (
                    <Box marginBottom={4}>
                        <SuccessAlert title="Phone number has been registered" description="Your phone number has been updated. We will use this number to contact you if there are any issues regarding your reservations." />
                    </Box>
                )}
                <Box marginBottom={4}>
                    <SearchFilterDisplay
                        city={queryData.city || 'All Cities'}
                        date={queryData.date}
                        facilitiesCount={page.props.facilities.meta.total}
                    />
                </Box>
                {facilities.data.length === 0 ? (
                    <Empty
                        icon={<LuSearchX />}
                        title="No facilities found"
                        description="Try adjusting your search criteria to find available facilities."
                    />
                ) : (
                    <InfiniteScroll data="facilities" loading={() => 'Loading more facilities...'}>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
                            {facilities.data.map((facility) => (
                                <FacilityCard
                                    key={facility.id}
                                    id={facility.id}
                                    name={facility.name}
                                    coverPhoto={facility.coverPhoto}
                                    profilePhoto={facility.profilePhoto}
                                    address={facility.address}
                                    numberOfCourts={facility.numberOfCourts}
                                    courtType={facility.courtType}
                                    closingTime={facility.closingTime}
                                    openingTime={facility.openingTime}
                                    availableTimes={facility.availableSlots}
                                    city={facility.city}
                                />
                            ))}
                        </SimpleGrid>
                    </InfiniteScroll>
                )}
            </VStack>
        </HomePageLayout>
    );
}
