import { Alert, Link as ChakraLink } from '@chakra-ui/react';
import { GrCircleQuestion } from 'react-icons/gr';
import { LuArrowRight } from 'react-icons/lu';

function ListingCta() {
    return (
        <Alert.Root status="info">
            <Alert.Indicator>
                <GrCircleQuestion />
            </Alert.Indicator>

            <Alert.Content color="fg">
                <Alert.Title>Want to include your court in the directory?</Alert.Title>
                <Alert.Description>
                    Send us a message on our{' '}
                    <ChakraLink href="https://facebook.com/lokalpikol" target="_blank">
                        Facebook Page
                        <LuArrowRight />
                    </ChakraLink>
                </Alert.Description>
            </Alert.Content>
        </Alert.Root>
    );
}

export default ListingCta;
