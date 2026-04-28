import { Button, Dialog, Field, Input, Portal } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';

function AddCourtModal() {
    const [open, setOpen] = useState(false);
    const { data, setData, processing, errors, reset } = useForm({ name: '' });

    function handleSubmit() {
        // TODO: wire up to POST /courts once the controller is ready
        // post(CourtsStoreController.url(), {
        //     onSuccess: () => { reset(); setOpen(false); },
        // });
    }

    function handleOpenChange(open: boolean) {
        if (!open) reset();
        setOpen(open);
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => handleOpenChange(e.open)}>
            <Dialog.Trigger asChild>
                <Button colorPalette="blue" size="sm">
                    <LuPlus />
                    Add new court
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Add new court</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Field.Root invalid={!!errors.name}>
                                <Field.Label>Court name</Field.Label>
                                <Input
                                    placeholder="e.g. Court 3"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                />
                                {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
                            </Field.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="blue"
                                disabled={!data.name.trim() || processing}
                                loading={processing}
                                onClick={handleSubmit}
                            >
                                Add court
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger />
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default AddCourtModal;
