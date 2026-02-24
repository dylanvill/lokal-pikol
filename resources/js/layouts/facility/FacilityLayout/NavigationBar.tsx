import { Box, Flex, Image } from '@chakra-ui/react';
import Logo from '../../../../images/logo/lokal-pikol-horizontal-white-out.svg';

export const NavigationBar = () => {

    return (
        <Box bg="blue.800" p={4} position="fixed" top={0} left={0} right={0} zIndex={1000} height="60px">
            <Flex h="100%" alignItems="center" justifyContent="space-between">
                <Image src={Logo} alt="Lokal Pikol" height="30px" />
            </Flex>
        </Box>
    );
};

export default NavigationBar;
