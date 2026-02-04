import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export interface StepContentContainerProps {
    renderIcon: () => React.ReactNode;
    children: React.ReactNode;
    title: string;
    description: string;
}

function SectionContainer({ renderIcon, title, description, children }: StepContentContainerProps) {
    return (
        <Box>
            <HStack gap={4} justifyContent="flex-start" alignItems="center" marginBottom={6}>
                {renderIcon()}
                <VStack gap={0} alignItems="flex-start">
                    <Heading size="lg">{title}</Heading>
                    <Text>{description}</Text>
                </VStack>
            </HStack>
            <Box>{children}</Box>
        </Box>
    );
}

export default SectionContainer;
