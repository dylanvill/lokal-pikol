import { Box, Heading, HStack, Text } from '@chakra-ui/react';

export interface SectionHeader {
    icon: React.ReactNode;
    title: string;
    description: string;
}

/** TODO: Move in shared */
function SectionHeader({ icon, title, description }: SectionHeader) {
    return (
        <HStack alignItems="flex-start" marginBottom={4}>
            <Box marginTop={2}>{icon}</Box>
            <Box gap={0}>
                <Heading>{title}</Heading>
                <Text>{description}</Text>
            </Box>
        </HStack>
    );
}

export default SectionHeader;
