import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuPencil } from 'react-icons/lu';
import ProfileEditController from '@/actions/App/Http/Scheduling/Profile/Controllers/ProfileEditController';
import ListingCard from '../../../directory/components/ListingCard';
import type ListingItem from '../../../directory/models/ListingItem';
import SchedulingLayout from '../../layouts/SchedulingLayout';

interface ProfilePageProps {
    listing: ListingItem;
}

function ProfilePage({ listing }: ProfilePageProps) {
    return (
        <SchedulingLayout title="Facility Profile">
            <Box maxWidth="md" marginX="auto">
                <Flex justifyContent="flex-end" marginBottom={4}>
                    <Button asChild colorPalette="blue" size="sm">
                        <Link href={ProfileEditController.show.url()}>
                            <LuPencil />
                            Edit profile
                        </Link>
                    </Button>
                </Flex>
                <ListingCard {...listing} />
            </Box>
        </SchedulingLayout>
    );
}

export default ProfilePage;
