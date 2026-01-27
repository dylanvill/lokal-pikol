import {
    Box,
    VStack,
    HStack,
    Badge,
    Image,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react';

interface CourtCardProps {
    id: number;
    imageUrl: string;
    name: string;
    address: string;
    numberOfCourts: number;
    covered: boolean;
    availableTimes: string[];
}

export default function CourtCard({
    imageUrl,
    name,
    address,
    numberOfCourts,
    covered,
    availableTimes
}: CourtCardProps) {
    return (
        <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden" border="1px" borderColor="gray.200">
            <Image
                src={imageUrl}
                alt="Court Photo"
                w="full"
                h="48"
                objectFit="cover"
            />
            <VStack p={4} align="stretch" gap={3}>
                <HStack justify="space-between" align="start">
                    <VStack align="start" gap={1}>
                        <Heading size="sm" color="gray.800">{name}</Heading>
                        <Text fontSize="sm" color="gray.600">{address}</Text>
                        <Text fontSize="sm" color="gray.500">{numberOfCourts} courts available</Text>
                    </VStack>
                    <Badge colorScheme={covered ? "blue" : "orange"} variant="subtle">
                        {covered ? "Covered" : "Outdoor"}
                    </Badge>
                </HStack>
                
                {/* Available Time Slots */}
                <VStack align="stretch" gap={2}>
                    <Text fontSize="xs" color="gray.600" fontWeight="medium">Available times today:</Text>
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
    );
}