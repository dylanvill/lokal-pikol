import { Container, Text, VStack } from '@chakra-ui/react';
import LandingPageLayout from '@/layouts/LandingPageLayout';

export default function Court() {
    return (
        <LandingPageLayout title="Court">
            <Container maxW="7xl" py={8}>
                <VStack gap={6} align="stretch">
                    <Text fontSize="lg" color="gray.600">
                        Court page content will go here
                    </Text>
                </VStack>
            </Container>
        </LandingPageLayout>
    );
}