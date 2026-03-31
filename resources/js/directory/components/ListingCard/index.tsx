import { Badge, Card, Heading, HStack, Image, VStack, Link as ChakraLink, Text, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { LuArrowRight, LuCheckCheck, LuClock, LuGrid2X2, LuHouse, LuMapPin, LuSun, LuMail, LuPhone } from 'react-icons/lu';
import DetailWithIcon from '../../../shared/components/DetailWithIcon';
import militaryTimeToAmPmTime from '../../../shared/helpers/militaryTimeToAmPmTime';
import type ListingItem from '../../models/ListingItem';

type ListingCardProps = ListingItem;

function ListingCard({
    id,
    name,
    profilePhoto,
    coverPhoto,
    city,
    address,
    openingTime,
    closingTime,
    courtType,
    numberOfCourts,
    googleMapsUrl,
    socialLinks,
    bookingUrl,
    email,
    phone,
}: ListingCardProps) {
    const businessHoursDisplay = useMemo((): string | null => {
        if (openingTime && closingTime) {
            return `${militaryTimeToAmPmTime(openingTime)} - ${militaryTimeToAmPmTime(closingTime)}`;
        }
        return null;
    }, [openingTime, closingTime]);

    const typeIcon = useMemo((): React.ReactNode => {
        if (courtType === 'Covered') return <LuHouse color="black" />;
        if (courtType === 'Outdoor') return <LuSun color="black" />;
        return <LuCheckCheck color="gray" />;
    }, [courtType]);

    const facebookLink = socialLinks?.find((link) => link.platform.toLowerCase() === 'facebook');
    const instagramLink = socialLinks?.find((link) => link.platform.toLowerCase() === 'instagram');

    return (
        <Card.Root padding={0} borderRadius={8} key={id}>
            <Card.Header padding={0} borderTopRadius={8}>
                <VStack justifyItems="flex-start" alignItems="flex-start">
                    <Image src={coverPhoto.url} alt="Cover Photo" aspectRatio={16 / 9} objectFit="cover" width="full" borderTopRadius={8} />
                    <HStack>
                        <Image
                            src={profilePhoto.url}
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

                        <Badge marginBottom={4} fontFamily="sans-serif" fontWeight={400}>{city}</Badge>
                    </HStack>
                </VStack>
            </Card.Header>
            <Card.Body paddingTop={0}>
                <Heading size="lg" color="gray.800">
                    {name}
                </Heading>
                <VStack gap={1} alignItems="stretch">
                    <DetailWithIcon icon={<LuMapPin color="black" />} textProps={{ color: 'black', fontSize: 'sm' }} label={address} />
                    {googleMapsUrl ? (
                        <ChakraLink fontSize="xs" href={googleMapsUrl} marginLeft={5} marginBottom={2}>
                            View on Google Maps
                            <LuArrowRight />
                        </ChakraLink>
                    ) : null}
                    <DetailWithIcon
                        icon={<LuClock color="black" />}
                        textProps={{ color: 'black', fontSize: 'sm' }}
                        label={businessHoursDisplay || 'Business hours not available'}
                    />
                    <DetailWithIcon icon={typeIcon} textProps={{ color: 'black', fontSize: 'sm' }} label={courtType} />
                    <DetailWithIcon
                        icon={<LuGrid2X2 color="black" />}
                        textProps={{ color: 'black', fontSize: 'sm' }}
                        label={`${numberOfCourts} court(s)`}
                    />
                    {email && <DetailWithIcon icon={<LuMail />} textProps={{ color: 'black', fontSize: 'sm' }} label={email} />}
                    {phone && <DetailWithIcon icon={<LuPhone />} textProps={{ color: 'black', fontSize: 'sm' }} label={phone} />}
                    {facebookLink && (
                        <DetailWithIcon
                            icon={<FaFacebookF />}
                            textProps={{ color: 'black', fontSize: 'sm' }}
                            label={<ChakraLink target="_blank" href={facebookLink.url}>Facebook</ChakraLink>}
                        />
                    )}
                    {instagramLink && (
                        <DetailWithIcon
                            icon={<FaInstagram />}
                            textProps={{ color: 'black', fontSize: 'sm' }}
                            label={<ChakraLink target="_blank" href={instagramLink.url}>Instagram</ChakraLink>}
                        />
                    )}
                </VStack>
            </Card.Body>
            <Card.Footer>
                <Flex justifyContent="flex-end" alignItems="flex-end" width="full">
                    {bookingUrl ? (
                        <ChakraLink href={bookingUrl} marginTop={4} fontSize="sm" textAlign="right">
                            Book Court
                            <LuArrowRight />
                        </ChakraLink>
                    ) : (
                        <Text marginTop={4} fontSize="sm" color="gray.500" textAlign="right">
                            No booking link available
                        </Text>
                    )}
                </Flex>
            </Card.Footer>
        </Card.Root>
    );
}

export default ListingCard;
