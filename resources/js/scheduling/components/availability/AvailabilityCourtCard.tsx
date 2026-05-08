import { Badge, Box, Button, Card, HStack, Heading, Wrap } from '@chakra-ui/react';
import { useRef } from 'react';
import { LuDownload } from 'react-icons/lu';
import { formatCourtAvailabilityText } from '../../helpers/formatAvailabilityText';
import type AvailabilityCourt from '../../models/AvailabilityCourt';
import useDownloadCourtImage from '../../pages/availability/hooks/useDownloadCourtImage';
import { type DateString } from '../../types/DateTime';
import AvailabilityCopyButton from './AvailabilityCopyButton';
import AvailabilityImageTemplate from './AvailabilityImageTemplate';

interface AvailabilityCourtCardProps {
    facilityName: string;
    court: AvailabilityCourt;
    date: DateString;
    dateDisplay: string;
    backgroundColor: string;
}

function AvailabilityCourtCard({ facilityName, court, date, dateDisplay, backgroundColor }: AvailabilityCourtCardProps) {
    const imageRef = useRef<HTMLDivElement>(null);
    const { isDownloading, download } = useDownloadCourtImage();

    const courtText = formatCourtAvailabilityText(court, dateDisplay);

    const handleDownload = () => {
        if (imageRef.current) {
            download(imageRef.current, court.name, date);
        }
    };

    return (
        <>
            <Card.Root variant="outline">
                <Card.Header>
                    <HStack justify="space-between" align="center" wrap="wrap" gap={2}>
                        <Heading size="md">{court.name}</Heading>
                        <HStack gap={2}>
                            <AvailabilityCopyButton text={courtText} label="Copy" />
                            <Button
                                size="sm"
                                colorPalette="blue"
                                onClick={handleDownload}
                                loading={isDownloading}
                            >
                                <LuDownload />
                                Download image
                            </Button>
                        </HStack>
                    </HStack>
                </Card.Header>
                <Card.Body>
                    <Wrap gap={2}>
                        {court.slots.map((slot) => (
                            <Badge
                                key={slot.slot}
                                colorPalette={slot.isAvailable ? 'blue' : 'red'}
                                variant="subtle"
                                size="md"
                            >
                                {slot.display}
                            </Badge>
                        ))}
                    </Wrap>
                </Card.Body>
            </Card.Root>

            <Box position="absolute" left="-99999px" top={0} aria-hidden>
                <AvailabilityImageTemplate
                    ref={imageRef}
                    facilityName={facilityName}
                    court={court}
                    dateDisplay={dateDisplay}
                    backgroundColor={backgroundColor}
                />
            </Box>
        </>
    );
}

export default AvailabilityCourtCard;
