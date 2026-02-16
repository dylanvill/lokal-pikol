import { Alert, type AlertRootProps } from '@chakra-ui/react';

export interface BaseAlertProps {
    status: AlertRootProps['status'];
    title: string;
    description: string;
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
