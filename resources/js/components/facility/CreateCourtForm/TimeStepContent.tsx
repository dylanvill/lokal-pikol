import { Box, CheckboxCard, CheckboxGroup, Fieldset, Icon, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { useFormContext } from '@inertiajs/react';
import { LuClock, LuCloudMoon, LuCloudSun, LuMoonStar, LuSun } from 'react-icons/lu';
import SectionContainer from './SectionContainer';
import { useMemo } from 'react';

const items = [
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

function TimeStepContent() {
    const form = useFormContext()!;

    const hasSlotError = useMemo(() => {
        return !!form.errors.slots || Object.keys(form.errors).some((key) => key.startsWith('slots.') && key.endsWith('.rate'));
    }, [form.errors]);

    return (
        <SectionContainer
            renderIcon={() => <LuClock size={24} />}
            title="Available Time Slots"
            description="Select the time slots when your court will be available for bookings."
        >
            <Fieldset.Root>
                {!!form.errors.slots && (
                    <Text fontSize="sm" color="red.500">
                        {form.errors.slots}
                    </Text>
                )}
                {!!hasSlotError && (
                    <Text fontSize="sm" color="red.500">
                        Please ensure that all selected time slots have valid rates.
                    </Text>
                )}
                <CheckboxGroup>
                    <SimpleGrid columns={4} gap={4}>
                        {items.map((item) => (
                            <Box>
                                <CheckboxCard.Root key={item.value} value={item.value}>
                                    <CheckboxCard.HiddenInput name={`slot-${item.value}`} />
                                    <CheckboxCard.Control>
                                        <CheckboxCard.Label display="flex" flexDirection="column">
                                            <Icon fontSize="2xl" color="fg.subtle">
                                                {item.icon}
                                            </Icon>
                                            {item.title}
                                        </CheckboxCard.Label>
                                    </CheckboxCard.Control>
                                </CheckboxCard.Root>
                                <Input type="number" color="blue.700" fontWeight="bold" name={`rate-${item.value}`} marginTop={2} placeholder="₱xxx.xx" textAlign="center" />
                            </Box>
                        ))}
                    </SimpleGrid>
                </CheckboxGroup>
            </Fieldset.Root>
        </SectionContainer>
    );
}

export default TimeStepContent;
