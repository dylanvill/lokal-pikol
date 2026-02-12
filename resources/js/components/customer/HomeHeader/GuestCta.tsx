import { Button, ButtonGroup, Link } from '@chakra-ui/react';

function GuestCta() {
    return (
        <ButtonGroup>
            <Link href="/login">
                <Button variant="outline" backgroundColor="white" size="xs">
                    Login
                </Button>
            </Link>
            <Link href="/sign-up">
                <Button variant="solid" size="xs">
                    Create Account
                </Button>
            </Link>
        </ButtonGroup>
    );
}

export default GuestCta;
