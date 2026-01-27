
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Button,
    IconButton,
    Badge,
    Image,
    Flex,
    SimpleGrid,
} from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { FiUser, FiClock } from 'react-icons/fi';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <Box minH="100vh" bg="gray.50">
                {/* Header */}
                <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
                    <Container maxW="7xl" py={4}>
                        <Flex justify="space-between" align="center">
                            {/* Logo/Brand */}
                            <HStack spacing={3}>
                                <Box 
                                    w="10" 
                                    h="10" 
                                    bg="orange.400" 
                                    borderRadius="lg" 
                                    display="flex" 
                                    alignItems="center" 
                                    justifyContent="center"
                                >
                                    <Text color="white" fontWeight="bold" fontSize="lg">🏓</Text>
                                </Box>
                                <Heading size="md" color="gray.800">Lokal Pikol</Heading>
                            </HStack>

                            {/* Header Buttons */}
                            <HStack spacing={4}>
                                <Button colorScheme="orange" variant="solid" size="md">
                                    Search Courts
                                </Button>
                                <IconButton
                                    aria-label="My Account"
                                    icon={<FiUser />}
                                    variant="ghost"
                                    size="md"
                                    color="gray.600"
                                />
                            </HStack>
                        </Flex>
                    </Container>
                </Box>

                {/* Main Content */}
                <Container maxW="7xl" py={8}>
                    <VStack spacing={6} align="stretch">
                        {/* Courts Available Now Indicator */}
                        <HStack spacing={2} align="center">
                            <FiClock color="green" />
                            <Text fontWeight="semibold" color="green.600">Courts available now</Text>
                        </HStack>

                        {/* Court Cards Grid */}
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
                            {/* Court Card 1 */}
                            <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden" border="1px" borderColor="gray.200">
                                <Image
                                    src="https://via.placeholder.com/300x200/E2E8F0/4A5568?text=Court+Photo"
                                    alt="Court Photo"
                                    w="full"
                                    h="48"
                                    objectFit="cover"
                                />
                                <VStack p={4} align="stretch" spacing={3}>
                                    <HStack justify="space-between" align="start">
                                        <VStack align="start" spacing={1}>
                                            <Heading size="sm" color="gray.800">Sunshine Sports Center</Heading>
                                            <Text fontSize="sm" color="gray.600">123 Main St, Quezon City</Text>
                                            <Text fontSize="sm" color="gray.500">4 courts available</Text>
                                        </VStack>
                                        <Badge colorScheme="blue" variant="subtle">Covered</Badge>
                                    </HStack>
                                    
                                    {/* Available Time Slots */}
                                    <VStack align="stretch" spacing={2}>
                                        <Text fontSize="xs" color="gray.600" fontWeight="medium">Available times today:</Text>
                                        <Flex wrap="wrap" gap={1}>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">3:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">4:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">5:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">6:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">7:00 PM</Badge>
                                        </Flex>
                                    </VStack>
                                </VStack>
                            </Box>

                            {/* Court Card 2 */}
                            <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden" border="1px" borderColor="gray.200">
                                <Image
                                    src="https://via.placeholder.com/300x200/FED7D7/E53E3E?text=Court+Photo"
                                    alt="Court Photo"
                                    w="full"
                                    h="48"
                                    objectFit="cover"
                                />
                                <VStack p={4} align="stretch" spacing={3}>
                                    <HStack justify="space-between" align="start">
                                        <VStack align="start" spacing={1}>
                                            <Heading size="sm" color="gray.800">Metro Pickleball Hub</Heading>
                                            <Text fontSize="sm" color="gray.600">456 Sports Ave, Makati City</Text>
                                            <Text fontSize="sm" color="gray.500">2 courts available</Text>
                                        </VStack>
                                        <Badge colorScheme="orange" variant="subtle">Outdoor</Badge>
                                    </HStack>
                                    
                                    {/* Available Time Slots */}
                                    <VStack align="stretch" spacing={2}>
                                        <Text fontSize="xs" color="gray.600" fontWeight="medium">Available times today:</Text>
                                        <Flex wrap="wrap" gap={1}>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">3:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">4:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">6:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">8:00 PM</Badge>
                                        </Flex>
                                    </VStack>
                                </VStack>
                            </Box>

                            {/* Court Card 3 */}
                            <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden" border="1px" borderColor="gray.200">
                                <Image
                                    src="https://via.placeholder.com/300x200/C6F6D5/38A169?text=Court+Photo"
                                    alt="Court Photo"
                                    w="full"
                                    h="48"
                                    objectFit="cover"
                                />
                                <VStack p={4} align="stretch" spacing={3}>
                                    <HStack justify="space-between" align="start">
                                        <VStack align="start" spacing={1}>
                                            <Heading size="sm" color="gray.800">BGC Recreation Center</Heading>
                                            <Text fontSize="sm" color="gray.600">789 Bonifacio St, Taguig City</Text>
                                            <Text fontSize="sm" color="gray.500">6 courts available</Text>
                                        </VStack>
                                        <Badge colorScheme="blue" variant="subtle">Covered</Badge>
                                    </HStack>
                                    
                                    {/* Available Time Slots */}
                                    <VStack align="stretch" spacing={2}>
                                        <Text fontSize="xs" color="gray.600" fontWeight="medium">Available times today:</Text>
                                        <Flex wrap="wrap" gap={1}>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">3:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">5:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">6:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">7:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">8:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">9:00 PM</Badge>
                                        </Flex>
                                    </VStack>
                                </VStack>
                            </Box>

                            {/* Court Card 4 */}
                            <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden" border="1px" borderColor="gray.200">
                                <Image
                                    src="https://via.placeholder.com/300x200/FEEBC8/DD6B20?text=Court+Photo"
                                    alt="Court Photo"
                                    w="full"
                                    h="48"
                                    objectFit="cover"
                                />
                                <VStack p={4} align="stretch" spacing={3}>
                                    <HStack justify="space-between" align="start">
                                        <VStack align="start" spacing={1}>
                                            <Heading size="sm" color="gray.800">Eastwood Sports Complex</Heading>
                                            <Text fontSize="sm" color="gray.600">321 Eastwood Ave, Quezon City</Text>
                                            <Text fontSize="sm" color="gray.500">3 courts available</Text>
                                        </VStack>
                                        <Badge colorScheme="orange" variant="subtle">Outdoor</Badge>
                                    </HStack>
                                    
                                    {/* Available Time Slots */}
                                    <VStack align="stretch" spacing={2}>
                                        <Text fontSize="xs" color="gray.600" fontWeight="medium">Available times today:</Text>
                                        <Flex wrap="wrap" gap={1}>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">4:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">5:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">7:00 PM</Badge>
                                            <Badge colorScheme="green" variant="outline" fontSize="xs">8:00 PM</Badge>
                                        </Flex>
                                    </VStack>
                                </VStack>
                            </Box>
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>
        </>
    );
}
