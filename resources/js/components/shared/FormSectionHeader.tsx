import { Box, Heading, HStack, Text } from '@chakra-ui/react';

export interface FormSectionHeaderProps {
    icon?: React.ReactNode | null;
    title: string;
    description: string;
}

function FormSectionHeader({ icon, title, description }: FormSectionHeaderProps) {
    return (
        <HStack alignItems="flex-start" marginBottom={4}>
            {icon && <Box marginTop={2}>{icon}</Box>}
            <Box gap={0}>
                <Heading>{title}</Heading>
                <Text>{description}</Text>
            </Box>
        </HStack>
    );
}

export default FormSectionHeader;
