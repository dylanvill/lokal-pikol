import { Badge, CheckboxCard, Field, Float } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { LuX } from 'react-icons/lu';
import currencyFormatter from '../../../../helpers/currencyFormatter';
import militaryTimeToAmPmTime from '../../../../helpers/militaryTimeToAmPmTime';
import { type CourtSlotState } from './types';

export interface CourtSlotProps {
    courtId: string;
    startTime: string;
    endTime: string;
    price: number;
    label: string;
    onSlotSelected: (courtId: string, startTime: string, price: number) => void;
    onSlotDeselected: (courtId: string, startTime: string, price: number) => void;
}

function CourtSlotSection({ courtId, startTime, endTime, price, onSlotSelected, onSlotDeselected }: CourtSlotProps) {
    const [internalState, setInternalState] = useState<CourtSlotState>('available');

    const handleClicked = (courtId: string, startTime: string, price: number) => {
        if (internalState === 'available') {
            setInternalState('selected');
            onSlotSelected(courtId, startTime, price);
        } else if (internalState === 'selected') {
            setInternalState('available');
            onSlotDeselected(courtId, startTime, price);
        }
    };

    const timeDisplay = useMemo(() => {
        return {
            startTime: militaryTimeToAmPmTime(startTime),
            endTime: militaryTimeToAmPmTime(endTime),
        };
    }, [startTime, endTime]);

    const formattedPrice = currencyFormatter(price);

    return (
        <Field.Root width="full">
            <CheckboxCard.Root
                key={`${courtId}-${startTime}-${endTime}`}
                name="slots[]"
                variant="solid"
                colorPalette="green"
                width="full"
                onClick={() => handleClicked(courtId, startTime, price)}
                size="sm"
            >
                <Float placement="top-start">
                    <Badge colorPalette="red" backgroundColor="red.400" size="xs">
                        <LuX color="white" />
                    </Badge>
                </Float>
                {/* <Float placement="top-start">
                    <Badge colorPalette="green" size="xs">
                        <LuCheck />
                    </Badge>
                </Float> */}
                <CheckboxCard.HiddenInput value={`${startTime}-${endTime}`} />
                <CheckboxCard.Control>
                    <CheckboxCard.Content>
                        <CheckboxCard.Label fontSize="md">{`${timeDisplay.startTime} - ${timeDisplay.endTime}`}</CheckboxCard.Label>
                        <CheckboxCard.Description fontSize="sm">{formattedPrice}</CheckboxCard.Description>
                    </CheckboxCard.Content>
                </CheckboxCard.Control>
            </CheckboxCard.Root>
        </Field.Root>
        // <Badge
        //     {...style}
        //     size="lg"
        //     onClick={internalState === 'reserved' ? undefined : () => handleClicked(courtId, startTime, price)}
        //     _hover={{ cursor: internalState === 'reserved' ? 'default' : 'pointer' }}
        //     fontFamily="mono"
        //     fontWeight="bold"
        // >
        //     <Icon />
        //     {startTime} - {endTime}
        // </Badge>
    );
}

export default CourtSlotSection;
