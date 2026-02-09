import { Box, Container } from '@chakra-ui/react';
import RootLayout from '@/layouts/RootLayout';
import HomeHeader from '../components/customer/HomeHeader';
import SearchBar from '../components/customer/HomeHeader/SearchBar';

interface HomePageLayoutProps {
    children: React.ReactNode;
    title?: string;
}

function HomePageLayout({ children, title }: HomePageLayoutProps) {
    return (
        <RootLayout title={title}>
            <Container gradientFrom="blue.900" gradientTo="blue.800" bgGradient="to-t" fluid paddingTop={4} paddingBottom={20}>
                <Container padding={0}>
                    <HomeHeader />

                    <Box marginTop={6}>
                        <SearchBar />
                    </Box>
                </Container>
            </Container>
            <Container py={8} shadow="2xl" borderTopRadius={20} backgroundColor="white" marginTop={-12}>
                {children}
            </Container>
        </RootLayout>
    );
}

export default HomePageLayout;
