import { Box, Field, Heading, Separator, Text, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { LuMapPin } from 'react-icons/lu';
import CourtTypesSection from '../../components/directory/RegistrationForm/CourtTypesSection';
import DirectoryCoverPhotoSection from '../../components/directory/RegistrationForm/DirectoryCoverPhotoSection';
import DirectoryProfilePhotoSection from '../../components/directory/RegistrationForm/DirectoryProfilePhotoSection';
import NumberOfCourtsSection from '../../components/directory/RegistrationForm/NumberOfCourtsSection';
import TitleSection from '../../components/directory/RegistrationForm/TitleSection';
import FormSectionHeader from '../../components/shared/FormSectionHeader';
import ListingLayout from '../../layouts/listing/ListingLayout';
import CitySection from '../../components/directory/RegistrationForm/CitySection';

function RegisterPage() {
    const form = useForm({
        name: '',
        city: '',
        address: '',
        courtTypes: '',
        numberOfCourts: '',
        email: '',
        phone: '',
        openingTime: '',
        closingTime: '',
        profilePhoto: null,
        coverPhoto: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/directory/register', {
            preserveScroll: true,
        });
    };

    return (
        <ListingLayout
            title="Facility Registration"
            contentContainerProps={{
                maxWidth: 'xl',
            }}
        >
            <Box>
                <Heading>Get Your Court Listed!</Heading>
                <Text>
                    Join the definitive directory of pickleball courts in Negros Oriental. Get discovered by players in your area. Simply provide your
                    court details below to get started.
                </Text>
            </Box>
            <Separator marginY={12} width={40} marginX="auto" />
            <form onSubmit={handleSubmit}>
                <Box>
                    <Box>
                        <Field.Root>
                            <Field.HelperText marginBottom={2}>
                                Choose eye-catching photos that showcase your courts and attract players. Cover photo should highlight your facility,
                                while profile photo works as your recognizable logo or main court view.
                            </Field.HelperText>
                        </Field.Root>
                        <Box zIndex={1}>
                            <DirectoryCoverPhotoSection form={form} />
                        </Box>
                        <Box zIndex={2} marginTop={-28} marginLeft={8}>
                            <DirectoryProfilePhotoSection form={form} />
                        </Box>
                    </Box>
                    <TitleSection form={form} />
                    <VStack alignItems="stretch" gap={4}>
                        <NumberOfCourtsSection form={form} />
                        <CourtTypesSection form={form} />
                    </VStack>
                    <Box marginTop={8}>
                        <FormSectionHeader
                            icon={<LuMapPin size={24} />}
                            title="Location details"
                            description="Help players find and visit your courts"
                        />
                        <CitySection form={form} />
                    </Box>
                </Box>
            </form>
        </ListingLayout>
    );
}

export default RegisterPage;
