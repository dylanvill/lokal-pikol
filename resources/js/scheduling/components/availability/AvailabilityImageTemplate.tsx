import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';
import getContrastTextColor from '../../helpers/getContrastTextColor';
import type AvailabilityCourt from '../../models/AvailabilityCourt';

const IMAGE_SIZE_PX = 1080;

interface AvailabilityImageTemplateProps {
    facilityName: string;
    court: AvailabilityCourt;
    dateDisplay: string;
    backgroundColor: string;
}

const AvailabilityImageTemplate = forwardRef<HTMLDivElement, AvailabilityImageTemplateProps>(
    ({ facilityName, court, dateDisplay, backgroundColor }, ref) => {
        const textColor = getContrastTextColor(backgroundColor);
        const mutedColor = textColor === '#000000' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)';

        return (
            <Box
                ref={ref}
                width={`${IMAGE_SIZE_PX}px`}
                height={`${IMAGE_SIZE_PX}px`}
                bg={backgroundColor}
                color={textColor}
                padding="80px"
                display="flex"
                flexDirection="column"
            >
                <Stack gap={2} marginBottom={10}>
                    <Text fontSize="2xl" fontWeight="medium" color={mutedColor}>
                        {facilityName}
                    </Text>
                    <Heading as="h1" size="4xl" lineHeight="1.1">
                        {court.name}
                    </Heading>
                    <Text fontSize="2xl" color={mutedColor}>
                        {dateDisplay}
                    </Text>
                </Stack>

                <Box flex="1" display="grid" gridTemplateColumns="1fr 1fr" gap="16px 48px" alignContent="start">
                    {court.slots.map((slot) => {
                        const taken = slot.isAvailable === false;
                        return (
                            <Box key={slot.slot} position="relative" display="inline-block" width="fit-content">
                                <Text
                                    fontSize="3xl"
                                    fontWeight={taken ? 'normal' : 'semibold'}
                                    opacity={taken ? 0.45 : 1}
                                >
                                    {slot.display}
                                </Text>
                                {taken && (
                                    <Box
                                        position="absolute"
                                        top="75%"
                                        left={0}
                                        right={0}
                                        height="3px"
                                        bg={textColor}
                                        opacity={0.6}
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        );
    },
);

AvailabilityImageTemplate.displayName = 'AvailabilityImageTemplate';

export { IMAGE_SIZE_PX };
export default AvailabilityImageTemplate;
