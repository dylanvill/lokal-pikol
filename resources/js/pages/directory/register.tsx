import { Box, Button, Checkbox, Field, Heading, HStack, Input, InputGroup, Separator, Text, VStack } from '@chakra-ui/react';
import { useForm, usePage } from '@inertiajs/react';
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
    const { props } = usePage<{ uuid: string; token: string }>();

    const uuid = props.uuid;
    const token = props.token;

    const form = useForm({
        name: '',
        city: '',
        address: '',
        googleMapsUrl: '',
        courtType: '',
        numberOfCourts: '',
        email: '',
        phone: '',
        openingTime: '',
        closingTime: '',
        facebookPageUrl: '',
        bookingPageUrl: '',
        instagramUrl: '',
        profilePhoto: null as null | File,
        coverPhoto: null as null | File,
    }).withPrecognition(store());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.clearErrors();
        form.transform((data) => ({
            ...data,
            uuid,
            token,
        }));
        form.submit(store());
    };

    const setCoverPhoto = useCallback((file: File) => {
        form.setData('coverPhoto', file);
    }, []);

    const setProfilePhoto = useCallback((file: File) => {
        form.setData('profilePhoto', file);
    }, []);

    const handleTimeChanged = (field: 'openingTime' | 'closingTime', value: string) => {
        const hour = value.split(':')[0];
        if (hour) {
            form.setData(field, `${hour}:00`);
        }
    };

    return (
        <ListingLayout
            title="Facility Registration"
            contentContainerProps={{
                maxWidth: 'xl',
            }}
        >
            <Box>
                <Heading>Add Your Court to the Directory</Heading>
                <Text>
                    Help players in Negros Oriental discover your pickleball court. Simply provide your court details below and we'll include it in
                    the public directory.
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
                        <Field.Root invalid={!!form.errors.profilePhoto || !!form.errors.coverPhoto}>
                            <Field.ErrorText>{form.errors.profilePhoto}</Field.ErrorText>
                            <Field.ErrorText>{form.errors.coverPhoto}</Field.ErrorText>
                        </Field.Root>
                    </Box>
                    <FormSectionHeader
                        icon={<LuBuilding2 size={24} />}
                        title="Facility Details"
                        description="General information about your facility"
                    />
                    <VStack alignItems="stretch" gap={4} marginTop={4}>
                        <Field.Root>
                            <Field.Label>
                                <span style={{ color: 'red' }}>*</span>Facility Name
                            </Field.Label>
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
                        <HStack alignItems="flex-start">
                            <Field.Root invalid={!!form.errors.openingTime}>
                                <Field.Label>Opening time (optional)</Field.Label>
                                <Input
                                    type="time"
                                    name="openingTime"
                                    placeholder="07:00:00"
                                    value={form.data.openingTime}
                                    onChange={(e) => handleTimeChanged('openingTime', e.target.value)}
                                    onBlur={() => form.validate('openingTime')}
                                    disabled={form.processing}
                                />
                                <Field.ErrorText>{form.errors.openingTime}</Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={!!form.errors.closingTime}>
                                <Field.Label>Closing time (optional)</Field.Label>
                                <Input
                                    type="time"
                                    name="closingTime"
                                    placeholder="22:00:00"
                                    value={form.data.closingTime}
                                    onChange={(e) => handleTimeChanged('closingTime', e.target.value)}
                                    onBlur={() => form.validate('closingTime')}
                                    disabled={form.processing}
                                />
                                <Field.ErrorText>{form.errors.closingTime}</Field.ErrorText>
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
                                <Field.Label>
                                    <span style={{ color: 'red' }}>*</span>Full address
                                </Field.Label>
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
                            <Field.Root invalid={!!form.errors.bookingPageUrl}>
                                <Field.Label>Booking URL (optional)</Field.Label>
                                <Input
                                    placeholder="https://www.custom-booking.com"
                                    value={form.data.bookingPageUrl}
                                    onChange={(e) => form.setData('bookingPageUrl', e.target.value)}
                                    onBlur={() => form.validate('bookingPageUrl')}
                                    disabled={form.processing}
                                />
                                <Field.HelperText>
                                    The website where your players can reserve your courts. You can put your Facebook page URL if you use Facebook for
                                    bookings, otherwise you can just leave this blank.
                                </Field.HelperText>
                                <Field.ErrorText>{form.errors.bookingPageUrl}</Field.ErrorText>
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
                            <Field.Root invalid={!!form.errors.instagramUrl}>
                                <Field.Label>Instagram URL (optional)</Field.Label>
                                <Input
                                    placeholder="https://www.instagram.com/yourpage"
                                    value={form.data.instagramUrl}
                                    onChange={(e) => form.setData('instagramUrl', e.target.value)}
                                    onBlur={() => form.validate('instagramUrl')}
                                    disabled={form.processing}
                                />
                                <Field.ErrorText>{form.errors.instagramUrl}</Field.ErrorText>
                            </Field.Root>
                        </VStack>
                    </Box>
                </Box>
                <Box>
                    <Checkbox.Root marginTop={4} required>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>
                            <span style={{ color: 'red' }}>*</span> By submitting this form, you agree to our terms and conditions.
                        </Checkbox.Label>
                    </Checkbox.Root>
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
                </Box>
            </form>
        </ListingLayout>
    );
}

export default RegisterPage;
