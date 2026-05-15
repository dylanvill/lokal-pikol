import { Badge, Heading, Image, SimpleGrid, Text, VStack, parseDate } from '@chakra-ui/react';
import { type DateValue } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { router, usePage } from '@inertiajs/react';
import ListingController from '@/actions/App/Http/Directory/Controllers/ListingController';
import type AvailabilityCourt from '../../scheduling/models/AvailabilityCourt';
import BackNavigationBase from '../../shared/components/BackNavigation/BackNavigationBase';
import DatePickerField from '../../shared/components/DatePickerField';
import ScheduleContactBanner from '../components/schedule/ScheduleContactBanner';
import ScheduleCourtCard from '../components/schedule/ScheduleCourtCard';
import DirectoryLayout from '../layouts/DirectoryLayout';
import type SocialLink from '../models/SocialLink';

interface ScheduleListing {
    name: string;
    city: string;
    address: string;
    profilePhotoUrl: string | null;
    socialLinks: SocialLink[];
}

interface SchedulePageProps extends PageProps {
    date: string;
    listing: ScheduleListing;
    courts: AvailabilityCourt[];
}

function SchedulePage({ date, listing, courts }: SchedulePageProps) {
    const { url } = usePage();
    const pathWithoutQuery = url.split('?')[0];

    const handleDateChange = (value: DateValue) => {
        router.get(pathWithoutQuery, { date: value.toString() });
    };

    const handleBackClicked = () => {
        const canGoBack = 'navigation' in window && (window.navigation as { canGoBack?: boolean }).canGoBack;
        if (canGoBack) {
            window.history.back();
        } else {
            router.get(ListingController.url());
        }
    };

    return (
        <DirectoryLayout title={`${listing.name} — Schedule`}>
            <BackNavigationBase label="Back to directory" onClick={handleBackClicked} />
            <VStack align="stretch" gap={8}>
                <VStack align="flex-start" gap={3}>
                    {listing.profilePhotoUrl && (
                        <Image
                            src={listing.profilePhotoUrl}
                            alt={listing.name}
                            w="16"
                            h="16"
                            objectFit="cover"
                            borderRadius="md"
                            border="1px solid"
                            borderColor="gray.200"
                            shadow="xs"
                        />
                    )}
                    <VStack align="flex-start" gap={1}>
                        <Heading size="3xl">{listing.name}</Heading>
                        <Badge colorPalette="blue" variant="subtle">
                            {listing.city}
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                            {listing.address}
                        </Text>
                    </VStack>
                </VStack>

                <ScheduleContactBanner socialLinks={listing.socialLinks} />

                <VStack align="flex-start" gap={1}>
                    <DatePickerField
                        value={parseDate(date)}
                        onValueChange={handleDateChange}
                        label="Viewing availability on:"
                        positioning={{ placement: 'bottom-start' }}
                    />
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 3 }} gap={4}>
                    {courts.map((court) => (
                        <ScheduleCourtCard key={court.id} court={court} />
                    ))}
                </SimpleGrid>
            </VStack>
        </DirectoryLayout>
    );
}

export default SchedulePage;
