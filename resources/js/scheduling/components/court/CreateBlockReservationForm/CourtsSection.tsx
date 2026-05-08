import { CheckboxCard, CheckboxGroup, Fieldset, SimpleGrid } from '@chakra-ui/react';
import { memo } from 'react';
import { type UuidString } from '../../../types/String';
import { type CreateBlockReservationFormInterface } from './types';

export interface CourtsSectionProps {
    courtSelection: { id: UuidString; name: string }[];
    selectedCourts: CreateBlockReservationFormInterface['courts'];
    onCheckChanged: (checked: boolean, id: UuidString) => void;
}

function CourtsSection({ courtSelection, selectedCourts, onCheckChanged }: CourtsSectionProps) {
    console.log('Courts section rendering');
    return (
        <Fieldset.Root>
            <CheckboxGroup>
                <Fieldset.Legend>Court</Fieldset.Legend>
                <SimpleGrid columns={3} gap={4} width="full">
                    {courtSelection.map((court) => (
                        <CheckboxCard.Root
                            key={court.id}
                            value={court.id}
                            checked={selectedCourts.some((id) => court.id === id)}
                            onCheckedChange={(details) => onCheckChanged(details.checked as boolean, court.id)}
                            size="sm"
                            colorPalette="blue"
                            variant="solid"
                        >
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control>
                                <CheckboxCard.Label>{court.name}</CheckboxCard.Label>
                            </CheckboxCard.Control>
                        </CheckboxCard.Root>
                    ))}
                </SimpleGrid>
            </CheckboxGroup>
        </Fieldset.Root>
    );
}

export default memo(CourtsSection);
