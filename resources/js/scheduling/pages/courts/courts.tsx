import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import AddCourtModal from '../../components/court/AddCourtModal';
import CourtCard from '../../components/court/CourtCard';
import SchedulingLayout from '../../layouts/SchedulingLayout';

interface Court {
    id: number;
    name: string;
}

const dummyCourts: Court[] = [
    { id: 1, name: 'Court 1' },
    { id: 2, name: 'Court 2' },
];

function CourtsPage() {
    const courts = dummyCourts;

    return (
        <SchedulingLayout title="Courts">
            <VStack align="stretch" gap={6}>
                <HStack justify="space-between" align="center">
                    <Text color="gray.500" fontSize="sm">
                        {courts.length} {courts.length === 1 ? 'court' : 'courts'}
                    </Text>
                    <AddCourtModal />
                </HStack>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} maxW={{ sm: courts.length === 1 ? '50%' : 'full' }}>
                    {courts.map((court) => (
                        <CourtCard key={court.id} id={court.id} name={court.name} />
                    ))}
                </SimpleGrid>
            </VStack>
        </SchedulingLayout>
    );
}

export default CourtsPage;
