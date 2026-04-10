import { Box, SimpleGrid } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { InfiniteScroll, router } from '@inertiajs/react';
import { LuX } from 'react-icons/lu';
import invoke from '@/actions/App/Http/Directory/Controllers/ListingController';
import Empty from '../../shared/components/Empty';
import type PaginatedData from '../../shared/models/Pagination';
import ActiveFilters from '../components/ActiveFilters';
import DirectorySearchBar from '../components/DirectorySearchBar';
import EndOfListingCta from '../components/EndOfListingCta';
import ListingCard from '../components/ListingCard';
import useSkeletons from '../components/ListingCard/useSkeletons';
import ListingCta from '../components/ListingCta';
import DirectoryLayout from '../layouts/DirectoryLayout';
import type ListingFilters from '../models/ListingFilters';
import type ListingItem from '../models/ListingItem';
import SurveyCard from '../components/transients/SurveyCard';

export interface ListingPageProps extends PageProps {
    listings: PaginatedData<ListingItem>;
    filters: ListingFilters;
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
    const skeletons = useSkeletons();

    const hasNoMoreData = listings.meta.current_page === listings.meta.last_page;
    const hasFilters = filters.city || filters.courtType || filters.numberOfCourts;
    const noMatchingCourts = listings.data.length === 0 && hasFilters;

    const handleFilterRemove = (filterKey: keyof ListingFilters) => {
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
        <DirectoryLayout title="Negros Oriental Pickleball Court Directory" headerComponent={<DirectorySearchBar />}>
            {!hasFilters && (
                <Box marginBottom={4}>
                    <ListingCta />
                </Box>
            )}
            {hasFilters && <ActiveFilters {...filters} onRemoveFilter={handleFilterRemove} />}
            {noMatchingCourts && (
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
                    {listings.data.map((listing, index) => (
                        <>
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
                            {index === 4 && <SurveyCard />}
                        </>
                    ))}
                </SimpleGrid>
            </InfiniteScroll>
            {hasNoMoreData && listings.data.length !== 0 && <EndOfListingCta />}
        </DirectoryLayout>
    );
}

export default ListingPage;
