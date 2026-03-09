import { Box, Field, Heading, HStack, Input, InputGroup, Separator, Text, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { LuContact, LuMapPin } from 'react-icons/lu';
import CitySection from '../../components/directory/RegistrationForm/CitySection';
import CourtTypesSection from '../../components/directory/RegistrationForm/CourtTypesSection';
import DirectoryCoverPhotoSection from '../../components/directory/RegistrationForm/DirectoryCoverPhotoSection';
import DirectoryProfilePhotoSection from '../../components/directory/RegistrationForm/DirectoryProfilePhotoSection';
import NumberOfCourtsSection from '../../components/directory/RegistrationForm/NumberOfCourtsSection';
import TitleSection from '../../components/directory/RegistrationForm/TitleSection';
import FormSectionHeader from '../../components/shared/FormSectionHeader';
import ListingLayout from '../../layouts/listing/ListingLayout';

function RegisterPage() {
    const form = useForm({
        name: '',
        city: '',
        address: '',
        googleMapsUrl: '',
        courtTypes: '',
        numberOfCourts: '',
        email: '',
        phone: '',
        openingTime: '',
        closingTime: '',
        facebookPageUrl: '',
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
            <Separator marginY={8} width={40} marginX="auto" />
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
                        <HStack>
                            <Field.Root>
                                <Field.Label>Opening time (optional)</Field.Label>
                                <Input
                                    type="time"
                                    name="openingTime"
                                    placeholder="07:00:00"
                                    value={form.data.openingTime}
                                    onChange={(e) => form.setData('openingTime', e.target.value)}
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Closing time (optional)</Field.Label>
                                <Input
                                    type="time"
                                    name="closingTime"
                                    placeholder="22:00:00"
                                    value={form.data.closingTime}
                                    onChange={(e) => form.setData('closingTime', e.target.value)}
                                />
                            </Field.Root>
                        </HStack>
                    </VStack>
                    <Box marginTop={8}>
                        <FormSectionHeader
                            icon={<LuMapPin size={24} />}
                            title="Location details"
                            description="Help players find and visit your courts"
                        />
                        <VStack gap={4} alignItems="stretch">
                            <CitySection form={form} />
                            <Field.Root>
                                <Field.Label>Full address</Field.Label>
                                <Input
                                    name="address"
                                    value={form.data.address}
                                    onChange={(e) => form.setData('address', e.target.value)}
                                    required
                                    placeholder="Facility Address"
                                />
                                <Field.HelperText marginTop={2}>
                                    Provide the address of your facility (you can include landmarks) to help players find you easily.
                                </Field.HelperText>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Google Maps URL (optional)</Field.Label>
                                <Input
                                    name="googleMapsUrl"
                                    value={form.data.googleMapsUrl}
                                    onChange={(e) => form.setData('googleMapsUrl', e.target.value)}
                                    placeholder="https://www.google.com/maps/place/Your+Facility"
                                />
                            </Field.Root>
                        </VStack>
                    </Box>
                    <Box marginTop={8}>
                        <FormSectionHeader
                            icon={<LuContact size={24} />}
                            title="Contact details"
                            description="Provide contact information so players can reach out with questions or to book courts"
                        />
                        <VStack gap={4} alignItems="stretch">
                            <Field.Root>
                                <Field.Label>Email (optional)</Field.Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.data.email}
                                    onChange={(e) => form.setData('email', e.target.value)}
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Phone (optional)</Field.Label>
                                <InputGroup startElement="+63">
                                    <Input
                                        placeholder="916 123 4567"
                                        value={form.data.phone}
                                        onChange={(e) => form.setData('phone', e.currentTarget.value)}
                                        type="tel"
                                        required
                                    />
                                </InputGroup>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Facebook URL</Field.Label>
                                <Input
                                    placeholder="https://www.facebook.com/yourpage"
                                    value={form.data.facebookPageUrl}
                                    onChange={(e) => form.setData('facebookPageUrl', e.target.value)}
                                />
                            </Field.Root>
                        </VStack>
                    </Box>
                </Box>
            </form>
        </ListingLayout>
    );
}

export default RegisterPage;
