import { Card, Text, Badge, HStack, VStack, Flex, AspectRatio, Image } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';

function ReservationCard() {
    return (
        <Link href="/reservations">
            <Card.Root width="400px">
                <Card.Body gap="2">
                    <AspectRatio ratio={16 / 9} width="100%" borderRadius={8} overflow="hidden">
                        <Image src="https://picsum.photos/600/600" borderRadius={8} />
                    </AspectRatio>
                    <Flex justify="space-between" align="flex-start" mt="2">
                        <Card.Title marginRight={4}>Central Tennis Court 12321321 123 213 213213 123</Card.Title>
                        <Badge colorScheme="orange" variant="solid" marginTop={1}>
                            Pending
                        </Badge>
                    </Flex>

                    <Card.Description>
                        <VStack align="flex-start" gap={1} mt={2}>
                            <Text fontSize="sm">
                                <Text as="span" fontWeight="semibold">
                                    Facility:
                                </Text>{' '}
                                Prima Sports Center
                            </Text>
                            <Text fontSize="sm">
                                <Text as="span" fontWeight="semibold">
                                    City:
                                </Text>{' '}
                                Jakarta
                            </Text>
                            <Text fontSize="sm">
                                <Text as="span" fontWeight="semibold">
                                    Address:
                                </Text>{' '}
                                Jl. Sudirman No. 123, Thamrin, Jakarta Pusat
                            </Text>
                            <Text fontSize="sm">
                                <Text as="span" fontWeight="semibold">
                                    Type:
                                </Text>{' '}
                                Covered Court
                            </Text>
                        </VStack>

                        <HStack gap={6} mt={4} pt={3} borderTop="1px solid" borderColor="gray.200">
                            <VStack align="flex-start" gap={1}>
                                <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                                    DATE
                                </Text>
                                <Text fontSize="sm" fontWeight="medium">
                                    March 15, 2026
                                </Text>
                            </VStack>
                            <VStack align="flex-start" gap={1}>
                                <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                                    TIME
                                </Text>
                                <Text fontSize="sm" fontWeight="medium">
                                    14:00 - 16:00
                                </Text>
                            </VStack>
                        </HStack>
                    </Card.Description>
                </Card.Body>
            </Card.Root>
        </Link>
    );
}

export default ReservationCard;
