import { Box, Card, VStack } from '@chakra-ui/react';
import { LuCalendarSync, LuClock1 } from 'react-icons/lu';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';
import type BlockBooking from '../../../models/facility/BlockBooking';
import DetailWithIcon from '../../shared/DetailWithIcon';
import DeleteBlockBookingButton from './DeleteBlockBookingButton';

interface BlockBookingCardProps {
    id: string;
    name: string;
    day: BlockBooking['day'];
    startTime: string;
    endTime: string;
}

function BlockBookingCard({ id, name, day, startTime, endTime }: BlockBookingCardProps) {
    const startTimeDisplay = militaryTimeToAmPmTime(startTime);
    const endTimeDisplay = militaryTimeToAmPmTime(endTime);

    return (
        <Card.Root variant="outline" size="sm">
            <Card.Header>
                <Card.Title>{name}</Card.Title>
            </Card.Header>
            <Card.Body>
                <VStack align="stretch" gap={2}>
                    <DetailWithIcon
                        icon={<LuCalendarSync />}
                        label={`Every ${day}`}
                        textProps={{
                            color: 'black',
                            fontWeight: 'medium',
                        }}
                    />
                    <DetailWithIcon
                        icon={<LuClock1 />}
                        label={`${startTimeDisplay} - ${endTimeDisplay}`}
                        textProps={{
                            color: 'black',
                            fontWeight: 'medium',
                        }}
                    />
                </VStack>
            </Card.Body>
            <Card.Footer>
                <Box justifyContent="flex-end" display="flex" width="100%">
                    <DeleteBlockBookingButton id={id} name={name} day={day} startTimeDisplay={startTimeDisplay} endTimeDisplay={endTimeDisplay} />
                </Box>
            </Card.Footer>
        </Card.Root>
    );
}

export default BlockBookingCard;
