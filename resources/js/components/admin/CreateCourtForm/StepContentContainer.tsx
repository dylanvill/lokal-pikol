import { Box, Heading, Steps, Text } from '@chakra-ui/react';
import React from 'react';

export interface StepContentContainerProps {
    index: number;
    children: React.ReactNode;
    title: string;
    description: string;
}

function StepContentContainer({ index, title, description, children }: StepContentContainerProps) {
    return (
        <Steps.Content index={index}>
            <Box>
                <Heading>{title}</Heading>
                <Text marginBottom={8}>{description}</Text>
                {children}
            </Box>
        </Steps.Content>
    );
}

export default StepContentContainer;
