import { CheckboxCard } from '@chakra-ui/react';

interface CheckboxSlotCardProps {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
}

function CheckboxSlotCard({ label, checked, onCheckedChange, disabled }: CheckboxSlotCardProps) {
    return (
        <CheckboxCard.Root
            checked={checked}
            onCheckedChange={(e) => onCheckedChange(!!e.checked)}
            disabled={disabled}
            size="sm"
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
                    {label}
                </CheckboxCard.Label>
            </CheckboxCard.Control>
        </CheckboxCard.Root>
    );
}

export default CheckboxSlotCard;
