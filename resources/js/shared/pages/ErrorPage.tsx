import { Box, Center, Container, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Head, Link } from '@inertiajs/react';
import type { IconType } from 'react-icons';
import { LuLock, LuSearchX, LuServerCrash, LuWrench } from 'react-icons/lu';
import Logo from '../../../images/logo/lokal-pikol-horizontal-white-out.svg';

interface Props {
    status: number;
}

const content: Record<number, { icon: IconType; title: string; description: string; showHomeLink: boolean }> = {
    503: {
        icon: LuWrench,
        title: "We're doing some maintenance",
        description: "We'll be back shortly. Thanks for your patience.",
        showHomeLink: false,
    },
    500: {
        icon: LuServerCrash,
        title: 'Something went wrong',
        description: "We've hit a snag on our end. Try refreshing, or come back in a moment.",
        showHomeLink: true,
    },
    404: {
        icon: LuSearchX,
        title: 'Page not found',
        description: "We couldn't find what you were looking for.",
        showHomeLink: true,
    },
    403: {
        icon: LuLock,
        title: "You don't have access",
        description: "You don't have permission to view this page.",
        showHomeLink: true,
    },
};

export default function ErrorPage({ status }: Props) {
    const { icon: Icon, title, description, showHomeLink } = content[status] ?? content[500];

    return (
        <>
            <Head title={title} />
            <Box minH="100vh" bg="gray.50" colorPalette="blue" display="flex" flexDirection="column">
                <Container gradientFrom="blue.900" gradientTo="blue.800" bgGradient="to-t" fluid paddingTop={4} paddingBottom={20}>
                    <Container paddingY={4}>
                        <Center>
                            <Image src={Logo} alt="Lokal Pikol" objectFit="contain" maxHeight={14} />
                        </Center>
                    </Container>
                </Container>
                <Container py={12} shadow="2xl" borderTopRadius={20} backgroundColor="white" marginTop={-12} flex="1" maxWidth="lg">
                    <VStack gap={4} textAlign="center">
                        <Icon size={48} />
                        <Heading>{title}</Heading>
                        <Text color="gray.500">{description}</Text>
                        {showHomeLink && (
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <Text color="blue.500" fontSize="sm" fontWeight="medium">
                                    Back to home
                                </Text>
                            </Link>
                        )}
                    </VStack>
                </Container>
            </Box>
        </>
    );
}
