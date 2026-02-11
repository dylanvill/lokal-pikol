import { Box, Image, Card, VStack, Badge, Text, Heading, HStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import courtTypeIconParser from '../../helpers/courtTypeIconParser';
import typographyTokens from '../../lib/tokens/typography';
import type CourtPricing from '../../models/facility/CourtPricing';

interface CourtCardProps {
    id: string;
    name: string;
    photo: string;
    covered: boolean;
    courtPricings: CourtPricing[];
}

function CourtCard({ name, photo, covered, courtPricings }: CourtCardProps) {
    const Icon = courtTypeIconParser(covered);

    const formattedCourtPricings = courtPricings.map((pricing) => {
        const dateToday = dayjs().format('YYYY-MM-DD');

        return {
            ...pricing,
            startTime: dayjs(`${dateToday} ${pricing.startTime}`, 'YYYY-MM-DD HH:mm:ss').format('h:mm A'),
            endTime: dayjs(`${dateToday} ${pricing.endTime}`, 'YYYY-MM-DD HH:mm:ss').format('h:mm A'),
        };
    });

    return (
        <Card.Root borderRadius="lg" overflow="hidden">
            <Card.Body p={0}>
                <Image src={photo} alt={name} aspectRatio={16 / 9} width="100%" objectFit="cover" />

                <Box p={4} gap={0}>
                    <Heading marginBottom={0} fontSize={typographyTokens.title.fontSize.md}>
                        {name}
                    </Heading>
                    <Text display="inline-flex" alignItems="center" color={typographyTokens.small.colors.gray[500]} gap={1} marginBottom={2}>
                        <Icon color={typographyTokens.small.colors.gray[500]} /> {covered ? 'Covered' : 'Outdoor'}
                    </Text>
                    <VStack wrap="wrap" marginTop={4} alignItems="flex-start" gap={1}>
                        <Text fontSize={typographyTokens.small.fontSize} color={typographyTokens.small.colors.gray[500]} fontWeight="medium">
                            Court Hours:
                        </Text>
                        {formattedCourtPricings.map((pricing) => (
                            <HStack gap={0}>
                                <Badge key={pricing.id} size="sm" fontFamily="mono" borderRightRadius={0} colorPalette="blue">
                                    {pricing.startTime} - {pricing.endTime}
                                </Badge>
                                <Badge key={pricing.id} size="sm" fontFamily="mono" borderLeftRadius={0} colorPalette="orange">
                                    ₱{pricing.rate}
                                </Badge>
                            </HStack>
                        ))}
                    </VStack>
                </Box>
            </Card.Body>
        </Card.Root>
    );
}

export default CourtCard;
