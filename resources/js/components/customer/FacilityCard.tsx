import { Box, VStack, Badge, Image, Heading, Text, Flex, Card } from '@chakra-ui/react';
import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { LuCheckCheck, LuClock, LuGrid2X2, LuHouse, LuMapPin, LuSun, LuX } from 'react-icons/lu';
import militaryTimeToAmPmTime from '../../helpers/militaryTimeToAmPmTime';
import type FacilityList from '../../models/customer/facility/FacilityList';
import type CourtSlot from '../../models/shared/CourtSlot';
import type Photo from '../../models/shared/Photo';
import DetailWithIcon from '../shared/DetailWithIcon';

interface FacilityCardProps {
    id: string;
    name: string;
    coverPhoto: Photo | null;
    profilePhoto: Photo | null;
    openingTime: string;
    closingTime: string;
    address: string;
    city: string;
    numberOfCourts: number;
    courtType: FacilityList['courtType'];
    availableTimes: CourtSlot[];
}

export default function FacilityCard({
    id,
    name,
    coverPhoto,
    profilePhoto,
    address,
    city,
    numberOfCourts,
    courtType,
    openingTime,
    closingTime,
    availableTimes,
}: FacilityCardProps) {
    const { props } = usePage<{ queryData: { date: string } }>();
    const typeDisplay = useMemo((): [string, React.ReactNode] => {
        if (courtType === 'Covered') return ['Covered', <LuHouse color="black" />];
        if (courtType === 'Outdoor') return ['Outdoor', <LuSun color="black" />];
        return ['Covered & Outdoor', <LuCheckCheck color="gray" />];
    }, [courtType]);

    const currentDate = dayjs();
    const selectedDate = dayjs(props.queryData?.date);
    const isSelectedDateToday = selectedDate.isSame(currentDate, 'day');

    const dateLabel = isSelectedDateToday ? 'Available times today' : `Available times on ${selectedDate.format('MMMM D')}`;
    const emptyLabel = isSelectedDateToday ? 'No more available slots for today' : `No more available slots for ${selectedDate.format('MMMM D')}`;

    const openingTimeDisplay = militaryTimeToAmPmTime(openingTime);
    const closingTimeDisplay = militaryTimeToAmPmTime(closingTime);

    const hasAvailableTimes = availableTimes.length > 0;
    const remainingSlotCount = availableTimes.length > 7 ? availableTimes.length - 7 : 0;
    const firstSevenSlots = useMemo(
        () =>
            availableTimes.slice(0, 7).map((slot) => ({
                ...slot,
                startTime: militaryTimeToAmPmTime(slot.startTime),
                endTime: militaryTimeToAmPmTime(slot.endTime),
            })),
        [availableTimes],
    );

    const date = props.queryData?.date || null;

    return (
        <Link href={`/facilities/${id}`} data={{ date }}>
            <Card.Root padding={0} height="full">
                <Card.Body padding={0}>
                    <VStack justifyItems="flex-start" alignItems="flex-start">
                        <Image src={coverPhoto?.url} alt="Court Photo" aspectRatio={16 / 9} objectFit="cover" width="full" borderTopRadius={4} />
                        <Image
                            src={profilePhoto?.url}
                            alt="Profile"
                            w="16"
                            h="16"
                            objectFit="cover"
                            borderRadius="md"
                            marginTop={-12}
                            border="2px solid white"
                            shadow="xs"
                            marginLeft={4}
                        />
                    </VStack>
                    <Box p={4}>
                        <Heading size="lg" color="gray.800">
                            {name}
                        </Heading>
                        <Badge marginBottom={4}>{city}</Badge>
                        <VStack alignItems="stretch" justifyContent="space-between" gap={0}>
                            <VStack gap={1} alignItems="stretch">
                                <DetailWithIcon icon={<LuMapPin color="black" />} textProps={{ color: 'black', fontSize: 'sm' }} label={address} />
                                <DetailWithIcon
                                    icon={<LuClock color="black" />}
                                    textProps={{ color: 'black', fontSize: 'sm' }}
                                    label={`${openingTimeDisplay} - ${closingTimeDisplay}`}
                                />
                                <DetailWithIcon icon={typeDisplay[1]} textProps={{ color: 'black', fontSize: 'sm' }} label={typeDisplay[0]} />
                                <DetailWithIcon
                                    icon={<LuGrid2X2 color="black" />}
                                    textProps={{ color: 'black', fontSize: 'sm' }}
                                    label={`${numberOfCourts} courts`}
                                />
                            </VStack>
                            {hasAvailableTimes ? (
                                <VStack alignItems="stretch" gap={2} marginTop={4}>
                                    <Text fontSize="xs" color="gray.900">
                                        {dateLabel}:
                                    </Text>
                                    <Flex wrap="wrap" gap={1}>
                                        {firstSevenSlots.map((slot, index) => (
                                            <Badge key={index} colorPalette="blue" variant="outline" fontSize="xs">
                                                {`${slot.startTime} - ${slot.endTime}`}
                                            </Badge>
                                        ))}
                                        {remainingSlotCount > 0 && (
                                            <Badge colorPalette="blue" variant="plain" fontSize="xs">
                                                +{remainingSlotCount} more
                                            </Badge>
                                        )}
                                    </Flex>
                                </VStack>
                            ) : (
                                <Text fontSize="xs" color="orange.500" marginTop={4} display="inline-flex" alignItems="center">
                                    <LuX /> {emptyLabel}
                                </Text>
                            )}
                        </VStack>
                    </Box>
                </Card.Body>
            </Card.Root>
        </Link>
    );
}
