import { Button, Dialog, Portal, Text } from '@chakra-ui/react';

interface BookingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courtName: string;
    bookingPlatform: string | null;
    onConfirm: () => void;
}

function BookingDialog({ open, onOpenChange, courtName, bookingPlatform, onConfirm }: BookingDialogProps) {
    const destination = bookingPlatform ?? "the facility's booking page";

    return (
        <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>You're about to leave Lokal Pikol to book {courtName}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>
                                Lokal Pikol is simply a court discovery platform. From here, {courtName} manages all the bookings and payments directly through {bookingPlatform} and are outside Lokal Pikol's control.
                            </Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                onClick={() => {
                                    onOpenChange(false);
                                    onConfirm();
                                }}
                                colorPalette="blue"
                            >
                                Continue to {destination}
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default BookingDialog;
