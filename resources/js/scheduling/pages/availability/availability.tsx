import { Card, HStack, SimpleGrid, Stack, VStack } from '@chakra-ui/react';
import { parseDate } from '@chakra-ui/react';
import AvailabilityBrandColorPicker from '../../components/availability/AvailabilityBrandColorPicker';
import AvailabilityCopyButton from '../../components/availability/AvailabilityCopyButton';
import AvailabilityCourtCard from '../../components/availability/AvailabilityCourtCard';
import AvailabilityEmptyState from '../../components/availability/AvailabilityEmptyState';
import DatePickerField from '@/shared/components/DatePickerField';
import { formatAllCourtsAvailabilityText } from '../../helpers/formatAvailabilityText';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type AvailabilityCourt from '../../models/AvailabilityCourt';
import { type DateString } from '../../types/DateTime';
import type SchedulingPageProps from '../../types/SchedulingPageProps';
import useAvailabilityPage from './hooks/useAvailabilityPage';
import useBrandColor from './hooks/useBrandColor';

interface AvailabilityPageProps extends SchedulingPageProps {
    date: DateString;
    facilityName: string;
    courts: AvailabilityCourt[];
}

function AvailabilityPage({ date, facilityName, courts }: AvailabilityPageProps) {
    const { dateDisplay, handleDateChange } = useAvailabilityPage(date);
    const { color: brandColor, setColor: setBrandColor } = useBrandColor();

    if (courts.length === 0) {
        return (
            <SchedulingLayout title="Availability">
                <AvailabilityEmptyState />
            </SchedulingLayout>
        );
    }

    const allCourtsText = formatAllCourtsAvailabilityText(courts, dateDisplay);

    return (
        <SchedulingLayout title="Availability">
            <VStack align="stretch" gap={6}>
                <Card.Root variant="outline">
                    <Card.Body>
                        <Stack gap={4}>
                            <HStack justify="space-between" align="center" wrap="wrap" gap={4}>
                                <DatePickerField
                                    value={parseDate(date)}
                                    onValueChange={handleDateChange}
                                    label="Viewing availability on:"
                                />
                                <AvailabilityCopyButton
                                    text={allCourtsText}
                                    label="Copy all courts"
                                    size="sm"
                                    variant="solid"
                                />
                            </HStack>
                            <AvailabilityBrandColorPicker value={brandColor} onChange={setBrandColor} />
                        </Stack>
                    </Card.Body>
                </Card.Root>

                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={4}>
                    {courts.map((court) => (
                        <AvailabilityCourtCard
                            key={court.id}
                            facilityName={facilityName}
                            court={court}
                            date={date}
                            dateDisplay={dateDisplay}
                            backgroundColor={brandColor}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
        </SchedulingLayout>
    );
}

export default AvailabilityPage;
