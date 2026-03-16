import { Heading, Link as ChakraLink, SimpleGrid, Text, Box, HStack, Flex } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { InfiniteScroll, router } from '@inertiajs/react';
import { useMemo } from 'react';
import { LuCheckCheck, LuGrid2X2, LuHouse, LuMapPin, LuSun, LuX } from 'react-icons/lu';
import invoke from '@/actions/App/Http/Directory/Controllers/ListingController';
import FilterItem from '../../components/directory/FilterItem';
import ListingCard from '../../components/directory/ListingCard';
import ListingCardSkeletonLoader from '../../components/directory/ListingCard/ListingCardSkeletonLoader';
import Empty from '../../components/shared/Empty';
import ListingLayout from '../../layouts/listing/ListingLayout';
import type ListingItem from '../../models/directory/ListingItem';
import type PaginatedData from '../../models/shared/Pagination';
export interface ListingPageProps extends PageProps {
    listings: PaginatedData<ListingItem>;
    filters: {
        city: string | null;
        courtType: ListingItem['courtType'] | null;
        numberOfCourts: string | null;
    };
}

const COLUMNS_CONFIG = {
    base: 1,
    md: 2,
    lg: 3,
    xl: 4,
};

const COLUMN_GAP_CONFIG = {
    base: 4,
};

function ListingPage({ listings, filters }: ListingPageProps) {
    const skeletons = Array.from({ length: 8 }).map((_, index) => <ListingCardSkeletonLoader key={index} />);

    const hasNoMoreData = listings.meta.current_page === listings.meta.last_page;

    const courtTypeIcon = useMemo(() => {
        switch (filters.courtType) {
            case 'Outdoor':
                return <LuSun />;
            case 'Covered':
                return <LuHouse />;
            case 'Covered and Outdoor':
            default:
                return <LuCheckCheck />;
        }
    }, [filters.courtType]);

    const numberOfCourtsLabel = useMemo(() => {
        if (!filters.numberOfCourts) return '';
        return filters.numberOfCourts === '1' ? '1 court' : `${filters.numberOfCourts} courts`;
    }, [filters.numberOfCourts]);

    const hasFilters = filters.city || filters.courtType || filters.numberOfCourts;

    const handleFilterRemove = (filterKey: keyof typeof filters) => {
        router.get(
            invoke(),
            {
                ...filters,
                [filterKey]: null,
            },
            {
                reset: ['listings', 'filters'],
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <ListingLayout title="Negros Oriental Pickleball Court Directory">
            {hasFilters && (
                <Flex
                    flexDirection={{
                        base: 'column',
                        md: 'row',
                    }}
                    gap={2}
                >
                    <Text fontSize="sm" color="gray.600">
                        Applied filters:
                    </Text>
                    <HStack marginBottom={4}>
                        {filters.city && <FilterItem icon={<LuMapPin />} label={filters.city} onRemove={() => handleFilterRemove('city')} />}
                        {filters.courtType && (
                            <FilterItem icon={courtTypeIcon} label={filters.courtType} onRemove={() => handleFilterRemove('courtType')} />
                        )}
                        {filters.numberOfCourts && (
                            <FilterItem icon={<LuGrid2X2 />} label={numberOfCourtsLabel} onRemove={() => handleFilterRemove('numberOfCourts')} />
                        )}
                    </HStack>
                </Flex>
            )}
            {listings.data.length === 0 && (
                <Empty
                    icon={<LuX />}
                    title="No pickleball courts found"
                    description="Try adjusting your search filters or browse all courts in Negros Oriental to discover great places to play!"
                />
            )}
            <InfiniteScroll
                data="listings"
                loading={() => (
                    <SimpleGrid columns={COLUMNS_CONFIG} gap={COLUMN_GAP_CONFIG} marginTop={COLUMN_GAP_CONFIG}>
                        {skeletons}
                    </SimpleGrid>
                )}
            >
                <SimpleGrid columns={COLUMNS_CONFIG} gap={COLUMN_GAP_CONFIG}>
                    {listings.data.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            id={listing.id}
                            name={listing.name}
                            profilePhoto={listing.profilePhoto}
                            coverPhoto={listing.coverPhoto}
                            city={listing.city}
                            address={listing.address}
                            openingTime={listing.openingTime}
                            closingTime={listing.closingTime}
                            courtType={listing.courtType}
                            numberOfCourts={listing.numberOfCourts}
                            googleMapsUrl={listing.googleMapsUrl}
                            socialLinks={listing.socialLinks}
                            bookingUrl={listing.bookingUrl}
                            email={listing.email}
                            phone={listing.phone}
                        />
                    ))}
                </SimpleGrid>
            </InfiniteScroll>
            {hasNoMoreData && listings.data.length !== 0 && (
                <Box marginTop={16}>
                    <Heading size="lg" marginBottom={4} textAlign="center">
                        That's all the courts we have for now
                    </Heading>
                    <Text textAlign="center">
                        Want to be part of the Negros Oriental Pickleball court directory?{' '}
                        <ChakraLink href="https://www.facebook.com/lokalpikol" color="blue.500" target="_blank">
                            Send us a message on Facebook.
                        </ChakraLink>
                    </Text>
                    <Text textAlign="center" fontSize="sm">
                        This is a community effort, your contribution will be highly appreciated!
                    </Text>
                </Box>
            )}
        </ListingLayout>
    );
}

export default ListingPage;
