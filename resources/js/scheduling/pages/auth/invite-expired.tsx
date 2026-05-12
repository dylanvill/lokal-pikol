import { Box, Button, Card, Center, Container, Image, Text, VStack } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { show as showLogin } from '@/actions/App/Http/Scheduling/Auth/Controllers/LoginController';
import Logo from '../../../../images/logo/lokal-pikol-primary.svg';

export default function InviteExpiredPage() {
    return (
        <>
            <Head title="Invite Link Expired" />
            <Container fluid backgroundColor="gray.50">
                <Center width="full" height="100vh">
                    <Box width="md">
                        <Card.Root>
                            <Card.Header>
                                <VStack align="center" gap={3} py={2}>
                                    <Image src={Logo} alt="Lokal Pikol" maxH={20} />
                                </VStack>
                            </Card.Header>
                            <Card.Body>
                                <VStack align="center" gap={3} textAlign="center">
                                    <Text fontWeight="semibold" fontSize="lg">
                                        This invite link has expired
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        Invite links are valid for 24 hours. Ask your Lokal Pikol
                                        administrator to send a new one.
                                    </Text>
                                </VStack>
                            </Card.Body>
                            <Card.Footer justifyContent="center">
                                <Button variant="ghost" colorPalette="blue" asChild>
                                    <a href={showLogin().url}>Back to sign in</a>
                                </Button>
                            </Card.Footer>
                        </Card.Root>
                    </Box>
                </Center>
            </Container>
        </>
    );
}
