import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import CourtsController from '@/actions/App/Http/Scheduling/Court/Controllers/CourtsController';

function AvailabilityEmptyState() {
    return (
        <Box py={12} px={6} borderWidth="1px" borderStyle="dashed" borderRadius="md" borderColor="gray.300" textAlign="center">
            <Stack gap={3} align="center">
                <Text fontSize="md" color="gray.600">
                    No courts yet. Add one to start sharing availability.
                </Text>
                <Link href={CourtsController.show.url()}>
                    <Button size="sm" colorPalette="blue">
                        Go to Courts
                    </Button>
                </Link>
            </Stack>
        </Box>
    );
}

export default AvailabilityEmptyState;
