import { Field, RadioCard, Wrap } from '@chakra-ui/react';
import type Court from '../../../models/Court';

interface CourtSectionProps {
    courts: Court[];
    value: string;
    onChange: (courtId: string) => void;
}

function CourtSection({ courts, value, onChange }: CourtSectionProps) {
    return (
        <RadioCard.Root
            value={value}
            onValueChange={(e) => e.value && onChange(e.value)}
            colorPalette="blue"
            size="sm"
        >
            <Field.Root>
                <Field.Label>Court</Field.Label>
                <Wrap gap={2} mt={1}>
                    {courts.map((court) => (
                        <RadioCard.Item key={court.id} value={court.id}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                <RadioCard.ItemText>{court.name}</RadioCard.ItemText>
                                <RadioCard.ItemIndicator />
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </Wrap>
            </Field.Root>
        </RadioCard.Root>
    );
}

export default CourtSection;
