import { Button, Flex } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuArrowLeft } from 'react-icons/lu';
import BlockReservationsController from '@/actions/App/Http/Scheduling/Court/Controllers/BlockReservationsController';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type CourtBlockReservation from '../../models/CourtBlockReservation';
import type SchedulingPageProps from '../../types/SchedulingPageProps';

interface CreateBlockReservationsPageProps extends SchedulingPageProps {
    courts: CourtBlockReservation[];
}

function CreateBlockReservationsPage({ courts }: CreateBlockReservationsPageProps) {
    return (
        <SchedulingLayout title="Block reservations">
            <Flex justify="space-between" align="center">
                <Link color="black" href={BlockReservationsController.show().url}>
                    <Button color="black" variant="plain" size="xs">
                        <LuArrowLeft />
                        Back
                    </Button>
                </Link>
            </Flex>
        </SchedulingLayout>
    );
}

export default CreateBlockReservationsPage;
