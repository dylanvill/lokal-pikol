import { Box, Heading, Steps } from '@chakra-ui/react';
import React from 'react';

export interface StepContentContainerProps {
    key: number;
    index: number;
    children: React.ReactNode;
    title: string;
}

function StepContentContainer({ key, index, title, children }: StepContentContainerProps) {
    return (
        <Steps.Content key={key} index={index}>
            <Box>
                <Heading marginBottom={4}>{title}</Heading>
                {children}
            </Box>
        </Steps.Content>
    );
}

export default StepContentContainer;
