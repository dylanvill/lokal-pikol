import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';

function EndOfListingCta() {
    return (
        <Box marginTop={16}>
            <Heading size="lg" marginBottom={4} textAlign="center">
                That's all the courts we have for now
            </Heading>
            <Text textAlign="center">
                Want to be part of the Negros Oriental Pickleball court directory?{' '}
                <ChakraLink href="https://www.facebook.com/lokalpikol" color="blue.500" target="_blank">
                    Send us a message on Facebook.
                </ChakraLink>
            </Text>
            <Text textAlign="center" fontSize="sm">
                This is a community effort, your contribution will be highly appreciated!
            </Text>
        </Box>
    );
}

export default EndOfListingCta;
