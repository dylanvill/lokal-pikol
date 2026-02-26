import { Badge, Box, Button, Flex, Float, Heading, Image, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuArrowLeft, LuArrowRight, LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import DetailWithIcon from '../shared/DetailWithIcon';

export interface FacilityHeaderProps {
    name: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    description: string;
    profilePhotoUrl: string;
    coverPhotoUrl: string;
    googleMapsUrl?: string;
}

function FacilityProfileHeader({
    name,
    address,
    city,
    email,
    phone,
    description,
    profilePhotoUrl,
    coverPhotoUrl,
    googleMapsUrl,
}: FacilityHeaderProps) {
    return (
        <Box gap={0}>
            <VStack alignItems="stretch" width="full" marginBottom={4}>
                <Box position="relative" width="full" zIndex={1}>
                    <Float placement="top-start" offsetY={6} offsetX={16}>
                        <Link href="/">
                            <Button size="xs" variant="solid" backgroundColor="rgba(0, 0, 0, 0.5)" shadow="xs">
                                <LuArrowLeft />
                                All Facilities
                            </Button>
                        </Link>
                    </Float>
                    <Image
                        src={coverPhotoUrl}
                        aspectRatio={{
                            base: 16 / 9,
                            md: 16 / 4,
                        }}
                        width="full"
                        objectFit="cover"
                        borderRadius={8}
                    />
                </Box>
                <Flex zIndex={2} flexDirection={{ base: 'column', lg: 'row' }}>
                    <Flex
                        marginTop={{
                            lg: -28,
                            base: -12,
                        }}
                        paddingLeft={{
                            base: 0,
                            lg: 8,
                        }}
                        flexDirection="column"
                        flexShrink={0}
                    >
                        <Image
                            src={profilePhotoUrl}
                            alt={name}
                            w={{
                                base: 32,
                                lg: 48,
                            }}
                            h={{
                                base: 32,
                                lg: 48,
                            }}
                            objectFit="cover"
                            borderRadius="md"
                            border="2px solid white"
                            shadow="xs"
                            alignSelf={{ base: 'center', lg: 'flex-start' }}
                            marginBottom={2}
                        />
                        <Flex marginBottom={4} flexDirection="column" alignItems={{ base: 'center', lg: 'flex-start' }}>
                            <Heading size="xl" textAlign={{ base: 'center', lg: 'start' }} marginBottom={0}>
                                {name}
                            </Heading>
                            <Badge colorPalette="blue" fontSize="sm" marginBottom={4}>
                                {city}
                            </Badge>
                        </Flex>
                        <VStack alignItems="stretch" gap={2}>
                            <DetailWithIcon icon={<LuMail color="black" />} label={email} textProps={{ color: 'black' }} />
                            <DetailWithIcon icon={<LuPhone color="black" />} label={phone} textProps={{ color: 'black' }} />
                            <Box>
                                <DetailWithIcon icon={<LuMapPin color="black" />} label={address} textProps={{ color: 'black' }} />
                                {googleMapsUrl && (
                                    <ChakraLink href={googleMapsUrl}>
                                        <Button variant="plain" paddingLeft={0} size="xs">
                                            View on Google Maps <LuArrowRight />
                                        </Button>
                                    </ChakraLink>
                                )}
                            </Box>
                        </VStack>
                    </Flex>
                    <Box
                        paddingLeft={{
                            base: 0,
                            lg: 12,
                        }}
                        paddingRight={{ base: 0, lg: 4 }}
                        paddingTop={4}
                    >
                        <Text whiteSpace="pre-wrap" fontSize="sm">
                            {description}
                        </Text>
                    </Box>
                </Flex>
            </VStack>
        </Box>
    );
}

export default FacilityProfileHeader;
