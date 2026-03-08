import { Box, VStack, Badge, Image, Heading, Card } from '@chakra-ui/react';
import { Link, usePage } from '@inertiajs/react';
import { LuClock, LuGrid2X2, LuHouse, LuMapPin } from 'react-icons/lu';
import militaryTimeToAmPmTime from '../../helpers/militaryTimeToAmPmTime';
import type Photo from '../../models/shared/Photo';
import DetailWithIcon from '../shared/DetailWithIcon';

interface FacilityCardProps {
    id: string;
    name: string;
    coverPhoto: Photo | null;
    profilePhoto: Photo | null;
    openingTime: string;
    closingTime: string;
    address: string;
    city: string;
    numberOfCourts: number;
    courtType: string;
}

export default function ListingCard({
    id,
    name,
    coverPhoto,
    profilePhoto,
    address,
    city,
    numberOfCourts,
    courtType,
    openingTime,
    closingTime,
}: FacilityCardProps) {
    const { props } = usePage<{ queryData: { date: string } }>();

    const openingTimeDisplay = militaryTimeToAmPmTime(openingTime);
    const closingTimeDisplay = militaryTimeToAmPmTime(closingTime);

    const date = props.queryData?.date || null;

    return (
        <Link href={`/facilities/${id}`} data={{ date }}>
            <Card.Root padding={0} height="full">
                <Card.Body padding={0}>
                    <VStack justifyItems="flex-start" alignItems="flex-start">
                        <Image src={coverPhoto?.url} alt="Court Photo" aspectRatio={16 / 9} objectFit="cover" width="full" borderTopRadius={4} />
                        <Image
                            src={profilePhoto?.url}
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
                        <Heading size="lg" color="gray.800">
                            {name}
                        </Heading>
                        <Badge marginBottom={4}>{city}</Badge>
                        <VStack alignItems="stretch" justifyContent="space-between" gap={0}>
                            <VStack gap={1} alignItems="stretch">
                                <DetailWithIcon icon={<LuMapPin color="black" />} textProps={{ color: 'black', fontSize: 'sm' }} label={address} />
                                <DetailWithIcon
                                    icon={<LuClock color="black" />}
                                    textProps={{ color: 'black', fontSize: 'sm' }}
                                    label={`${openingTimeDisplay} - ${closingTimeDisplay}`}
                                />
                                <DetailWithIcon icon={<LuHouse color="black" />} textProps={{ color: 'black', fontSize: 'sm' }} label={courtType} />
                                <DetailWithIcon
                                    icon={<LuGrid2X2 color="black" />}
                                    textProps={{ color: 'black', fontSize: 'sm' }}
                                    label={`${numberOfCourts} courts`}
                                />
                            </VStack>
                        </VStack>
                    </Box>
                </Card.Body>
            </Card.Root>
        </Link>
    );
}
