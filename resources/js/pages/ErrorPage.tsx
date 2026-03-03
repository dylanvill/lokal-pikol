import { Heading, Text, Container, Box, Center, Image, Separator } from '@chakra-ui/react';
import { PiHandPeace } from 'react-icons/pi';
import LokalPikol from '../../images/logo/lokal-pikol-horizontal-primary.svg';
import RootLayout from '../layouts/RootLayout';

function ErrorPage({ status }: { status: number }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status];

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status];

    return (
        <RootLayout>
            <Box display="flex" flexDirection="column" minH="100vh">
                <Container gradientFrom="blue.900" gradientTo="blue.800" bgGradient="to-t" fluid paddingTop={4} paddingBottom={20}></Container>
                <Container py={4} shadow="2xl" borderTopRadius={20} backgroundColor="white" marginTop={-12} flex="1" maxWidth="lg" paddingTop={12}>
                    <Center>
                        <PiHandPeace size={48} />
                    </Center>
                    <Heading textAlign="center">Don't worry</Heading>
                    <Text textAlign="center">You're seeing this because we're cooking up something in the back. We're going live soon.</Text>

                    <Separator marginTop={8} />
                    <Center marginTop={12} marginBottom={2}>
                        <Image src={LokalPikol} alt="Lokal Pikol Logo" width={200} objectFit="contain" />
                    </Center>

                    <Text textAlign="center" fontSize="sm" fontStyle="italic" color="gray.500">
                        A cost effective pickleball
                        <br />
                        booking system made in Negros Oriental
                    </Text>
                </Container>
            </Box>
        </RootLayout>
    );
}

export default ErrorPage;
