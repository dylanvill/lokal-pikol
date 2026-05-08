import { Button, Dialog, Portal } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { LuTrash } from 'react-icons/lu';
import { destroy } from '@/actions/App/Http/Scheduling/Court/Controllers/DeleteBlockReservationController';
import { toaster } from '../../../../shared/components/ui/toaster';
import { type UuidString } from '../../../types/String';

const SUCCESS_MESSAGE_KEY = 'delete-block-reservation-success';

export interface DeleteScheduleButtonProps {
    scheduleId: UuidString;
    scheduleName: string;
}

function DeleteScheduleButton({ scheduleId, scheduleName }: DeleteScheduleButtonProps) {
    const [open, setOpen] = useState(false);
    const { delete: destroySchedule, processing } = useForm({});

    const handleConfirm = () => {
        destroySchedule(destroy(scheduleId).url, {
            onSuccess: (page) => {
                const message = page.flash?.[SUCCESS_MESSAGE_KEY];
                if (typeof message === 'string') {
                    toaster.create({
                        title: message,
                        type: 'info',
                        duration: 5000,
                    });
                }
                setOpen(false);
            },
        });
    };

    return (
        <Dialog.Root open={open} onOpenChange={(e) => !processing && setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <Button size="xs" colorPalette="red">
                    <LuTrash /> Delete Schedule
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Delete schedule</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            Are you sure you want to delete &quot;{scheduleName}&quot;? This action cannot be undone.
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" disabled={processing}>
                                    Cancel
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="red" loading={processing} onClick={handleConfirm}>
                                Delete schedule
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default DeleteScheduleButton;
