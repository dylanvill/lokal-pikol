import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import FacilityDetailsSection from '../../components/profile/FacilityDetailsSection';
import FacilityHoursSection from '../../components/profile/FacilityHoursSection';
import FacilityPhotosSection from '../../components/profile/FacilityPhotosSection';
import FacilitySocialLinksSection from '../../components/profile/FacilitySocialLinksSection';
import SchedulingLayout from '../../layouts/SchedulingLayout';

interface FacilityProfileEdit {
    name: string;
    courtType: string | null;
    numberOfCourts: number | null;
    email: string | null;
    phone: string | null;
    openingTime: string | null;
    closingTime: string | null;
    googleMapsUrl: string | null;
    bookingUrl: string | null;
    facebookUrl: string | null;
    instagramUrl: string | null;
    currentProfilePhotoUrl: string | null;
    currentCoverPhotoUrl: string | null;
}

interface EditProfilePageProps {
    facility: FacilityProfileEdit;
}

function EditProfilePage({ facility }: EditProfilePageProps) {
    return (
        <SchedulingLayout title="Edit Facility Profile">
            <Box maxWidth="3xl" marginX="auto">
                <Box marginBottom={6}>
                    <Heading size="lg">Edit your facility profile</Heading>
                    <Text color="gray.600" fontSize="sm" marginTop={1}>
                        Changes are saved per section.
                    </Text>
                </Box>
                <Stack gap={6}>
                    <FacilityPhotosSection
                        currentProfilePhotoUrl={facility.currentProfilePhotoUrl}
                        currentCoverPhotoUrl={facility.currentCoverPhotoUrl}
                    />
                    <FacilityDetailsSection
                        initial={{
                            name: facility.name,
                            courtType: facility.courtType,
                            numberOfCourts: facility.numberOfCourts,
                            email: facility.email,
                            phone: facility.phone,
                            googleMapsUrl: facility.googleMapsUrl,
                            bookingUrl: facility.bookingUrl,
                        }}
                    />
                    <FacilityHoursSection
                        initial={{
                            openingTime: facility.openingTime,
                            closingTime: facility.closingTime,
                        }}
                    />
                    <FacilitySocialLinksSection
                        initial={{
                            facebookUrl: facility.facebookUrl,
                            instagramUrl: facility.instagramUrl,
                        }}
                    />
                </Stack>
            </Box>
        </SchedulingLayout>
    );
}

export default EditProfilePage;
