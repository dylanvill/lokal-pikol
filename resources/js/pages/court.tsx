import { 
    Container, 
    Text, 
    VStack, 
    HStack, 
    Box, 
    Image, 
    Heading, 
    Badge, 
    Button,
    SimpleGrid,
    AspectRatio,
    Flex,
    Separator
} from '@chakra-ui/react';
import { Carousel } from '@chakra-ui/react';
import { useState } from 'react';
import { FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi';
import LandingPageLayout from '@/layouts/LandingPageLayout';

interface CourtProps {
    court: string;
}

export default function Court({ court }: CourtProps) {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Sample court data - this would typically come from your backend
    const courtData = {
        name: `${court.charAt(0).toUpperCase() + court.slice(1)} Sports Center`,
        address: "123 Main Street, Dumaguete City",
        logo: "https://picsum.photos/80/80?random=1",
        numberOfCourts: 4,
        covered: true,
        availableTimes: ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
        images: [
            "https://picsum.photos/500/400?random=1",
            "https://picsum.photos/500/400?random=2", 
            "https://picsum.photos/500/400?random=3",
            "https://picsum.photos/500/400?random=4",
        ]
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    return (
        <LandingPageLayout title={courtData.name}>
            <Container maxW="7xl" py={{ base: 4, md: 8 }}>
                {/* Mobile Layout */}
                <VStack gap={6} align="stretch" display={{ base: "flex", lg: "none" }}>
                    {/* Header Section */}
                    <HStack gap={4} align="center">
                        <Image 
                            src={courtData.logo} 
                            alt="Court Logo" 
                            boxSize="60px"
                            borderRadius="full"
                            objectFit="cover"
                            border="2px"
                            borderColor="gray.200"
                        />
                        <VStack align="start" flex={1} gap={1}>
                            <Heading size="md" color="gray.800" lineHeight="short">
                                {courtData.name}
                            </Heading>
                            <HStack gap={2} align="center">
                                <FiMapPin color="gray" size="16px" />
                                <Text fontSize="sm" color="gray.600">
                                    {courtData.address}
                                </Text>
                            </HStack>
                        </VStack>
                    </HStack>

                    {/* Gallery */}
                    <Carousel.Root slideCount={courtData.images.length}>
                        <Carousel.ItemGroup>
                            {courtData.images.map((image, index) => (
                                <Carousel.Item key={index} index={index}>
                                    <AspectRatio ratio={5/4}>
                                        <Image 
                                            src={image} 
                                            alt={`Court view ${index + 1}`}
                                            borderRadius="lg"
                                            objectFit="cover"
                                            w="full"
                                        />
                                    </AspectRatio>
                                </Carousel.Item>
                            ))}
                        </Carousel.ItemGroup>
                        <Carousel.Control>
                            <Carousel.PrevTrigger />
                            <Carousel.Indicators />
                            <Carousel.NextTrigger />
                        </Carousel.Control>
                    </Carousel.Root>

                    {/* General Court Details */}
                    <Box>
                        <Heading size="sm" mb={3} color="gray.800">
                            Court Details
                        </Heading>
                        <VStack gap={3} align="stretch">
                            <HStack gap={3} align="center">
                                <FiCheckCircle color="green" size="20px" />
                                <Text fontSize="sm">
                                    <Text as="span" fontWeight="medium">{courtData.numberOfCourts}</Text> courts available
                                </Text>
                            </HStack>
                            <HStack gap={3} align="center">
                                <Badge 
                                    colorScheme={courtData.covered ? 'blue' : 'orange'} 
                                    variant="subtle"
                                    fontSize="xs"
                                >
                                    {courtData.covered ? 'Covered' : 'Outdoor'}
                                </Badge>
                            </HStack>
                        </VStack>
                    </Box>

                    {/* List of Courts + Time Badges */}
                    <Box>
                        <HStack gap={2} align="center" mb={4}>
                            <FiClock color="green" size="20px" />
                            <Heading size="sm" color="gray.800">
                                Vacant times for today
                            </Heading>
                        </HStack>
                        <Flex wrap="wrap" gap={2} mb={4}>
                            {courtData.availableTimes.map((time, index) => (
                                <Button 
                                    key={index}
                                    size="sm"
                                    variant={selectedTime === time ? "solid" : "outline"}
                                    colorScheme={selectedTime === time ? "blue" : "gray"}
                                    onClick={() => handleTimeSelect(time)}
                                    borderRadius="md"
                                >
                                    {time}
                                </Button>
                            ))}
                        </Flex>
                        {selectedTime && (
                            <Button 
                                colorScheme="blue" 
                                size="md"
                                w="full"
                                px={8}
                            >
                                Book now for {selectedTime}
                            </Button>
                        )}
                    </Box>
                </VStack>

                {/* Desktop Layout */}
                <VStack gap={8} align="stretch" display={{ base: "none", lg: "flex" }}>
                    {/* First Row: Header+Gallery | General Details */}
                    <SimpleGrid columns={2} gap={8} alignItems="start">
                        {/* Left Column: Header + Gallery */}
                        <VStack gap={6} align="stretch">
                            {/* Header Section */}
                            <HStack gap={4} align="center">
                                <Image 
                                    src={courtData.logo} 
                                    alt="Court Logo" 
                                    boxSize="80px"
                                    borderRadius="full"
                                    objectFit="cover"
                                    border="2px"
                                    borderColor="gray.200"
                                />
                                <VStack align="start" flex={1} gap={1}>
                                    <Heading size="lg" color="gray.800" lineHeight="short">
                                        {courtData.name}
                                    </Heading>
                                    <HStack gap={2} align="center">
                                        <FiMapPin color="gray" size="16px" />
                                        <Text fontSize="md" color="gray.600">
                                            {courtData.address}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </HStack>

                            {/* Gallery */}
                            <Carousel.Root slideCount={courtData.images.length}>
                                <Carousel.ItemGroup>
                                    {courtData.images.map((image, index) => (
                                        <Carousel.Item key={index} index={index}>
                                            <AspectRatio ratio={4/3}>
                                                <Image 
                                                    src={image} 
                                                    alt={`Court view ${index + 1}`}
                                                    borderRadius="lg"
                                                    objectFit="cover"
                                                    w="full"
                                                />
                                            </AspectRatio>
                                        </Carousel.Item>
                                    ))}
                                </Carousel.ItemGroup>
                                <Carousel.Control>
                                    <Carousel.PrevTrigger />
                                    <Carousel.Indicators />
                                    <Carousel.NextTrigger />
                                </Carousel.Control>
                            </Carousel.Root>
                        </VStack>

                        {/* Right Column: General Court Details */}
                        <Box>
                            <Heading size="md" mb={6} color="gray.800">
                                Court Details
                            </Heading>
                            <VStack gap={6} align="stretch">
                                <HStack gap={4} align="center">
                                    <FiCheckCircle color="green" size="24px" />
                                    <Text fontSize="lg">
                                        <Text as="span" fontWeight="medium">{courtData.numberOfCourts}</Text> courts available
                                    </Text>
                                </HStack>
                                <HStack gap={4} align="center">
                                    <Badge 
                                        colorScheme={courtData.covered ? 'blue' : 'orange'} 
                                        variant="subtle"
                                        fontSize="md"
                                        px={3}
                                        py={1}
                                    >
                                        {courtData.covered ? 'Covered' : 'Outdoor'}
                                    </Badge>
                                </HStack>
                            </VStack>
                        </Box>
                    </SimpleGrid>

                    {/* Second Row: List of Courts + Time Badges (Full Width) */}
                    <Box>
                        <HStack gap={3} align="center" mb={6}>
                            <FiClock color="green" size="24px" />
                            <Heading size="md" color="gray.800">
                                Vacant times for today
                            </Heading>
                        </HStack>
                        <Flex wrap="wrap" gap={3} mb={6}>
                            {courtData.availableTimes.map((time, index) => (
                                <Button 
                                    key={index}
                                    size="lg"
                                    variant={selectedTime === time ? "solid" : "outline"}
                                    colorScheme={selectedTime === time ? "blue" : "gray"}
                                    onClick={() => handleTimeSelect(time)}
                                    borderRadius="md"
                                    px={6}
                                >
                                    {time}
                                </Button>
                            ))}
                        </Flex>
                        {selectedTime && (
                            <Button 
                                colorScheme="blue" 
                                size="lg"
                                px={12}
                                py={6}
                            >
                                Book now for {selectedTime}
                            </Button>
                        )}
                    </Box>
                </VStack>
            </Container>
        </LandingPageLayout>
    );
}