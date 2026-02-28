import { Button, Card, Field, Flex, Input, InputGroup, Textarea, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { LuFile } from 'react-icons/lu';
import SectionHeader from '../OnboardingForm/SectionHeader';

interface FacilityInformationFormProps {
    facilityName?: string;
    facilityCity?: string;
    facilityAddress?: string;
    facilityEmail?: string;
    facilityPhone?: string;
    facilityDescription?: string;
    facilityOpeningTime?: string;
    facilityClosingTime?: string;
    facilityGoogleMapsUrl?: string;
}

function FacilityInformationForm({
    facilityName = 'Sample Facility Name',
    facilityCity = 'Sample City',
    facilityAddress = 'Sample Address',
    facilityEmail = 'facility@example.com',
    facilityPhone = '916 123 4567',
    facilityDescription = 'Sample facility description',
    facilityOpeningTime = '07:00',
    facilityClosingTime = '22:00',
    facilityGoogleMapsUrl = 'https://maps.google.com/?q=sample'
}: FacilityInformationFormProps) {
    const form = useForm({
        address: facilityAddress,
        phone: facilityPhone,
        description: facilityDescription,
        openingTime: facilityOpeningTime,
        closingTime: facilityClosingTime,
        googleMapsUrl: facilityGoogleMapsUrl,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.transform((data) => {
            return {
                ...data,
                closingTime: data.closingTime === '00:00' ? '24:00' : data.closingTime,
            };
        });

        form.put('/facility/information', {
            onSuccess: () => {
                // Show success message
            },
        });
    };

    return (
        <Card.Root>
            <Card.Header>
                <SectionHeader
                    icon={<LuFile />}
                    title="Facility Information"
                    description="Manage your facility information, including name, address, contact details, and other relevant information."
                />
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <VStack gap={4}>
                        {/* Read-only fields */}
                        <Field.Root>
                            <Field.Label>Facility Name</Field.Label>
                            <Input
                                value={facilityName}
                                readOnly
                                bg="gray.50"
                                cursor="not-allowed"
                            />
                            <Field.HelperText>
                                Contact support to change your facility name.
                            </Field.HelperText>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>City</Field.Label>
                            <Input
                                value={facilityCity}
                                readOnly
                                bg="gray.50"
                                cursor="not-allowed"
                            />
                            <Field.HelperText>
                                Contact support to change your facility city.
                            </Field.HelperText>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Email Address</Field.Label>
                            <Input
                                value={facilityEmail}
                                readOnly
                                bg="gray.50"
                                cursor="not-allowed"
                                type="email"
                            />
                            <Field.HelperText>
                                Contact support to change your email address.
                            </Field.HelperText>
                        </Field.Root>

                        {/* Editable fields */}
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

                        <Field.Root invalid={!!form.errors.description}>
                            <Field.Label>Description</Field.Label>
                            <Textarea
                                placeholder="Enter description"
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.currentTarget.value)}
                            />
                            <Field.ErrorText>{form.errors.description}</Field.ErrorText>
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

                        <Flex width="full" justifyContent="flex-end">
                            <Button 
                                type="submit" 
                                disabled={form.processing}
                                colorPalette="blue"
                            >
                                Save Changes
                            </Button>
                        </Flex>
                    </VStack>
                </form>
            </Card.Body>
        </Card.Root>
    );
}

export default FacilityInformationForm;
