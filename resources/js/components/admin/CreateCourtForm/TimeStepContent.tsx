import { CheckboxCard, CheckboxGroup, Icon, SimpleGrid } from '@chakra-ui/react';
import { LuCloudMoon, LuCloudSun, LuMoonStar, LuSun } from 'react-icons/lu';
import StepContentContainer from './StepContentContainer';

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
    return (
        <StepContentContainer key={2} index={2} title="Available Time Slots">
            <CheckboxGroup defaultValue={[]}>
                <SimpleGrid columns={4} gap={4}>
                    {items.map((item) => (
                        <CheckboxCard.Root key={item.value} value={item.value}>
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control>
                                <CheckboxCard.Label display="flex" flexDirection="column">
                                    <Icon fontSize="2xl" color="fg.subtle">
                                        {item.icon}
                                    </Icon>
                                    {item.title}
                                </CheckboxCard.Label>
                            </CheckboxCard.Control>
                        </CheckboxCard.Root>
                    ))}
                </SimpleGrid>
            </CheckboxGroup>
        </StepContentContainer>
    );
}

export default TimeStepContent;
