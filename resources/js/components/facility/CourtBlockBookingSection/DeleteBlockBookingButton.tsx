import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuCalendar, LuCalendarSync, LuClock1, LuX } from 'react-icons/lu';
import DetailWithIcon from '../../shared/DetailWithIcon';

export interface DeleteBlockBookingButtonProps {
    id: string;
    name: string;
    day: string;
    startTimeDisplay: string;
    endTimeDisplay: string;
}

const DeleteBlockBookingButton = ({ id, name, day, startTimeDisplay, endTimeDisplay }: DeleteBlockBookingButtonProps) => {
    return (
        <Dialog.Root role="alertdialog">
            <Dialog.Trigger asChild>
                <Button variant="ghost" size="xs" colorPalette="red">
                    Remove <LuX />
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Are you sure you want to remove "{name}"?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text marginBottom={4}>
                                This will permanently delete the block booking, making these time slots available for customers to reserve.
                            </Text>
                            <DetailWithIcon
                                icon={<LuCalendar />}
                                label={name}
                                textProps={{
                                    color: 'black',
                                    fontWeight: 'medium',
                                }}
                            />
                            <DetailWithIcon
                                icon={<LuCalendarSync />}
                                label={`Every ${day}`}
                                textProps={{
                                    color: 'black',
                                    fontWeight: 'medium',
                                }}
                            />
                            <DetailWithIcon
                                icon={<LuClock1 />}
                                label={`${startTimeDisplay} - ${endTimeDisplay}`}
                                textProps={{
                                    color: 'black',
                                    fontWeight: 'medium',
                                }}
                            />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Link href={`/facility/courts/block-bookings/${id}`} method="delete">
                                <Button colorPalette="red">Remove</Button>
                            </Link>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default DeleteBlockBookingButton;
