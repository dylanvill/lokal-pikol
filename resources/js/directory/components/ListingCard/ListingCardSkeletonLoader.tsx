import { Card, VStack, HStack, Skeleton, SkeletonText, Flex } from '@chakra-ui/react';

function ListingCardSkeletonLoader() {
    return (
        <Card.Root padding={0} borderRadius={8}>
            <Card.Header padding={0} borderTopRadius={8}>
                <VStack justifyItems="flex-start" alignItems="flex-start">
                    {/* Cover Photo Skeleton */}
                    <Skeleton width="full" height="200px" borderTopRadius={8} />
                    <HStack>
                        {/* Profile Photo Skeleton */}
                        <Skeleton w="16" h="16" borderRadius="md" marginTop={-12} border="2px solid white" shadow="xs" marginLeft={4} />
                        {/* City Badge Skeleton */}
                        <Skeleton height="24px" width="60px" borderRadius="md" marginBottom={4} />
                    </HStack>
                </VStack>
            </Card.Header>
            <Card.Body paddingTop={0}>
                {/* Name/Heading Skeleton */}
                <SkeletonText noOfLines={1} marginBottom={4} />

                <VStack gap={1} alignItems="stretch">
                    {/* Address */}
                    <HStack>
                        <Skeleton width="16px" height="16px" />
                        <SkeletonText noOfLines={1} width="200px" />
                    </HStack>

                    {/* Google Maps Link */}
                    <SkeletonText noOfLines={1} width="120px" marginLeft={5} marginBottom={2} />

                    {/* Business Hours */}
                    <HStack>
                        <Skeleton width="16px" height="16px" />
                        <SkeletonText noOfLines={1} width="180px" />
                    </HStack>

                    {/* Court Type */}
                    <HStack>
                        <Skeleton width="16px" height="16px" />
                        <SkeletonText noOfLines={1} width="80px" />
                    </HStack>

                    {/* Number of Courts */}
                    <HStack>
                        <Skeleton width="16px" height="16px" />
                        <SkeletonText noOfLines={1} width="90px" />
                    </HStack>

                    {/* Optional Contact Details */}
                    <HStack>
                        <Skeleton width="16px" height="16px" />
                        <SkeletonText noOfLines={1} width="150px" />
                    </HStack>

                    {/* Optional Social Links */}
                    <HStack>
                        <Skeleton width="16px" height="16px" />
                        <SkeletonText noOfLines={1} width="80px" />
                    </HStack>
                </VStack>
            </Card.Body>
            <Card.Footer>
                <Flex justifyContent="flex-end" alignItems="flex-end" width="full">
                    {/* Booking Link Skeleton */}
                    <SkeletonText textAlign="right" noOfLines={1} width="100px" marginTop={4} />
                </Flex>
            </Card.Footer>
        </Card.Root>
    );
}

export default ListingCardSkeletonLoader;
