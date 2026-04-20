import { Badge, Button, Card, Float, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import invoke from '@/actions/App/Http/Directory/Controllers/TrackAdEventController';
import type Photo from '../../shared/models/Photo';

interface AdCardProps {
    id: string;
    title: string;
    description: string;
    redirectUrl: string;
    ctaLabel: string;
    photo: Photo;
}

function AdCard({ id, title, description, redirectUrl, ctaLabel, photo }: AdCardProps) {
    const onCtaClicked = () => {
        router.post(
            invoke({ ad: id }),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                except: ['listings', 'filters'],
            },
        );

        if (redirectUrl) {
            window.open(redirectUrl, '_blank');
        }
    };

    return (
        <Card.Root padding={0} borderRadius={8} borderColor="blue.300" backgroundColor="blue.50" borderWidth={2} boxShadow="0px 0px 10px 0px rgba(145,182,255,0.25)">
            <Card.Header padding={0} borderTopRadius={8}>
                <VStack justifyItems="flex-start" alignItems="flex-start">
                    <Float placement="top-start" marginTop={6} marginLeft={7}>
                        <Badge colorPalette="orange" fontSize="xs" paddingX={2} paddingY={1} borderRadius={4}>
                            Ad
                        </Badge>
                    </Float>
                    <Image src={photo.url} alt="Ad Image" aspectRatio={1} objectFit="cover" width="full" borderTopRadius={6} />
                </VStack>
            </Card.Header>
            <Card.Body paddingTop={0}>
                <Heading size="lg" color="gray.800" marginTop={4}>
                    {title}
                </Heading>
                <Text color="gray.600" fontSize="sm" whiteSpace="pre-line">
                    {description}
                </Text>
            </Card.Body>
            <Card.Footer>
                <Button
                    size="sm"
                    variant="solid"
                    marginTop={4}
                    fontSize="sm"
                    textAlign="right"
                    colorPalette="blue"
                    marginLeft="auto"
                    onClick={onCtaClicked}
                >
                    {ctaLabel}
                </Button>
            </Card.Footer>
        </Card.Root>
    );
}

export default AdCard;
