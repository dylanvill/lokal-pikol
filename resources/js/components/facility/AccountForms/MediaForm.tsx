import { Box, Button, Card, Flex } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { LuImage } from 'react-icons/lu';
import SectionHeader from '../OnboardingForm/SectionHeader';
import EditCoverPhotoSection from './EditCoverPhotoSection';
import EditProfilePhotoSection from './EditProfilePhotoSection';

interface MediaFormProps {
    currentCoverPhotoUrl?: string;
    currentProfilePhotoUrl?: string;
}

function MediaForm({
    currentCoverPhotoUrl = 'https://via.placeholder.com/800x450?text=Cover+Photo',
    currentProfilePhotoUrl = 'https://via.placeholder.com/200x200?text=Profile+Photo',
}: MediaFormProps) {
    const form = useForm({
        coverPhoto: null as File | null,
        profilePhoto: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/facility/media', {
            onSuccess: () => {
                // Reset form or show success message
            },
        });
    };

    return (
        <Card.Root>
            <Card.Header>
                <SectionHeader
                    icon={<LuImage />}
                    title="Facility Profile Media"
                    description="Update the profile photo and cover photo for your facility for users to easily recognize your facility."
                />
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <Box zIndex={1}>
                        <EditCoverPhotoSection currentImageUrl={currentCoverPhotoUrl} form={form} />
                    </Box>
                    <Box zIndex={2} marginTop={-28} marginLeft={8}>
                        <EditProfilePhotoSection currentImageUrl={currentProfilePhotoUrl} form={form} />
                    </Box>
                    <Flex width="full" justifyContent="flex-end">
                        <Button type="submit" disabled={form.processing || (!form.data.coverPhoto && !form.data.profilePhoto)} size="md" colorPalette="blue">
                            Save Changes
                        </Button>
                    </Flex>
                </form>
            </Card.Body>
        </Card.Root>
    );
}

export default MediaForm;
