import { Box, Separator, Text } from '@chakra-ui/react';
import currencyFormatter from '../../../helpers/currencyFormatter';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';
import getSlotPrice from '../../../lib/getSlotPrice';
import type CourtSlot from '../../../models/customer/court/CourtSlot';

export interface ReservationSlotCardProps {
    startTime: string;
    endTime: string;
    courtSlots: CourtSlot[];
}

function ReservationSlotCard({ startTime, endTime, courtSlots }: ReservationSlotCardProps) {
    const startTimeDisplay = militaryTimeToAmPmTime(startTime);
    const endTimeDisplay = militaryTimeToAmPmTime(endTime);

    const price = getSlotPrice(courtSlots, startTime);

    return (
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={2} textAlign="center" bg="blue.50" color="blue.700" fontSize="sm">
            <Text>{`${startTimeDisplay} - ${endTimeDisplay}`}</Text>
            <Separator my={1} colorPalette="blue" />
            <Text fontSize="xs" fontWeight="bold">
                {price > 0 ? currencyFormatter(price) : 'Error'}
            </Text>
        </Box>
    );
}

export default ReservationSlotCard;
