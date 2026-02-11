import { Box, Container, type ContainerProps } from '@chakra-ui/react';
import HomeHeader from '../components/customer/HomeHeader';
import RootLayout from './RootLayout';

interface DefaultPageLayoutProps {
    children: React.ReactNode;
    title?: string;
    contentContainerProps?: ContainerProps;
}

function DefaultPageLayout({ children, title, contentContainerProps = {} }: DefaultPageLayoutProps) {
    return (
        <RootLayout title={title}>
            <Box display="flex" flexDirection="column" minH="100vh">
                <Container gradientFrom="blue.900" gradientTo="blue.800" bgGradient="to-t" fluid paddingTop={4} paddingBottom={20}>
                    <Container padding={0}>
                        <HomeHeader />
                    </Container>
                </Container>
                <Container py={4} shadow="2xl" borderTopRadius={20} backgroundColor="white" marginTop={-12} flex="1" {...contentContainerProps}>
                    {children}
                </Container>
            </Box>
        </RootLayout>
    );
}

export default DefaultPageLayout;
