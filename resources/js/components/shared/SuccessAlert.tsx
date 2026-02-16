import { Alert } from '@chakra-ui/react';

export interface SuccessAlertProps {
    title: string;
    description: string;
}

function SuccessAlert({ title, description }: SuccessAlertProps) {
    return (
        <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title>{title}</Alert.Title>
                <Alert.Description>{description}</Alert.Description>
            </Alert.Content>
        </Alert.Root>
    );
}

export default SuccessAlert;
