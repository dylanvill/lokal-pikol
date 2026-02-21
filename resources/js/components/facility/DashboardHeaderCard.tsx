import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { LuCalendar } from 'react-icons/lu';
import useFacility from '../../lib/hooks/useFacility';

function DashboardHeaderCard() {
    const { facility } = useFacility();

    const today = dayjs().format('dddd, MMMM D, YYYY');

    return (
        <Box>
            <Flex justify="space-between" align="start" mb={4}>
                <Box>
                    <Heading size="lg" mb={2} color="blue.700">
                        Welcome back, {facility?.name}!
                    </Heading>
                    <Flex align="center" gap={2} color="gray.600">
                        <LuCalendar />
                        <Text>{today}</Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default DashboardHeaderCard;
