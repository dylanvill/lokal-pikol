import { Badge, DatePicker, Heading, Image, Portal, SimpleGrid, Text, VStack, parseDate } from '@chakra-ui/react';
import { type DateValue } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuCalendar } from 'react-icons/lu';
import ListingController from '@/actions/App/Http/Directory/Controllers/ListingController';
import type AvailabilityCourt from '../../scheduling/models/AvailabilityCourt';
import BackNavigationBase from '../../shared/components/BackNavigation/BackNavigationBase';
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

    const handleDateChange = (details: { value: DateValue[] }) => {
        if (!details.value[0]) return;
        router.get(pathWithoutQuery, { date: details.value[0].toString() });
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
                    <DatePicker.Root
                        value={[parseDate(date)]}
                        onValueChange={(e) => e.value[0] && handleDateChange(e)}
                        format={(d) => dayjs(d.toString()).format('dddd, MMMM D, YYYY')}
                        positioning={{
                            placement: 'bottom-start',
                        }}
                    >
                        <DatePicker.Label>Viewing availability on: </DatePicker.Label>
                        <DatePicker.Control maxWidth="xs">
                            <DatePicker.Trigger asChild unstyled textAlign="left">
                                <DatePicker.Input />
                            </DatePicker.Trigger>
                            <DatePicker.IndicatorGroup>
                                <DatePicker.Trigger>
                                    <LuCalendar />
                                </DatePicker.Trigger>
                            </DatePicker.IndicatorGroup>
                        </DatePicker.Control>
                        <Portal>
                            <DatePicker.Positioner>
                                <DatePicker.Content>
                                    <DatePicker.View view="day">
                                        <DatePicker.Header />
                                        <DatePicker.DayTable />
                                    </DatePicker.View>
                                    <DatePicker.View view="month">
                                        <DatePicker.Header />
                                        <DatePicker.MonthTable />
                                    </DatePicker.View>
                                    <DatePicker.View view="year">
                                        <DatePicker.Header />
                                        <DatePicker.YearTable />
                                    </DatePicker.View>
                                </DatePicker.Content>
                            </DatePicker.Positioner>
                        </Portal>
                    </DatePicker.Root>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                    {courts.map((court) => (
                        <ScheduleCourtCard key={court.id} court={court} />
                    ))}
                </SimpleGrid>
            </VStack>
        </DirectoryLayout>
    );
}

export default SchedulePage;
