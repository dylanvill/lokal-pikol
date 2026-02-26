import { Flex, Tag, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { LuCalendar, LuMapPin } from 'react-icons/lu';

export interface SearchFilterDisplayProps {
    city: string;
    date: string;
    facilitiesCount: number;
}

function SearchFilterDisplay({ city, date, facilitiesCount }: SearchFilterDisplayProps) {
    const dateDisplay = dayjs(date).format('dddd, MMMM D, YYYY');

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
            </Flex>
        </VStack>
    );
}

export default SearchFilterDisplay;
