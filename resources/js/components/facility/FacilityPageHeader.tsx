import { Box, Heading, Text } from '@chakra-ui/react';

export interface FacilityPageHeaderProps {
    title: string;
    description?: string;
}

function FacilityPageHeader({ title, description }: FacilityPageHeaderProps) {
    return (
        <Box mb={6}>
            <Heading size="lg" color="gray.800" mb={description ? 2 : 0}>
                {title}
            </Heading>
            {description && (
                <Text color="gray.600" fontSize="md">
                    {description}
                </Text>
            )}
        </Box>
    );
}

export default FacilityPageHeader;
