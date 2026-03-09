import { SimpleGrid } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import ListingCard from '../../components/directory/ListingCard';
import ListingLayout from '../../layouts/listing/ListingLayout';
import type ListingItem from '../../models/directory/ListingItem';
export interface ListingPageProps extends PageProps {
    listings: ListingItem[];
}

function ListingPage({ listings }: ListingPageProps) {
    return (
        <ListingLayout title="Negros Oriental Pickleball Court Directory">
            <SimpleGrid
                columns={{
                    base: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                }}
                gap={4}
            >
                {listings.map((listing) => (
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
        </ListingLayout>
    );
}

export default ListingPage;
