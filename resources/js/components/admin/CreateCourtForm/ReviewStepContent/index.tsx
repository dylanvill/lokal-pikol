import { Box, HStack, Image, SimpleGrid, Text, VStack, useStepsContext } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { LuCloudMoon, LuCloudSun, LuMoonStar, LuSun } from 'react-icons/lu';
import CtaButtonContainer from '../CtaButtonContainer';
import { type CreateFormData } from '../hooks/useCreateCourtForm';
import PreviousButton from '../PreviousButton';
import StepContentContainer from '../StepContentContainer';
import FieldDisplay from './FieldDisplay';

const timeSlotItems = [
    { value: '00:00', title: '12:00 AM', icon: <LuCloudMoon /> },
    { value: '01:00', title: '1:00 AM', icon: <LuCloudMoon /> },
    { value: '02:00', title: '2:00 AM', icon: <LuCloudMoon /> },
    { value: '03:00', title: '3:00 AM', icon: <LuCloudMoon /> },
    { value: '04:00', title: '4:00 AM', icon: <LuCloudMoon /> },
    { value: '05:00', title: '5:00 AM', icon: <LuCloudMoon /> },
    { value: '06:00', title: '6:00 AM', icon: <LuCloudSun /> },
    { value: '07:00', title: '7:00 AM', icon: <LuCloudSun /> },
    { value: '08:00', title: '8:00 AM', icon: <LuCloudSun /> },
    { value: '09:00', title: '9:00 AM', icon: <LuCloudSun /> },
    { value: '10:00', title: '10:00 AM', icon: <LuCloudSun /> },
    { value: '11:00', title: '11:00 AM', icon: <LuSun /> },
    { value: '12:00', title: '12:00 PM', icon: <LuSun /> },
    { value: '13:00', title: '1:00 PM', icon: <LuSun /> },
    { value: '14:00', title: '2:00 PM', icon: <LuSun /> },
    { value: '15:00', title: '3:00 PM', icon: <LuSun /> },
    { value: '16:00', title: '4:00 PM', icon: <LuSun /> },
    { value: '17:00', title: '5:00 PM', icon: <LuSun /> },
    { value: '18:00', title: '6:00 PM', icon: <LuMoonStar /> },
    { value: '19:00', title: '7:00 PM', icon: <LuMoonStar /> },
    { value: '20:00', title: '8:00 PM', icon: <LuMoonStar /> },
    { value: '21:00', title: '9:00 PM', icon: <LuMoonStar /> },
    { value: '22:00', title: '10:00 PM', icon: <LuMoonStar /> },
    { value: '23:00', title: '11:00 PM', icon: <LuMoonStar /> },
];

export interface ReviewStepContentProps {
    formData: Partial<CreateFormData>;
    onSubmit: () => void;
}

function ReviewStepContent({ formData, onSubmit }: ReviewStepContentProps) {
    const { goToNextStep } = useStepsContext();

    const handleSubmit = () => {
        onSubmit();
        goToNextStep();
    };

    const selectedTimeSlots = formData.slots?.map((slotValue) => timeSlotItems.find((item) => item.value === slotValue)).filter(Boolean) || [];

    return (
        <StepContentContainer key={3} index={3} title="Review Details">
            <VStack gap={4} align="stretch">
                <FieldDisplay label="Name">{formData.name || 'Not provided'}</FieldDisplay>
                <FieldDisplay label="Type">
                    {formData.type ? formData.type.charAt(0).toUpperCase() + formData.type.slice(1) : 'Not provided'}
                </FieldDisplay>

                <FieldDisplay label={`Photos (${formData.photos?.length || 0})`}>
                    {formData.photos && formData.photos.length > 0 ? (
                        <SimpleGrid columns={{ base: 2, md: 3 }} gap={4} marginTop={4}>
                            {formData.photos.slice(0, 6).map((photo, index) => (
                                <Box key={index} aspectRatio={1} borderRadius="md" overflow="hidden">
                                    <Image
                                        src={URL.createObjectURL(photo)}
                                        alt={`Court photo ${index + 1}`}
                                        objectFit="cover"
                                        width="100%"
                                        height="100%"
                                    />
                                </Box>
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Text color="gray.500">No photos uploaded</Text>
                    )}
                </FieldDisplay>

                <FieldDisplay label={`Court Slots ${selectedTimeSlots.length}`}>
                    {selectedTimeSlots.length > 0 ? (
                        <SimpleGrid columns={{ base: 2, md: 4 }} gap={2} marginTop={4}>
                            {selectedTimeSlots.map((slot, index) => (
                                <HStack key={index} p={3} borderRadius="md" borderWidth={1} borderColor="gray.200" bg="gray.50">
                                    {slot!.icon}
                                    <Text fontSize="sm" fontWeight="medium">
                                        {slot!.title}
                                    </Text>
                                </HStack>
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Text color="gray.500">No time slots selected</Text>
                    )}
                </FieldDisplay>

                <CtaButtonContainer
                    renderPrevious={<PreviousButton disabled={true} />}
                    renderNext={
                        <Button
                            colorPalette="blue"
                            size="sm"
                            onClick={handleSubmit}
                            disabled={!formData.name || !formData.type || !formData.photos?.length || !formData.slots?.length}
                            loadingText="Creating Court"
                            loading={true}
                        >
                            Create Court
                        </Button>
                    }
                />
            </VStack>
        </StepContentContainer>
    );
}

export default ReviewStepContent;
