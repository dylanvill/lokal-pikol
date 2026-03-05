import { Button, Card, Center, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LuArrowRight, LuCalendar, LuCircleAlert, LuClock4, LuGrid2X2, LuMapPin } from 'react-icons/lu';
import BackNavigationBase from '../../../components/shared/BackNavigationBase';
import DetailWithIcon from '../../../components/shared/DetailWithIcon';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';
import type Reservation from '../../../models/customer/reservation/Reservation';

interface OnHoldReservationNoticePageProps {
    reservation: Reservation;
}

function OnHoldReservationNoticePage({ reservation }: OnHoldReservationNoticePageProps) {
    const currentDate = dayjs();
    const reservationDate = dayjs(reservation.reservationDate);
    const isToday = currentDate.isSame(reservationDate, 'day');
    const dateDisplay = isToday ? 'Today' : reservationDate.format('dddd, MMMM D, YYYY');
    const startTimeDisplay = militaryTimeToAmPmTime(reservation.startTime);
    const endTimeDisplay = militaryTimeToAmPmTime(reservation.endTime);
    const timeDisplay = `${startTimeDisplay} - ${endTimeDisplay}`;

    const nearbyDates = useMemo(() => {
        const dates = [];
        const additionalDates = Array.from({ length: 4 });

        dates.push(dayjs(reservation.reservationDate));
        for (let index = 1; index < additionalDates.length; index++) {
            const nextDate = reservationDate.add(index, 'day');
            dates.push(nextDate);
        }

        return dates;
    }, [reservationDate, reservation.reservationDate]);

    return (
        <DefaultPageLayout
            title="Reservation on hold"
            contentContainerProps={{
                maxWidth: 'xl',
            }}
        >
            <BackNavigationBase href="/" label="Home" />
            <VStack alignItems="stretch" gap={8}>
                <Center flexDirection="column" gap={2}>
                    <Heading color="orange.500">
                        <LuCircleAlert size={48} />
                    </Heading>
                    <Heading size="lg" textAlign="center" color="orange.500" display="inline-flex" alignItems="flex-start" gap={2}>
                        You already have a pending reservation at {reservation.facility.name} for {dateDisplay === 'Today' ? 'today' : dateDisplay}.
                    </Heading>
                </Center>
                <VStack alignItems="stretch" gap={1}>
                    <DetailWithIcon icon={<LuMapPin />} label={reservation.facility.address} textProps={{ color: 'black', fontWeight: 'medium' }} />
                    <DetailWithIcon icon={<LuGrid2X2 />} label={reservation.court.name} textProps={{ color: 'black', fontWeight: 'medium' }} />
                    <DetailWithIcon icon={<LuCalendar />} label={dateDisplay} textProps={{ color: 'black', fontWeight: 'medium' }} />
                    <DetailWithIcon icon={<LuClock4 />} label={timeDisplay} textProps={{ color: 'black', fontWeight: 'medium' }} />
                </VStack>
                <VStack alignItems="stretch" gap={2}>
                    <Text>We understand you might want to make multiple reservations for {isToday ? 'today' : dateDisplay}. </Text>
                    <Text>
                        However, the facility needs to approve your current booking first before you can secure another one on the same date. This
                        helps protect court owners, ensures fairness for all players, and prevents potential booking abuse.
                    </Text>
                    <Text>Please wait for your existing reservation to be approved before trying to book another slot on the same date.</Text>
                </VStack>

                <VStack alignItems="stretch" gap={4}>
                    <Text>You can still book <strong>this facility's other courts</strong> and explore the availability on <strong>other dates</strong>.</Text>
                    <SimpleGrid columns={2} gap={4}>
                        {nearbyDates.map((date) => (
                            <Card.Root padding={1} alignItems="stretch" justifyContent="space-between">
                                <Card.Header padding={2}>
                                    <Card.Title>
                                        <Heading size="sm" color="blue.700">
                                            {date.isSame(currentDate, 'day') ? 'Today' : date.format('dddd, MMMM D, YYYY')}
                                        </Heading>
                                    </Card.Title>
                                </Card.Header>
                                <Card.Footer padding={0} alignItems="center" justifyContent="flex-end">
                                    <Link
                                        href={`/facilities/${reservation.facility.id}`}
                                        data={{
                                            date: date.format('YYYY-MM-DD'),
                                        }}
                                        replace
                                    >
                                        <Button variant="ghost" size="xs">
                                            View slots
                                            <LuArrowRight />
                                        </Button>
                                    </Link>
                                </Card.Footer>
                            </Card.Root>
                        ))}
                    </SimpleGrid>
                </VStack>
            </VStack>
        </DefaultPageLayout>
    );
}

export default OnHoldReservationNoticePage;
