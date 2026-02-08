import { Box, VStack, HStack, Badge, Image, Flex, Heading, Text } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import React, { useMemo } from 'react';
import { LuCheckCheck, LuClock, LuGrid2X2, LuHouse, LuMapPin, LuSun } from 'react-icons/lu';

interface CourtCardProps {
    id: string;
    name: string;
    coverPhotoUrl: string;
    profilePhotoUrl: string;
    address: string;
    numberOfCourts: number;
    types: string[];
    availableTimes: string[];
}

export default function CourtCard({ id, name, coverPhotoUrl, profilePhotoUrl, address, numberOfCourts, types, availableTimes }: CourtCardProps) {
    const handleCardClick = () => {
        router.visit(`/courts/${id}`);
    };

    const typeDisplay = useMemo((): [string, React.ReactNode] => {
        if (types.length === 1) {
            if (types[0] === 'covered') return ['Covered', <LuHouse />];
            if (types[0] === 'open') return ['Outdoor', <LuSun />];
        }

        return ['Covered & Outdoor', <LuCheckCheck />];
    }, [types]);

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
        >
            <VStack justifyItems="flex-start" alignItems="flex-start">
                <Image src={coverPhotoUrl} alt="Court Photo" aspectRatio={16 / 9} objectFit="cover" width="full" />
                <Image
                    src={profilePhotoUrl}
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
                <Heading size="lg" color="gray.800" marginBottom={4}>
                    {name}
                </Heading>
                <VStack justifyItems="flex-start" alignItems="flex-start" gap={0}>
                    <HStack alignItems="center" justify="flex-start" gap={1}>
                        <LuMapPin color="gray" />
                        <Text fontSize="sm" color="gray">
                            {address}
                        </Text>
                    </HStack>
                    <HStack alignItems="center" justify="flex-start" gap={1}>
                        <LuClock color="gray" />
                        <Text fontSize="sm" color="gray">
                            8:00 AM - 10:00 PM
                        </Text>
                    </HStack>
                    <HStack alignItems="center" justify="flex-start" gap={1}>
                        {typeDisplay[1]}
                        <Text fontSize="sm" color="gray">
                            {typeDisplay[0]}
                        </Text>
                    </HStack>
                    <HStack alignItems="center" justify="flex-start" gap={1}>
                        <LuGrid2X2 color="gray" />
                        <Text fontSize="sm" color="gray">
                            {numberOfCourts} courts
                        </Text>
                    </HStack>
                    <VStack align="stretch" gap={2} marginTop={4}>
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
                    </VStack>
                </VStack>
            </Box>
        </Box>
    );
}
