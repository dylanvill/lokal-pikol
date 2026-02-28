import { Box, Button, Editable, Field, Flex, Input, InputGroup, NativeSelect, Textarea, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import { LuFile, LuPencil, LuUser } from 'react-icons/lu';
import CoverPhotoSection from './CoverPhotoSection';
import PaymentQrCodeSection from './PaymentQrCodeSection';
import ProfilePhotoSection from './ProfilePhotoSection';
import SectionHeader from './SectionHeader';

interface OnboardingFormProps extends PageProps {
    cities: string[];
    email: string;
    name: string;
    onboardingId: string;
}

function OnboardingForm() {
    const { props } = usePage<OnboardingFormProps>();

    const cities = props.cities || [];

    const form = useForm({
        name: props.name,
        city: '',
        address: '',
        googleMapsUrl: '',
        phone: '',
        openingTime: '07:00',
        closingTime: '22:00',
        description: '',
        email: props.email,
        password: '',
        password_confirmation: '',
        coverPhoto: null,
        profilePhoto: null,
        paymentQrCode: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.transform((data) => {
            return {
                ...data,
                onboardingId: props.onboardingId,
                closingTime: data.closingTime === '00:00' ? '24:00' : data.closingTime,
            };
        });

        form.post('/facility/auth/register');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <Box zIndex={1}>
                    <CoverPhotoSection form={form} />
                </Box>
                <Box zIndex={2} marginTop={-28} marginLeft={8}>
                    <ProfilePhotoSection form={form} />
                </Box>
                <Editable.Root
                    value={form.data.name}
                    onValueChange={(e) => form.setData('name', e.value)}
                    textAlign="start"
                    defaultValue="Click to edit"
                    marginTop={4}
                    marginBottom={12}
                    required
                >
                    <LuPencil />
                    <Editable.Preview fontSize="3xl" width="full" fontWeight="medium" lineHeight={1.25} />
                    <Editable.Input fontSize="3xl" width="full" fontWeight="medium" />
                </Editable.Root>

                <SectionHeader icon={<LuFile size={20} />} title="Facility Information" description="Provide details about your facility." />
                <VStack gap={4} marginBottom={8}>
                    <Field.Root invalid={!!form.errors.city}>
                        <Field.Label>City</Field.Label>
                        <NativeSelect.Root size="sm" invalid={!!form.errors.city}>
                            <NativeSelect.Field
                                placeholder="Select option"
                                value={form.data.city}
                                onChange={(e) => form.setData('city', e.currentTarget.value)}
                            >
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                        <Field.ErrorText>{form.errors.city}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!form.errors.address}>
                        <Field.Label>Full Address</Field.Label>
                        <Input
                            placeholder="Near Ace, Claytown, Felomino Cimafranca, Daro"
                            value={form.data.address}
                            onChange={(e) => form.setData('address', e.currentTarget.value)}
                            required
                        />
                        <Field.ErrorText>{form.errors.address}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!form.errors.googleMapsUrl}>
                        <Field.Label>Google Maps URL</Field.Label>
                        <Input
                            placeholder="https://maps.google.com/?q=location"
                            value={form.data.googleMapsUrl}
                            onChange={(e) => form.setData('googleMapsUrl', e.currentTarget.value)}
                            type="url"
                        />
                        <Field.ErrorText>{form.errors.googleMapsUrl}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!form.errors.phone}>
                        <Field.Label>Phone</Field.Label>
                        <InputGroup startElement="+63">
                            <Input
                                placeholder="916 123 4567"
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.currentTarget.value)}
                                type="tel"
                                required
                            />
                        </InputGroup>
                        <Field.ErrorText>{form.errors.phone}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!form.errors.openingTime}>
                        <Field.Label>Opening Time</Field.Label>
                        <Input
                            placeholder="Enter opening time"
                            value={form.data.openingTime}
                            onChange={(e) => form.setData('openingTime', e.currentTarget.value)}
                            type="time"
                            required
                        />
                        <Field.ErrorText>{form.errors.openingTime}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!form.errors.closingTime}>
                        <Field.Label>Closing Time</Field.Label>
                        <Input
                            placeholder="Enter closing time"
                            value={form.data.closingTime}
                            onChange={(e) => form.setData('closingTime', e.currentTarget.value)}
                            type="time"
                            required
                        />
                        <Field.ErrorText>{form.errors.closingTime}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!form.errors.description}>
                        <Field.Label>Description</Field.Label>
                        <Textarea
                            placeholder="Enter description"
                            value={form.data.description}
                            onChange={(e) => form.setData('description', e.currentTarget.value)}
                        ></Textarea>
                        <Field.ErrorText>{form.errors.description}</Field.ErrorText>
                    </Field.Root>
                </VStack>

                <Box marginBottom={8}>
                    <SectionHeader
                        icon={<LuFile size={20} />}
                        title="Payment QR Code"
                        description="This QR code will be used by users to make payments. Please upload a QR code that is linked to your facility's payment account."
                    />
                <PaymentQrCodeSection form={form} />
                </Box>
                <SectionHeader
                    icon={<LuUser size={20} />}
                    title="Login Information"
                    description="The information that you put in here will be used to log in to your facility account to manage courts and reservations."
                />
                <VStack gap={4} marginBottom={8}>
                    <Field.Root invalid={!!form.errors.email}>
                        <Field.Label>Email</Field.Label>
                        <Input
                            placeholder="Enter email address"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.currentTarget.value)}
                            type="email"
                            required
                        />
                        <Field.HelperText>
                            The email that you put in here will be the same contact email customers will use to reach you.
                        </Field.HelperText>
                        <Field.ErrorText>{form.errors.email}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!form.errors.password}>
                        <Field.Label>Password</Field.Label>
                        <Input
                            placeholder="Enter password"
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.currentTarget.value)}
                            type="password"
                            required
                        />
                        <Field.ErrorText>{form.errors.password}</Field.ErrorText>
                        {!form.errors.password && (
                            <Field.HelperText>
                                Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
                            </Field.HelperText>
                        )}
                    </Field.Root>
                    <Field.Root invalid={!!form.errors.password_confirmation}>
                        <Field.Label>Confirm Password</Field.Label>
                        <Input
                            placeholder="Confirm password"
                            value={form.data.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation', e.currentTarget.value)}
                            type="password"
                            required
                        />
                        <Field.ErrorText>{form.errors.password_confirmation}</Field.ErrorText>
                    </Field.Root>
                    <Flex width="full" justifyContent="flex-end">
                        <Button type="submit" disabled={form.processing}>
                            Finish Setup
                        </Button>
                    </Flex>
                </VStack>
            </Box>
        </form>
    );
}

export default OnboardingForm;
