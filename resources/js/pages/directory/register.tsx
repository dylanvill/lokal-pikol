import { Box, Button, Field, Heading, HStack, Input, InputGroup, Separator, Text, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useCallback } from 'react';
import { LuContact, LuMapPin, LuBuilding2 } from 'react-icons/lu';
import { store } from '@/actions/App/Http/Directory/Controllers/CreateListingController';
import CitySection from '../../components/directory/RegistrationForm/CitySection';
import CourtTypesSection from '../../components/directory/RegistrationForm/CourtTypesSection';
import DirectoryCoverPhotoSection from '../../components/directory/RegistrationForm/DirectoryCoverPhotoSection';
import DirectoryProfilePhotoSection from '../../components/directory/RegistrationForm/DirectoryProfilePhotoSection';
import NumberOfCourtsSection from '../../components/directory/RegistrationForm/NumberOfCourtsSection';
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
        profilePhoto: null as null | File,
        coverPhoto: null as null | File,
    }).withPrecognition(store());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.clearErrors();
        form.submit(store(), {
            preserveScroll: true,
        });
    };

    const setCoverPhoto = useCallback((file: File) => {
        form.setData('coverPhoto', file);
    }, []);

    const setProfilePhoto = useCallback((file: File) => {
        form.setData('profilePhoto', file);
    }, []);

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
                    Join the owner-verified directory of pickleball courts in Negros Oriental. Get discovered by players in your area. Simply provide your
                    court details below to get started.
                </Text>
            </Box>
            <Separator marginY={8} width={40} marginX="auto" />
            <form onSubmit={handleSubmit}>
                <Box>
                    <Box marginBottom={8}>
                        <Box zIndex={1}>
                            <DirectoryCoverPhotoSection setData={setCoverPhoto} />
                        </Box>
                        <Box zIndex={2} marginTop={{ base: -24, md: -32 }} marginLeft={{ base: 8, md: 12 }}>
                            <DirectoryProfilePhotoSection setData={setProfilePhoto} />
                        </Box>
                    </Box>
                    <FormSectionHeader
                        icon={<LuBuilding2 size={24} />}
                        title="Facility Details"
                        description="General information about your facility"
                    />
                    <VStack alignItems="stretch" gap={4} marginTop={4}>
                        <Field.Root>
                            <Field.Label>Facility Name</Field.Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter facility name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                onBlur={() => form.validate('name')}
                                required
                                disabled={form.processing}
                            />
                        </Field.Root>
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
                                    disabled={form.processing}
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
                                    disabled={form.processing}
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
                                    onBlur={() => form.validate('address')}
                                    required
                                    placeholder="Facility Address"
                                    disabled={form.processing}
                                />
                                <Field.HelperText marginTop={2}>
                                    Provide the address of your facility (you can include landmarks) to help players find you easily.
                                </Field.HelperText>
                            </Field.Root>
                            <Field.Root invalid={!!form.errors.googleMapsUrl}>
                                <Field.Label>Google Maps URL (optional)</Field.Label>
                                <Input
                                    name="googleMapsUrl"
                                    value={form.data.googleMapsUrl}
                                    onChange={(e) => form.setData('googleMapsUrl', e.target.value)}
                                    placeholder="https://www.google.com/maps/place/Your+Facility"
                                    onBlur={() => form.validate('googleMapsUrl')}
                                    disabled={form.processing}
                                />
                                <Field.ErrorText>{form.errors.googleMapsUrl}</Field.ErrorText>
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
                            <Field.Root invalid={!!form.errors.email}>
                                <Field.Label>Email (optional)</Field.Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.data.email}
                                    onChange={(e) => form.setData('email', e.target.value)}
                                    onBlur={() => form.validate('email')}
                                    disabled={form.processing}
                                />
                                <Field.ErrorText>{form.errors.email}</Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={!!form.errors.phone}>
                                <Field.Label>Phone (optional)</Field.Label>
                                <InputGroup startElement="+63">
                                    <Input
                                        placeholder="916 123 4567"
                                        value={form.data.phone}
                                        onChange={(e) => form.setData('phone', e.currentTarget.value)}
                                        type="tel"
                                        onBlur={() => form.validate('phone')}
                                        disabled={form.processing}
                                    />
                                </InputGroup>
                                <Field.ErrorText>{form.errors.phone}</Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={!!form.errors.facebookPageUrl}>
                                <Field.Label>Facebook URL (optional)</Field.Label>
                                <Input
                                    placeholder="https://www.facebook.com/yourpage"
                                    value={form.data.facebookPageUrl}
                                    onChange={(e) => form.setData('facebookPageUrl', e.target.value)}
                                    onBlur={() => form.validate('facebookPageUrl')}
                                    disabled={form.processing}
                                />
                                <Field.ErrorText>{form.errors.facebookPageUrl}</Field.ErrorText>
                            </Field.Root>
                        </VStack>
                    </Box>
                </Box>
                <Button
                    type="submit"
                    colorScheme="blue"
                    marginTop={8}
                    disabled={form.processing}
                    loading={form.processing}
                    loadingText="Posting facility..."
                >
                    Post Facility
                </Button>
            </form>
        </ListingLayout>
    );
}

export default RegisterPage;
