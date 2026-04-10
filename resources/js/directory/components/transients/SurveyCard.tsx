import { Card, Button, Link as ChakraLink, Center, Image, Separator } from '@chakra-ui/react';
import { LuMessageCircle, LuArrowRight } from 'react-icons/lu';
import Logo from '../../../../images/logo/lokal-pikol-horizontal-primary.svg';

function SurveyCard() {
    return (
        <Card.Root borderRadius={8} padding={0} borderColor="blue.200" bg="blue.50">
            <Card.Header>
                <Image src={Logo} alt="Lokal Pikol Logo" width={40} objectFit="contain" marginX="auto" marginBottom={4} />
                <Separator borderColor="blue.300" size="xs" marginTop={4}/>
            </Card.Header>
            <Card.Body padding={6} textAlign="center" justifyContent="center">
                <Card.Title color="blue.800" textAlign="center" marginBottom={6}>
                    <Center marginBottom={2}>
                        <LuMessageCircle size={32} />
                    </Center>
                    Help us improve!
                </Card.Title>
                <Card.Description textAlign="center" color="black" marginBottom={8}>
                    Share your thoughts about the Negros pickleball directory. Your feedback helps us make it better for everyone.
                </Card.Description>
                <Center>
                    <ChakraLink href="https://forms.gle/XFvBVwEVZi8taJFB9" target="_blank">
                        <Button size="sm" colorPalette="blue">
                            Take Survey
                            <LuArrowRight />
                        </Button>
                    </ChakraLink>
                </Center>
            </Card.Body>
        </Card.Root>
    );
}

export default SurveyCard;
