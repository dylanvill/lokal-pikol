import { Box, Stack, Text } from '@chakra-ui/react';
import AddCourtModal from './AddCourtModal';

function CourtsEmptyState() {
    return (
        <Box py={12} px={6} borderWidth="1px" borderStyle="dashed" borderRadius="md" borderColor="gray.300" textAlign="center">
            <Stack gap={3} align="center">
                <Text fontSize="md" color="gray.600">
                    No courts yet. Add your first one to get started.
                </Text>
                <AddCourtModal />
            </Stack>
        </Box>
    );
}

export default CourtsEmptyState;
