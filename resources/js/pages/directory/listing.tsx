import { Heading, Link as ChakraLink, Separator, SimpleGrid, Text, Box } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { InfiniteScroll } from '@inertiajs/react';
import ListingCard from '../../components/directory/ListingCard';
import ListingCardSkeletonLoader from '../../components/directory/ListingCard/ListingCardSkeletonLoader';
import ListingLayout from '../../layouts/listing/ListingLayout';
import type ListingItem from '../../models/directory/ListingItem';
import type PaginatedData from '../../models/shared/Pagination';
export interface ListingPageProps extends PageProps {
    listings: PaginatedData<ListingItem>;
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

function ListingPage({ listings }: ListingPageProps) {
    const skeletons = Array.from({ length: 8 }).map((_, index) => <ListingCardSkeletonLoader key={index} />);

    const hasNoMoreData = listings.meta.current_page === listings.meta.last_page;

    return (
        <ListingLayout title="Negros Oriental Pickleball Court Directory">
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
            {hasNoMoreData && (
                <>
                    <Separator marginY={8} />
                    <Box>
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
                </>
            )}
        </ListingLayout>
    );
}

export default ListingPage;
