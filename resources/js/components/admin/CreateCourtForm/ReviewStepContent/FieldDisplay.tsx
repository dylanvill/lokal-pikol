import { Box } from '@chakra-ui/react';
import React from 'react';
import AppSmallText from '../../../app/AppSmallText';
import AppTitle from '../../../app/AppTitle';

export interface FieldDisplayProps {
    label: string;
    children: string | React.ReactNode;
}

function FieldDisplay({ label, children }: FieldDisplayProps) {
    return (
        <Box gap={1}>
            <AppSmallText marginBottom={0}>{label}</AppSmallText>
            {typeof children === 'string' ? <AppTitle>{children}</AppTitle> : children}
        </Box>
    );
}

export default FieldDisplay;
