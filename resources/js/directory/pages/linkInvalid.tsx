import { Heading, Text, Container, Box, Center, Link as ChakraLink } from '@chakra-ui/react';
import { PiHandPeace } from 'react-icons/pi';
import DirectoryLayout from '../layouts/DirectoryLayout';

function LinkInvalidPage() {
    return (
        <DirectoryLayout title="Invalid link">
            <Box display="flex" flexDirection="column" minH="100vh">
                <Container gradientFrom="blue.900" gradientTo="blue.800" bgGradient="to-t" fluid paddingTop={4} paddingBottom={20}></Container>
                <Container py={4} shadow="2xl" borderTopRadius={20} backgroundColor="white" marginTop={-12} flex="1" maxWidth="lg" paddingTop={12}>
                    <Center>
                        <PiHandPeace size={48} />
                    </Center>
                    <Heading textAlign="center">This link is no longer valid</Heading>
                    <Text textAlign="center">
                        We apologize for the inconvenience, but the link you followed is no longer active. The links are only valid for a limited
                        time. Please send us a message on our{' '}
                        <ChakraLink href="https://www.facebook.com/lokalpikol" target="_blank" color="blue.500">
                            Facebook page
                        </ChakraLink>{' '}
                        to request a new one.
                    </Text>
                </Container>
            </Box>
        </DirectoryLayout>
    );
}

export default LinkInvalidPage;
