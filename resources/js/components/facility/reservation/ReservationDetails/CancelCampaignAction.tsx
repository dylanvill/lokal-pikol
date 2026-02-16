import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { LuX } from 'react-icons/lu';

export interface CancelCampaignActionProps {
    id: string;
}

function CancelCampaignAction({ id }: CancelCampaignActionProps) {
    const [cancelling, setCancelling] = useState(false);

    const handleCancelReservation = () => {
        router.post(`/facility/reservations/${id}/cancel`, undefined, {
            onStart: () => setCancelling(true),
            onFinish: () => setCancelling(false),
        });
    };
    return (
        <Dialog.Root role="alertdialog">
            <Dialog.Trigger asChild>
                <Button colorPalette="red">
                    Cancel <LuX />
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Cancel Reservation?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>
                                Are you sure you want to cancel this reservation? This action cannot be undone. The user will be notified of the
                                cancellation and the reservation slot will become available for other customers to book.
                            </Text>
                            <Text fontWeight="bold" fontStyle="italic">
                                You will have to coordinate with the customer to refund their payment if they have already paid for the reservation.
                            </Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" disabled={cancelling}>
                                    Cancel
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="red" onClick={handleCancelReservation} disabled={cancelling} loading={cancelling}>
                                I understand, cancel reservation
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" disabled={cancelling}/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default CancelCampaignAction;
