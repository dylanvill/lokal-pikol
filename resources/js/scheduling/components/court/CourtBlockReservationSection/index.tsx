import { Box, Heading } from '@chakra-ui/react';
import type BlockReservation from '../../../models/BlockReservation';
import { type UuidString } from '../../../types/String';

export interface CourtBlockReservationSectionProps {
    id: UuidString;
    name: string;
    blockReservations: BlockReservation[];
}

function CourtBlockReservationSection({ id, name, blockReservations }: CourtBlockReservationSectionProps) {
    return (
        <Box key={id}>
            <Heading>{name}</Heading>
        </Box>
    );
}

export default CourtBlockReservationSection;
