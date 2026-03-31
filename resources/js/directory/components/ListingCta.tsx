import { Alert, Center, Link as ChakraLink } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';

function ListingCta() {
    return (
        <ChakraLink href="https://facebook.com/lokalpikol" target="_blank" width="full">
            <Alert.Root status="info">
                <Alert.Content color="fg">
                    <Alert.Title fontWeight="bold">Want to include your court in the directory?</Alert.Title>
                    <Alert.Description>
                        Send us a message on our <span style={{ color: 'blue' }}>Facebook page</span> to get started. It's free and only takes a few
                        minutes.
                    </Alert.Description>
                </Alert.Content>
                <Center height="auto" flexShrink={0}>
                    <LuArrowRight />
                </Center>
            </Alert.Root>
        </ChakraLink>
    );
}

export default ListingCta;
