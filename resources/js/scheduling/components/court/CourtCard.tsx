import { Badge, Button, Card, HStack } from '@chakra-ui/react';
import { LuCalendarDays } from 'react-icons/lu';
import CreateBookingModal from '../booking/CreateBookingModal';

interface CourtCardProps {
    id: number;
    name: string;
}

function CourtCard({ id, name }: CourtCardProps) {
    return (
        <Card.Root variant="outline" size="md">
            <Card.Body gap={3}>
                <HStack justify="space-between" align="flex-start">
                    <Card.Title fontSize="md">{name}</Card.Title>
                    <Badge colorPalette="green" size="sm">Active</Badge>
                </HStack>
            </Card.Body>
            <Card.Footer pt={0} gap={2}>
                <Button variant="outline" size="sm" flex="1">
                    <LuCalendarDays />
                    View schedule
                </Button>
                <CreateBookingModal court={{ id, name }} />
            </Card.Footer>
        </Card.Root>
    );
}

export default CourtCard;
