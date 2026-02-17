import { Alert, type AlertRootProps } from '@chakra-ui/react';
import React from 'react';

export interface BaseAlertProps {
    status: AlertRootProps['status'];
    title: string;
    description: string | React.ReactNode;
}

function BaseAlert({ status, title, description }: BaseAlertProps) {
    return (
        <Alert.Root status={status}>
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title>{title}</Alert.Title>
                <Alert.Description>{description}</Alert.Description>
            </Alert.Content>
        </Alert.Root>
    );
}

export default BaseAlert;
