import { Badge, Button, HStack, Stack, Table, Text, VStack } from '@chakra-ui/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import militaryTimeToAmPmTime from '../../../shared/helpers/militaryTimeToAmPmTime';
import CreateBlockReservationModal from '../../components/reservation/CreateBlockReservationModal';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type BlockReservation from '../../models/BlockReservation';
import type CourtSlot from '../../models/CourtSlot';
import type SchedulingPageProps from '../../types/SchedulingPageProps';
import { type UuidString } from '../../types/String';

interface Court {
    id: UuidString;
    name: string;
}

interface BlockReservationsPageProps extends SchedulingPageProps {
    courts: Court[];
    slots: CourtSlot[];
    blockReservations: BlockReservation[];
}

function BlockReservationsPage() {
    const { courts, slots, blockReservations } = usePage<BlockReservationsPageProps>().props;
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <SchedulingLayout title="Block reservations">
            <VStack align="stretch" gap={6}>
                <HStack justify="end" align="center">
                    <Button colorPalette="blue" size="sm" onClick={() => setModalOpen(true)}>
                        <LuPlus />
                        Add block reservation
                    </Button>
                </HStack>

                {blockReservations.length === 0 ? (
                    <Text fontSize="sm" color="gray.500">
                        No block reservations yet.
                    </Text>
                ) : (
                    <Table.Root variant="outline" size="sm">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Name</Table.ColumnHeader>
                                <Table.ColumnHeader>Court</Table.ColumnHeader>
                                <Table.ColumnHeader>Day</Table.ColumnHeader>
                                <Table.ColumnHeader>Time</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {blockReservations.map((br) => (
                                <Table.Row key={br.id}>
                                    <Table.Cell fontWeight="medium">{br.name}</Table.Cell>
                                    <Table.Cell>
                                        <Badge variant="outline" colorPalette="blue" size="sm">
                                            {br.courtName}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>{br.dayOfTheWeek}</Table.Cell>
                                    <Table.Cell>
                                        {militaryTimeToAmPmTime(br.startTime)} – {militaryTimeToAmPmTime(br.endTime)}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                )}
            </VStack>

            <CreateBlockReservationModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                courts={courts}
                slots={slots}
                blockReservations={blockReservations}
            />
        </SchedulingLayout>
    );
}

export default BlockReservationsPage;
