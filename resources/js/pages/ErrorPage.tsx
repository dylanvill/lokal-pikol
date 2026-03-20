import { Heading, Text, Container, Box, Center} from '@chakra-ui/react';
import { PiHandPeace } from 'react-icons/pi';
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
                    <Heading textAlign="center">{title}</Heading>
                    <Text textAlign="center">{description}</Text>
                </Container>
            </Box>
        </RootLayout>
    );
}

export default ErrorPage;
