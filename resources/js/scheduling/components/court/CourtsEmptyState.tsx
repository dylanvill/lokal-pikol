import { Box, Text } from '@chakra-ui/react';

function CourtsEmptyState() {
    return (
        <Box py={12} px={6} borderWidth="1px" borderStyle="dashed" borderRadius="md" borderColor="gray.300" textAlign="center">
            <Text fontSize="md" color="gray.600">
                No courts found. Contact your administrator if you're expecting to see courts here.
            </Text>
        </Box>
    );
}

export default CourtsEmptyState;
