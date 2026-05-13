import { Editable, HStack, IconButton, Spinner } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { LuPencilLine } from 'react-icons/lu';
import { update } from '@/actions/App/Http/Scheduling/Court/Controllers/UpdateCourtController';
import { toaster } from '../../../shared/components/ui/toaster';
import { type UuidString } from '../../types/String';

interface CourtNameEditableProps {
    id: UuidString;
    name: string;
}

function CourtNameEditable({ id, name }: CourtNameEditableProps) {
    const [displayName, setDisplayName] = useState(name);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { transform, patch, processing } = useForm({ name });

    useEffect(() => {
        setDisplayName(name);
    }, [name]);

    function handleValueCommit({ value }: { value: string }) {
        const trimmed = value.trim();

        if (!trimmed || trimmed === name) {
            return;
        }

        setDisplayName(trimmed);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            transform(() => ({ name: trimmed }));
            patch(update(id).url, {
                preserveScroll: true,
                onSuccess: () => {
                    toaster.create({
                        title: 'Court name updated.',
                        type: 'success',
                        duration: 3000,
                    });
                },
                onError: (errors) => {
                    toaster.create({
                        title: errors.name ?? 'Failed to update court name.',
                        type: 'error',
                        duration: 5000,
                    });
                },
            });
        }, 500);
    }

    return (
        <Editable.Root value={displayName} onValueChange={(e) => setDisplayName(e.value)} onValueCommit={handleValueCommit} disabled={processing}>
            <HStack gap={1} align="center">
                <Editable.Preview fontWeight="semibold" fontSize="md" />
                <Editable.Input fontWeight="semibold" fontSize="md" />
                <Editable.Control>
                    <Editable.EditTrigger asChild>
                        {processing ? (
                            <Spinner size="sm" animationDuration=".75s" />
                        ) : (
                            <IconButton variant="ghost" size="2xs" aria-label="Edit court name">
                                <LuPencilLine />
                            </IconButton>
                        )}
                    </Editable.EditTrigger>
                </Editable.Control>
            </HStack>
        </Editable.Root>
    );
}

export default CourtNameEditable;
