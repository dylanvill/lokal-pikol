import { Box, Button, Card, Field, Input, Stack } from '@chakra-ui/react';
import type CourtBlockReservation from '../../../models/CourtBlockReservation';
import type CourtSlot from '../../../models/CourtSlot';
import CourtsSection from './CourtsSection';
import DaysOfTheWeekSection from './DaysOfTheWeekSection';
import useBlockReservationForm from './hooks/useBlockReservationForm';
import useNormalizeSlots from './hooks/useNormalizeSlots';
import TimeSlotsSection from './TimeSlotsSection';

export interface CreateBlockReservationFormProps {
    courts: CourtBlockReservation[];
    slots: CourtSlot[];
}

function CreateBlockReservationForm({ courts, slots }: CreateBlockReservationFormProps) {
    const {
        name,
        selectedCourts,
        selectedDays,
        selectedSlots,
        handleNameChanged,
        handleCourtCheckChanged,
        handleDayCheckChanged,
        handleSlotCheckChanged,
        handleSubmit,
    } = useBlockReservationForm();

    const slotsDisabled = selectedCourts.length === 0 || selectedDays.length === 0;

    const normalizedSlots = useNormalizeSlots({ plainSlots: slots, courts: courts, selectedDays, selectedCourts });

    return (
        <form onSubmit={handleSubmit} autoComplete="false">
            <Card.Root variant="outline">
                <Card.Header>
                    <Card.Title>Create a new block reservation</Card.Title>
                </Card.Header>

                <Card.Body>
                    <Stack gap={6}>
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input
                                placeholder="Open Play, Club Reservation, DUPR Night, etc."
                                value={name}
                                onChange={(e) => handleNameChanged(e.target.value)}
                                required
                            />
                        </Field.Root>

                        <CourtsSection courtSelection={courts} selectedCourts={selectedCourts} onCheckChanged={handleCourtCheckChanged} />
                        <DaysOfTheWeekSection selectedDays={selectedDays} onCheckChanged={handleDayCheckChanged} />
                        <Box pointerEvents={slotsDisabled ? 'none' : 'initial'} opacity={slotsDisabled ? 0.25 : 1}>
                            <TimeSlotsSection slots={normalizedSlots} selectedSlots={selectedSlots} onCheckChanged={handleSlotCheckChanged} />
                        </Box>
                    </Stack>
                </Card.Body>

                <Card.Footer>
                    <Button colorPalette="blue" type="submit">
                        Save block reservation
                    </Button>
                </Card.Footer>
            </Card.Root>
        </form>
    );
}

export default CreateBlockReservationForm;
