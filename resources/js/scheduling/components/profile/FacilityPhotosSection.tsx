import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useCallback } from 'react';
import UpdateFacilityPhotosController from '@/actions/App/Http/Scheduling/Profile/Controllers/UpdateFacilityPhotosController';
import { toaster } from '../../../shared/components/ui/toaster';
import { PROFILE_SUCCESS_MESSAGE_KEY } from './constants';
import FacilityCoverPhotoSection from './FacilityCoverPhotoSection';
import FacilityProfilePhotoSection from './FacilityProfilePhotoSection';

interface FacilityPhotosSectionProps {
    currentProfilePhotoUrl: string | null;
    currentCoverPhotoUrl: string | null;
}

function FacilityPhotosSection({ currentProfilePhotoUrl, currentCoverPhotoUrl }: FacilityPhotosSectionProps) {
    const form = useForm({
        profilePhoto: null as null | File,
        coverPhoto: null as null | File,
    });

    const setProfilePhoto = useCallback((file: File) => form.setData('profilePhoto', file), []);
    const setCoverPhoto = useCallback((file: File) => form.setData('coverPhoto', file), []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(UpdateFacilityPhotosController.update.url(), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const message = page.flash?.[PROFILE_SUCCESS_MESSAGE_KEY];
                if (typeof message === 'string') {
                    toaster.create({ title: message, type: 'success', duration: 4000 });
                }
                form.reset();
            },
        });
    };

    const hasChanges = form.data.profilePhoto !== null || form.data.coverPhoto !== null;

    return (
        <Box as="section" borderWidth={1} borderRadius={8} bg="white" padding={6}>
            <Heading size="md" marginBottom={4}>Photos</Heading>
            <form onSubmit={handleSubmit}>
                <Stack direction={{ base: 'column', md: 'row' }} gap={6} alignItems="flex-start">
                    <Box flex={1}>
                        <Text fontSize="sm" fontWeight="medium" marginBottom={2}>Profile photo</Text>
                        <FacilityProfilePhotoSection currentPhotoUrl={currentProfilePhotoUrl} setData={setProfilePhoto} />
                    </Box>
                    <Box flex={2}>
                        <Text fontSize="sm" fontWeight="medium" marginBottom={2}>Cover photo</Text>
                        <FacilityCoverPhotoSection currentPhotoUrl={currentCoverPhotoUrl} setData={setCoverPhoto} />
                    </Box>
                </Stack>
                <Flex justifyContent="flex-end" marginTop={6}>
                    <Button type="submit" colorPalette="blue" disabled={form.processing || !hasChanges} loading={form.processing}>
                        Save
                    </Button>
                </Flex>
            </form>
        </Box>
    );
}

export default FacilityPhotosSection;
