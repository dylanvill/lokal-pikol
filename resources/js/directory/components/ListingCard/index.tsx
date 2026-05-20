import { Badge, Card, Heading, HStack, Image, VStack, Link as ChakraLink, Button, Float } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { LuArrowRight, LuCalendar, LuClock, LuGrid2X2, LuMapPin, LuMail, LuPhone, LuSparkles, LuExternalLink } from 'react-icons/lu';
import DetailWithIcon from '../../../shared/components/DetailWithIcon';
import type ListingItem from '../../models/ListingItem';
import BookingDialog from './BookingDialog';
import ExternalScheduleDialog from './ExternalScheduleDialog';
import useListingActions from './hooks/useListingActions';
import useListingDialogs from './hooks/useListingDialogs';
import useListingDisplay from './hooks/useListingDisplay';

type ListingCardProps = Omit<ListingItem, 'createdAt' | 'updatedAt'> & {
    isNew?: boolean;
};

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
    bookingPlatform,
    schedule,
    email,
    phone,
    isNew = false,
}: ListingCardProps) {
    const { businessHoursDisplay, typeIcon, facebookLink, instagramLink } = useListingDisplay(
        openingTime,
        closingTime,
        courtType,
        socialLinks,
    );
    const { trackSocialClick, onBookCourtClicked, trackScheduleClick } = useListingActions(id, bookingUrl);
    const { externalScheduleOpen, setExternalScheduleOpen, bookingDialogOpen, setBookingDialogOpen } =
        useListingDialogs();

    return (
        <Card.Root padding={0} borderRadius={8} key={id}>
            <Card.Header padding={0} borderTopRadius={8}>
                <VStack justifyItems="flex-start" alignItems="flex-start">
                    {isNew && (
                        <Float placement="top-end" marginRight={10} marginTop={6} colorPalette="yellow">
                            <Badge>
                                <LuSparkles />
                                New
                            </Badge>
                        </Float>
                    )}
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
                        <Badge marginBottom={4} fontFamily="sans-serif" fontWeight={400}>
                            {city}
                        </Badge>
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
                            label={
                                <ChakraLink
                                    cursor="pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        trackSocialClick('facebook', facebookLink.url);
                                    }}
                                >
                                    Facebook
                                </ChakraLink>
                            }
                        />
                    )}
                    {instagramLink && (
                        <DetailWithIcon
                            icon={<FaInstagram />}
                            textProps={{ color: 'black', fontSize: 'sm' }}
                            label={
                                <ChakraLink
                                    cursor="pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        trackSocialClick('instagram', instagramLink.url);
                                    }}
                                >
                                    Instagram
                                </ChakraLink>
                            }
                        />
                    )}
                    {schedule && !schedule.isExternal && (
                        <DetailWithIcon
                            icon={<LuCalendar color="black" />}
                            textProps={{ fontSize: 'sm' }}
                            label={
                                <HStack gap={0.5} color="var(--chakra-colors-blue-fg)">
                                    <Link href={schedule.url} onClick={trackScheduleClick}>View schedule on {schedule.providerName}</Link>
                                    <LuExternalLink />
                                </HStack>
                            }
                        />
                    )}
                    {schedule && schedule.isExternal && (
                        <>
                            <DetailWithIcon
                                icon={<LuCalendar color="black" />}
                                textProps={{ fontSize: 'sm' }}
                                label={
                                    <HStack gap={0.5} color="var(--chakra-colors-blue-fg)">
                                        <ChakraLink cursor="pointer" onClick={() => { trackScheduleClick(); setExternalScheduleOpen(true); }}>
                                            View schedule on {schedule.providerName}
                                        </ChakraLink>
                                    <LuExternalLink />
                                    </HStack>
                                }
                            />
                            <ExternalScheduleDialog open={externalScheduleOpen} onOpenChange={setExternalScheduleOpen} courtName={name} schedule={schedule} />
                        </>
                    )}
                </VStack>
            </Card.Body>
            {bookingUrl ? (
                <Card.Footer padding={0} margin={0} borderBottomRadius={8}>
                    <Button
                        size="sm"
                        variant="solid"
                        fontSize="sm"
                        textAlign="right"
                        onClick={() => setBookingDialogOpen(true)}
                        borderBottomRadius={8}
                        borderTopRadius={0}
                        width="full"
                    >
                        {bookingPlatform ? `Book on ${bookingPlatform}` : 'Book Court'}
                        <LuArrowRight />
                    </Button>
                    <BookingDialog
                        open={bookingDialogOpen}
                        onOpenChange={setBookingDialogOpen}
                        courtName={name}
                        bookingPlatform={bookingPlatform}
                        onConfirm={onBookCourtClicked}
                    />
                </Card.Footer>
            ) : null}
        </Card.Root>
    );
}

export default ListingCard;
