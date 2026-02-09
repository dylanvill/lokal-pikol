import { Box, Image, Badge, HStack, Card } from '@chakra-ui/react';
import React from 'react';
import courtTypeIconParser from '../../helpers/courtTypeIconParser';
import type CourtSlot from '../../models/facility/CourtSlot';
import AppSmallText from '../app/AppSmallText';
import AppTitle from '../app/AppTitle';

interface CourtCardProps {
    id: string;
    name: string;
    photo: string;
    slots: CourtSlot[];
    covered: boolean;
}

function CourtCard({ name, photo, slots, covered }: CourtCardProps) {
    const Icon = courtTypeIconParser(covered);

    return (
        <Card.Root borderRadius="lg" overflow="hidden">
            <Card.Body p={0}>
                <Image src={photo} alt={name} aspectRatio={16 / 9} width="100%" objectFit="cover" />

                <Box p={4} gap={0}>
                    <AppTitle marginBottom={0}>{name}</AppTitle>
                    <AppSmallText display="inline-flex" alignItems="center" gap={1} marginBottom={2}>
                        <Icon color="gray.500" /> {covered ? 'Covered' : 'Outdoor'}
                    </AppSmallText>
                    <HStack wrap="wrap" marginTop={4}>
                        {slots.map((slot, index) => (
                            <Badge key={index} size="sm">
                                {slot.time}
                            </Badge>
                        ))}
                    </HStack>
                </Box>
            </Card.Body>
        </Card.Root>
    );
}

export default CourtCard;
