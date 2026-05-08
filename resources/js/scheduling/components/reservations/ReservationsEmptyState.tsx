import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import CourtsController from '@/actions/App/Http/Scheduling/Court/Controllers/CourtsController';

function ReservationsEmptyState() {
    return (
        <Flex justify="center" align="center" height="50vh">
            <VStack gap={4}>
                <Text color="gray.500">No courts yet. Add one to get started.</Text>
                <Link href={CourtsController.show.url()}>
                    <Button variant="outline" size="sm">Go to Courts</Button>
                </Link>
            </VStack>
        </Flex>
    );
}

export default ReservationsEmptyState;
