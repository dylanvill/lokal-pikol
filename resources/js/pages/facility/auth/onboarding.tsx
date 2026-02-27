import { Box, Container, Heading, Text } from '@chakra-ui/react';
import OnboardingForm from '../../../components/facility/OnboardingForm';
import RootLayout from '../../../layouts/RootLayout';

function OnboardingPage() {
    return (
        <RootLayout title="Facility Onboarding">
            <Box display="flex" flexDirection="column" minH="100vh">
                <Container gradientFrom="blue.900" gradientTo="blue.800" bgGradient="to-t" fluid paddingTop={4} paddingBottom={20}></Container>
                <Container py={4} shadow="2xl" borderTopRadius={20} backgroundColor="white" marginTop={-12} flex="1" width="full" maxWidth="2xl" paddingBottom={16}>
                    <Heading>Facility profile setup</Heading>
                    <Text marginBottom={8}>
                        Hi John Doe, welcome to the facility onboarding process. Once you complete this step, you will be able to login to your
                        facility account and start managing your courts and reservations.
                    </Text>
                    <OnboardingForm />
                </Container>
            </Box>
        </RootLayout>
    );
}

export default OnboardingPage;
