import { Flex, Tag, Text, VStack } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuCalendar, LuClock4, LuMapPin, LuX } from 'react-icons/lu';
import militaryTimeToAmPmTime from '../../helpers/militaryTimeToAmPmTime';

export interface SearchFilterDisplayProps {
    city: string;
    date: string;
    startTime: string;
    endTime: string;
    facilitiesCount: number;
}

function SearchFilterDisplay({ city, date, startTime, endTime, facilitiesCount }: SearchFilterDisplayProps) {
    const dateDisplay = dayjs(date).format('dddd, MMMM D, YYYY');
    const startTimeDisplay = militaryTimeToAmPmTime(startTime);
    const endTimeDisplay = militaryTimeToAmPmTime(endTime);

    return (
        <VStack alignItems="stretch" gap={1}>
            <Text fontSize="sm">{facilitiesCount} facilities available:</Text>
            <Flex gap={2}>
                <Tag.Root size="lg" colorPalette="orange">
                    <Tag.StartElement>
                        <LuMapPin color="black" />
                    </Tag.StartElement>
                    <Tag.Label color="black">{city}</Tag.Label>
                </Tag.Root>
                <Tag.Root size="lg" colorPalette="orange">
                    <Tag.StartElement>
                        <LuCalendar color="black" />
                    </Tag.StartElement>
                    <Tag.Label color="black">{dateDisplay}</Tag.Label>
                </Tag.Root>
                <Tag.Root size="lg" colorPalette="orange">
                    <Tag.StartElement>
                        <LuClock4 color="black" />
                    </Tag.StartElement>
                    <Tag.Label color="black">
                        {startTimeDisplay} - {endTimeDisplay}
                    </Tag.Label>
                </Tag.Root>
                <Link href="/">
                    <Tag.Root variant="solid" backgroundColor="white">
                        <Tag.Label color="black">Clear filters</Tag.Label>
                        <Tag.EndElement>
                            <LuX color="black" />
                        </Tag.EndElement>
                    </Tag.Root>
                </Link>
            </Flex>
        </VStack>
    );
}

export default SearchFilterDisplay;
