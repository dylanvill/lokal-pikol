import { Box, VStack, HStack, Badge, Image, Flex, Heading, Text } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import { LuGrid2X2, LuHouse, LuMapPin, LuSun } from 'react-icons/lu';

interface CourtCardProps {
    id: number;
    imageUrl: string;
    name: string;
    address: string;
    numberOfCourts: number;
    covered: boolean;
    availableTimes: string[];
}

export default function CourtCard({ id, imageUrl, name, address, numberOfCourts, covered, availableTimes }: CourtCardProps) {
    const handleCardClick = () => {
        router.visit(`/court/${id}`);
    };

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
                <Image src={imageUrl} alt="Court Photo" aspectRatio={16 / 9} objectFit="cover" width="full" />
                <Image
                    src={imageUrl}
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
                <Heading size="md" color="gray.800" marginBottom={4}>
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
                        {covered ? <LuHouse color="gray" /> : <LuSun color="gray" />}
                        <Text fontSize="sm" color="gray">
                            {covered ? 'Covered' : 'Outdoor'}
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
