import ListingCard from '../../components/listing/ListingCard';
import ListingLayout from '../../layouts/listing/ListingLayout';

function ListingPage() {
    return (
        <ListingLayout title="Negros Oriental Pickleball Court Directory">
            <ListingCard
                id='1'
                name="Sample Facility"
                coverPhoto={{
                    id: '1',
                    url: 'https://lokal-pikol-staging.sgp1.digitaloceanspaces.com/facility-cover-photo/a7ea3e63a3194713b81e9bbf970a4296.jpg'
                }}
            />
        </ListingLayout>
    );
}

export default ListingPage;
