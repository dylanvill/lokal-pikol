import { Box, Image, Badge, HStack, Card } from '@chakra-ui/react';
import React from 'react';
import courtTypeIconParser from '../../helpers/courtTypeIconParser';
import AppSmallText from '../app/AppSmallText';
import AppTitle from '../app/AppTitle';

interface CourtCardProps {
    id: number;
    name: string;
    image: string;
    slots: string[];
    type: 'covered' | 'outdoor';
}

function CourtCard({ name, image, slots, type }: CourtCardProps) {
    const Icon = courtTypeIconParser(type);

    return (
        <Card.Root borderRadius="lg" overflow="hidden">
            <Card.Body p={0}>
                <Image src={image} alt={name} aspectRatio={16 / 9} width="100%" objectFit="cover" />

                <Box p={4} gap={0}>
                    <AppTitle marginBottom={0}>{name}</AppTitle>
                    <AppSmallText display="inline-flex" alignItems="center" gap={1} marginBottom={2}>
                        <Icon color="gray.500" /> {type}
                    </AppSmallText>
                    <HStack wrap="wrap" marginTop={4}>
                        {slots.map((slot, index) => (
                            <Badge key={index} size="sm">
                                {slot}
                            </Badge>
                        ))}
                    </HStack>
                </Box>
            </Card.Body>
        </Card.Root>
    );
}

export default CourtCard;
