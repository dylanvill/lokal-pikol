import { Box, Container, HStack, Link as ChakraLink, Stack, Text, VStack } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { GrFacebookOption, GrInstagram, GrMail } from 'react-icons/gr';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Container as="footer" bg="blue.900" color="gray.100" fluid py={12}>
            <Container>
                <Stack direction={{ base: 'column', md: 'row' }} gap={8} justify="space-between" align={{ base: 'flex-start', md: 'center' }}>
                    <VStack align="flex-start" gap={2} maxW={{ base: 'full', md: 'sm' }}>
                        <Box bg="blue.500" borderRadius="md" px={3} py={1} fontWeight="bold" fontSize="lg">
                            Lokal Pikol
                        </Box>
                        <Text fontSize="sm" color="gray.300">
                            Local pickleball booking system made in Negros Oriental, for Negros Oriental
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                            &copy; {currentYear} Lokal Pikol. All rights reserved.
                        </Text>
                    </VStack>

                    <Stack direction={{ base: 'column', sm: 'row' }} gap={{ base: 6, sm: 10 }} flexWrap="wrap">
                        <VStack align="flex-start" gap={2} minW="140px">
                            <Text fontSize="sm" color="color.100" letterSpacing={0.5} fontWeight="semibold" textTransform="uppercase">
                                Navigate
                            </Text>
                            <Link href="/reservations">
                                <Text fontSize="sm">My reservations</Text>
                            </Link>
                            <Link href="/">
                                <Text fontSize="sm">Facilities</Text>
                            </Link>
                        </VStack>

                        <VStack align="flex-start" gap={2} minW="160px">
                            <Text fontSize="sm" color="color.100" letterSpacing={0.5} fontWeight="semibold" textTransform="uppercase">
                                Legal
                            </Text>
                            <Link href="/terms-and-conditions">
                                <Text fontSize="sm">Terms &amp; Conditions</Text>
                            </Link>
                            <Link href="/privacy-policy">
                                <Text fontSize="sm">Privacy Policy</Text>
                            </Link>
                        </VStack>

                        <VStack align="flex-start" gap={2} minW="160px">
                            <Text fontSize="sm" color="color.100" letterSpacing={0.5} fontWeight="semibold" textTransform="uppercase">
                                Socials
                            </Text>
                            <HStack gap={3}>
                                <ChakraLink href="https://facebook.com" display="inline-flex" alignItems="center" gap={2} fontSize="sm">
                                    <GrFacebookOption color="white" />
                                    <Text fontSize="sm" color="white">
                                        Facebook
                                    </Text>
                                </ChakraLink>
                            </HStack>
                            <HStack gap={3}>
                                <ChakraLink href="https://instagram.com" display="inline-flex" alignItems="center" gap={2} fontSize="sm">
                                    <GrInstagram color="white" />
                                    <Text fontSize="sm" color="white">
                                        Instagram
                                    </Text>
                                </ChakraLink>
                            </HStack>
                        </VStack>

                        <VStack align="flex-start" gap={2} minW="180px">
                            <Text fontSize="sm" color="color.100" letterSpacing={0.5} fontWeight="semibold" textTransform="uppercase">
                                Contact us
                            </Text>
                            <ChakraLink href="mailto:support@lokalpikol.com" display="inline-flex" alignItems="center" gap={2} fontSize="sm">
                                <GrMail color="white" />
                                <Text fontSize="sm" color="white">
                                    support@lokalpikol.com
                                </Text>
                            </ChakraLink>
                        </VStack>
                    </Stack>
                </Stack>
            </Container>
        </Container>
    );
}

export default Footer;
