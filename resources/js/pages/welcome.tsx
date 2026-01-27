
import {
    Box,
} from '@chakra-ui/react';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <Box minH="100vh" bg="gray.50" py={{ base: 6, lg: 8 }}>
            </Box>
        </>
    );
}
