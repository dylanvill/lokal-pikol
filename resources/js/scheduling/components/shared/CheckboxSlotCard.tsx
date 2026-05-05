import { CheckboxCard } from '@chakra-ui/react';

interface CheckboxSlotCardProps {
    time: string;
    label: string | null;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
}

function CheckboxSlotCard({ time, label, checked, onCheckedChange, disabled }: CheckboxSlotCardProps) {
    return (
        <CheckboxCard.Root
            checked={checked}
            onCheckedChange={(e) => onCheckedChange(!!e.checked)}
            disabled={disabled}
            size="sm"
            value={time}
            variant="solid"
            {...(disabled
                ? {
                      backgroundColor: 'red.100',
                  }
                : { cursor: 'pointer' })}
        >
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
                <CheckboxCard.Label fontSize="xs" fontWeight="bold">
                    {time} {disabled && label ? `(${label})` : null}
                </CheckboxCard.Label>
            </CheckboxCard.Control>
        </CheckboxCard.Root>
    );
}

export default CheckboxSlotCard;
