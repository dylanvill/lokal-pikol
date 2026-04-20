import { Badge, Button, Card, Float, Heading, Image, Text, VStack } from '@chakra-ui/react';

function AdCard() {
    return (
        <Card.Root padding={0} borderRadius={8} borderColor="blue.300" borderWidth={2} boxShadow="0px 0px 10px 0px rgba(145,182,255,0.25)">
            <Card.Header padding={0} borderTopRadius={8}>
                <VStack justifyItems="flex-start" alignItems="flex-start">
                    <Float placement="top-start" marginTop={4} marginLeft={6}>
                        <Badge colorPalette="orange" fontSize="xs" paddingX={2} paddingY={1} borderRadius={4}>
                            Ad
                        </Badge>
                    </Float>
                    <Image
                        src="https://images.pexels.com/photos/31228830/pexels-photo-31228830.jpeg?_gl=1*1brzw79*_ga*NzE5NjA0MTA4LjE3NjUzMjU5MTk.*_ga_8JE65Q40S6*czE3NzY2NTAwOTgkbzQ3JGcxJHQxNzc2NjUwMTIyJGozNiRsMCRoMA.."
                        alt="Cover Photo"
                        aspectRatio={1}
                        objectFit="cover"
                        width="full"
                        borderTopRadius={6}
                    />
                </VStack>
            </Card.Header>
            <Card.Body paddingTop={0}>
                <Heading size="lg" color="gray.800" marginTop={4}>
                    Company XYZ Cafe and Pastry Shop
                </Heading>
                <Text color="gray.600" fontSize="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
            </Card.Body>
            <Card.Footer>
                <Button size="sm" variant="subtle" marginTop={4} fontSize="sm" textAlign="right" colorPalette="gray" marginLeft="auto">
                    Learn More
                </Button>
            </Card.Footer>
        </Card.Root>
    );
}

export default AdCard;
