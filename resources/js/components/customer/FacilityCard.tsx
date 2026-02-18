import { Box, VStack, Badge, Image, Heading } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { LuCheckCheck, LuClock, LuGrid2X2, LuHouse, LuMapPin, LuSun } from 'react-icons/lu';
import militaryTimeToAmPmTime from '../../helpers/militaryTimeToAmPmTime';
import type FacilityList from '../../models/customer/facility/FacilityList';
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
    onClick: (id: string) => void;
}

export default function FacilityCard({ id, name, coverPhoto, profilePhoto, address, city, numberOfCourts, courtType, openingTime, closingTime, onClick }: FacilityCardProps) {
    const handleCardClick = () => {
        onClick(id);
    };

    const typeDisplay = useMemo((): [string, React.ReactNode] => {
        if (courtType === 'Covered') return ['Covered', <LuHouse color="gray" />];
        if (courtType === 'Outdoor') return ['Outdoor', <LuSun color="gray" />];
        return ['Covered & Outdoor', <LuCheckCheck color="gray" />];
    }, [courtType]);

    const openingTimeDisplay = militaryTimeToAmPmTime(openingTime);
    const closingTimeDisplay = militaryTimeToAmPmTime(closingTime);

    return (
        <Box
            bg="white"
            borderRadius="xl"
            shadow="sm"
            overflow="hidden"
            border="1px"
            borderColor="gray.200"
            cursor="pointer"
            _hover={{ shadow: 'md', borderColor: 'gray.300' }}
            transition="all 0.2s"
            onClick={handleCardClick}
            key={id}
        >
            <VStack justifyItems="flex-start" alignItems="flex-start">
                <Image src={coverPhoto?.url} alt="Court Photo" aspectRatio={16 / 9} objectFit="cover" width="full" />
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
                <VStack justifyItems="flex-start" alignItems="flex-start" gap={0}>
                    <VStack gap={1} alignItems="flex-start">
                        <DetailWithIcon icon={<LuMapPin color="gray" />} label={address} />
                        <DetailWithIcon icon={<LuClock color="gray" />} label={`${openingTimeDisplay} - ${closingTimeDisplay}`} />
                        <DetailWithIcon icon={typeDisplay[1]} label={typeDisplay[0]} />
                        <DetailWithIcon icon={<LuGrid2X2 color="gray" />} label={`${numberOfCourts} courts`} />
                    </VStack>
                    {/* <VStack align="stretch" gap={2} marginTop={4}>
                        <Text fontSize="xs" color="gray.900">
                            Available times today:
                        </Text>
                        <Flex wrap="wrap" gap={1}>
                            {availableTimes.map((time, index) => (
                                <Badge key={index} colorScheme="green" variant="outline" fontSize="xs">
                                    {time}
                                </Badge>
                            ))}
                        </Flex>
                    </VStack> */}
                </VStack>
            </Box>
        </Box>
    );
}
