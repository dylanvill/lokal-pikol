import { Box, Container, Flex, HStack, Image, Text, VStack, type ContainerProps, Link as ChakraLink, SimpleGrid } from '@chakra-ui/react';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { GrFacebookOption, GrInstagram } from 'react-icons/gr';
import Logo from '../../../images/logo/lokal-pikol-horizontal-white-out.svg';

function ListingLayout({
    title,
    children,
    contentContainerProps,
}: {
    title: string;
    children: React.ReactNode;
    contentContainerProps?: ContainerProps;
}) {
    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

                <meta
                    name="description"
                    content="Negros Oriental pickleball courts directory with verified information from court owners. Find local facilities, hours, and contact details."
                />
                <meta
                    name="keywords"
                    content="pickleball courts, Negros Oriental, court directory, pickleball facilities, court listings, sports facilities"
                />
                <meta name="author" content="Lokal Pikol" />

                <meta property="og:url" content="https://directory.lokalpikol.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta
                    property="og:description"
                    content="Negros Oriental pickleball courts directory with verified information from court owners. Find local facilities, hours, and contact details."
                />
                <meta property="og:image" content="https://directory.lokalpikol.com/images/og-image.jpg" />
                <meta property="og:image:secure_url" content="https://directory.lokalpikol.com/images/og-image.jpg" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:site_name" content="Lokal Pikol Directory" />

                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Box minH="100vh" bg="gray.50" colorPalette="blue">
                <Box display="flex" flexDirection="column" minH="100vh">
                    <Container gradientFrom="blue.900" gradientTo="blue.800" bgGradient="to-t" fluid paddingTop={4} paddingBottom={16}>
                        <Container paddingY={4}>
                            <Flex justify="center" align="center" flexDirection="column">
                                <Link href="/">
                                    <HStack gap={3}>
                                        <Image src={Logo} alt="Lokal Pikol" objectFit="contain" width="full" maxHeight={16} />
                                    </HStack>
                                </Link>
                                <Text color="white" marginTop={4} fontSize="sm" textAlign="center">
                                    Negros Oriental pickleball courts, verified by facilities
                                </Text>
                            </Flex>
                        </Container>
                    </Container>
                    <Container py={4} shadow="2xl" borderTopRadius={20} backgroundColor="white" marginTop={-12} flex="1" {...contentContainerProps}>
                        {children}
                    </Container>
                </Box>
            </Box>

            <Container as="footer" bg="blue.900" color="gray.100" fluid py={12}>
                <Container>
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 4,
                        }}
                        gap={4}
                    >
                        <VStack align={{ base: 'center', md: 'flex-start' }} gap={3} flex="1" maxW={{ base: 'full', lg: '300px' }}>
                            <Image src={Logo} alt="Lokal Pikol" objectFit="contain" maxHeight={12} />
                            <Text color="white" fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
                                Negros Oriental pickleball court directory
                            </Text>
                        </VStack>
                        <VStack align={{ base: 'center', md: 'flex-start' }} gap={2} minW={{ base: 'auto', sm: '160px' }}>
                            <Text fontSize="sm" color="color.100" letterSpacing={0.5} fontWeight="semibold" textTransform="uppercase">
                                Navigation
                            </Text>
                            <Link href="/">
                                <Text fontSize="sm">Home</Text>
                            </Link>
                            <Link href="/terms-and-conditions">
                                <Text fontSize="sm">Terms &amp; Conditions</Text>
                            </Link>
                            <Link href="/privacy-policy">
                                <Text fontSize="sm">Privacy Policy</Text>
                            </Link>
                        </VStack>
                        <VStack align={{ base: 'center', md: 'flex-start' }} gap={2} minW={{ base: 'auto', sm: '160px' }}>
                            <Text fontSize="sm" color="color.100" letterSpacing={0.5} fontWeight="semibold" textTransform="uppercase">
                                Socials
                            </Text>
                            <HStack gap={3}>
                                <ChakraLink href="https://facebook.com/lokalpikol" display="inline-flex" alignItems="center" gap={2} fontSize="sm">
                                    <GrFacebookOption color="white" />
                                    <Text fontSize="sm" color="white">
                                        Facebook
                                    </Text>
                                </ChakraLink>
                            </HStack>
                            <HStack gap={3}>
                                <ChakraLink href="https://instagram.com/lokalpikol" display="inline-flex" alignItems="center" gap={2} fontSize="sm">
                                    <GrInstagram color="white" />
                                    <Text fontSize="sm" color="white">
                                        Instagram
                                    </Text>
                                </ChakraLink>
                            </HStack>
                        </VStack>
                        <VStack align={{ base: 'center', md: 'flex-start' }} gap={2} minW={{ base: 'auto', sm: '180px' }}>
                            <Text fontSize="sm" color="white" textAlign={{ base: 'center', md: 'left' }}>
                                Need any changes to your listing? Want to list a new pickleball court? Have any questions or suggestions? Feel free to
                                reach out to us on our social media platforms and we will get back to you as soon as we can!
                            </Text>
                        </VStack>
                    </SimpleGrid>
                </Container>
            </Container>
        </>
    );
}

export default ListingLayout;
