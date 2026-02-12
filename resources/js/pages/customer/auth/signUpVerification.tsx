import { Alert, Box, Button, Container, Heading, Icon, Text } from '@chakra-ui/react';
import { router } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import { LuArrowLeft, LuMail, LuRefreshCcw } from 'react-icons/lu';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';
import typographyTokens from '../../../lib/tokens/typography';

function SignUpVerificationPage() {
    const { post, processing } = useForm();
    const { flash } = usePage();

    const handleOnResendEmailClicked = () => {
        post('/sign-up/notice/send');
    };

    const handleHomeClicked = () => {
        router.visit('/');
    };

    return (
        <DefaultPageLayout
            title="Create an account"
            contentContainerProps={{
                maxW: 'xl',
            }}
        >
            <Container px={4} py={8}>
                {flash && flash.success === true ? (
                    <Box>
                        <Alert.Root status="success" title="Verification email has been resent successfully">
                            <Alert.Indicator />
                            <Alert.Content>
                                <Alert.Title>Verification email has been resent successfully</Alert.Title>
                                <Alert.Description>Please check your inbox for the verification email.</Alert.Description>
                            </Alert.Content>
                        </Alert.Root>
                        <Button type="button" variant="ghost" marginTop={4} onClick={handleHomeClicked}>
                            <LuArrowLeft />
                            Home
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        <Icon marginBottom={4}>
                            <LuMail size={48} />
                        </Icon>
                        <Heading textAlign="left">Almost there!</Heading>
                        <Text textAlign="left">
                            We have sent a verification link to your email. Please check your inbox and click the link to verify your account.
                        </Text>
                        <Box marginTop={4}>
                            <Text fontSize={typographyTokens.small.fontSize.sm} color={typographyTokens.small.colors.gray[500]}>
                                Didn't receive the email? Check your spam folder or resend the verification email.
                            </Text>
                            <Button
                                size="xs"
                                type="button"
                                marginTop={1}
                                onClick={handleOnResendEmailClicked}
                                loading={processing}
                                disabled={processing}
                            >
                                <LuRefreshCcw /> Resend Email
                            </Button>
                        </Box>
                    </Box>
                )}
            </Container>
        </DefaultPageLayout>
    );
}

export default SignUpVerificationPage;
