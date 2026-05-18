import { Button, Dialog, Portal } from '@chakra-ui/react';
import type ListingSchedule from '../../models/ListingSchedule';

interface ExternalScheduleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    schedule: ListingSchedule;
}

function ExternalScheduleDialog({ open, onOpenChange, schedule }: ExternalScheduleDialogProps) {
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
                            You are now leaving Lokal Pikol and moving to {schedule.providerName} to view its schedule.
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                onClick={() => {
                                    onOpenChange(false);
                                    window.open(schedule.url, '_blank');
                                }}
                            >
                                Continue
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default ExternalScheduleDialog;
