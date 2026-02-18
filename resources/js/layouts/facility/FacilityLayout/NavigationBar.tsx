import { Box, Flex, Text, IconButton, Image } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import { LuLogOut } from 'react-icons/lu';
import Logo from '../../../../images/logo/lokal-pikol-horizontal-white-out.svg';

export const NavigationBar = () => {
    return (
        <Box bg="blue.800" p={4} position="fixed" top={0} left={0} right={0} zIndex={1000} height="60px">
            <Flex h="100%" alignItems="center" justifyContent="space-between">
                <Box>
                    <Image src={Logo} alt="Lokal Pikol" height="30px" />
                </Box>
                <Flex alignItems="center" gap={4}>
                    <Form method="post" action="/facility/auth/logout">
                        <IconButton type="submit" size="sm" backgroundColor="blue.600">
                            <LuLogOut color="white" />
                        </IconButton>
                    </Form>
                </Flex>
            </Flex>
        </Box>
    );
};

export default NavigationBar;
