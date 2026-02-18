import { VStack, SimpleGrid, Text, HStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LuSearch } from 'react-icons/lu';
import FacilityCard from '@/components/customer/FacilityCard';
import HomePageLayout from '@/layouts/HomePageLayout';
import militaryTimeToAmPmTime from '../../helpers/militaryTimeToAmPmTime';
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

    const queryData = page.props.queryData;

    const searchLabel = useMemo(() => {
        const cityPart = queryData.city ? `in ${queryData.city}` : 'in all cities';

        const formattedStartTime = militaryTimeToAmPmTime(queryData.startTime);
        const formattedEndTime = militaryTimeToAmPmTime(queryData.endTime);
        const formattedDate = dayjs(queryData.date).format('dddd, MMMM D, YYYY');

        return (
            <Text color="green">
                Showing courts {cityPart} on{' '}
                <Text as="span" fontWeight="bold" fontStyle="italic">
                    {formattedDate}
                </Text>{' '}
                from{' '}
                <Text as="span" fontWeight="bold" fontStyle="italic">
                    {formattedStartTime}
                </Text>{' '}
                to{' '}
                <Text as="span" fontWeight="bold" fontStyle="italic">
                    {formattedEndTime}
                </Text>
            </Text>
        );
    }, [queryData]);

    const handleClicked = (id: string) => {
        router.visit(`/facilities/${id}`, {
            data: {
                date: queryData.date,
            },
        });
    };

    return (
        <HomePageLayout title="Home">
            <VStack gap={2} align="stretch">
                <HStack>
                    <LuSearch color="green" />
                    {searchLabel}
                </HStack>
                <InfiniteScroll data="facilities" loading={() => 'Loading more facilities...'}>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
                        {facilities.data.map((facility) => (
                            <FacilityCard
                                id={facility.id}
                                name={facility.name}
                                coverPhoto={facility.coverPhoto}
                                profilePhoto={facility.profilePhoto}
                                address={facility.address}
                                numberOfCourts={facility.numberOfCourts}
                                courtType={facility.courtType}
                                closingTime={facility.closingTime}
                                openingTime={facility.openingTime}
                                // availableTimes={['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM']}
                                city={facility.city}
                                onClick={handleClicked}
                            />
                        ))}
                    </SimpleGrid>
                </InfiniteScroll>
            </VStack>
        </HomePageLayout>
    );
}
