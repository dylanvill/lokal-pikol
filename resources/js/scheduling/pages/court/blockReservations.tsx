import { Button, Flex, VStack } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuPlus } from 'react-icons/lu';
import ShowCreateBlockReservationsController from '@/actions/App/Http/Scheduling/Court/Controllers/ShowCreateBlockReservationsController';
import CourtBlockReservationSection from '../../components/court/CourtBlockReservationSection';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type CourtBlockReservation from '../../models/CourtBlockReservation';
import type SchedulingPageProps from '../../types/SchedulingPageProps';

interface BlockReservationsPageProps extends SchedulingPageProps {
    courts: CourtBlockReservation[];
}

function BlockReservationsPage({ courts }: BlockReservationsPageProps) {
    return (
        <SchedulingLayout title="Block reservations">
            <Flex justify="flex-end" align="center" marginBottom={4}>
                <Link href={ShowCreateBlockReservationsController.show().url}>
                    <Button colorPalette="blue" size="sm">
                        <LuPlus />
                        Create Block Booking
                    </Button>
                </Link>
            </Flex>
            <VStack gap={8}>
                {courts.map((court) => (
                    <CourtBlockReservationSection id={court.id} name={court.name} blockReservations={court.blockReservations} />
                ))}
            </VStack>
        </SchedulingLayout>
    );
}

export default BlockReservationsPage;
