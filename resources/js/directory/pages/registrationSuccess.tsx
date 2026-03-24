import { Box, Heading, Text } from '@chakra-ui/react';
import ListingCard from '../components/ListingCard';
import SuccessAlert from '../../components/shared/Alert/SuccessAlert';
import BackNavigationBase from '../../components/shared/BackNavigationBase';
import DirectoryLayout from '../../layouts/directory/DirectoryLayout';
import type ListingItem from '../../models/directory/ListingItem';

interface RegistrationSuccessPageProps {
    listing: ListingItem;
}

function RegistrationSuccessPage({ listing }: RegistrationSuccessPageProps) {
    return (
        <DirectoryLayout
            title="Registration Successful"
            contentContainerProps={{
                maxWidth: 'xl',
            }}
        >
            <BackNavigationBase href="/" label="View directory" />
            <Box>
                <Box marginBottom={4}>
                    <SuccessAlert title="Listing Successful!" description="" />
                </Box>
                <Heading>Your court is now live in the directory</Heading>
                <Text marginBottom={6} color="gray.600">
                    Your court is now listed in the Negros Oriental pickleball directory and can be discovered by players in your area. Here's how
                    your listing appears to the public:
                </Text>
            </Box>
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
        </DirectoryLayout>
    );
}

export default RegistrationSuccessPage;
