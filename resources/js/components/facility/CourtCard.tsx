import { Box, Image, Card, VStack, Badge, Text, Heading } from '@chakra-ui/react';
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
                    <VStack wrap="wrap" marginTop={4}>
                        {courtPricings.map((pricing, index) => (
                            <Badge key={index} size="sm">
                                {pricing.startTime} - {pricing.endTime}: ${pricing.rate}
                            </Badge>
                        ))}
                    </VStack>
                </Box>
            </Card.Body>
        </Card.Root>
    );
}

export default CourtCard;
