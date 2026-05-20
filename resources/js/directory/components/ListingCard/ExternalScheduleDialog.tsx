import { Button, Checkbox, Dialog, Portal, Text } from '@chakra-ui/react';
import { useState } from 'react';
import type ListingSchedule from '../../models/ListingSchedule';

interface ExternalScheduleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courtName: string;
    schedule: ListingSchedule;
    onSkipFuture: () => void;
}

function ExternalScheduleDialog({ open, onOpenChange, courtName, schedule, onSkipFuture }: ExternalScheduleDialogProps) {
    const [skipFuture, setSkipFuture] = useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Leaving Lokal Pikol</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>
                                You are now leaving Lokal Pikol and moving to {schedule.providerName} to view{' '}
                                {courtName}'s schedule.
                            </Text>
                            <Text mt={3}>
                                Lokal Pikol is simply a court discovery platform. From here, {courtName} manages its
                                own schedule directly through {schedule.providerName} and is outside Lokal Pikol's
                                control.
                            </Text>
                            <Checkbox.Root
                                marginTop={4}
                                checked={skipFuture}
                                onCheckedChange={(e) => setSkipFuture(!!e.checked)}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                                <Checkbox.Label>Don't show this again</Checkbox.Label>
                            </Checkbox.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                onClick={() => {
                                    if (skipFuture) onSkipFuture();
                                    onOpenChange(false);
                                    window.open(schedule.url, '_blank');
                                }}
                                colorPalette="blue"
                            >
                                Continue to {schedule.providerName}
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default ExternalScheduleDialog;
