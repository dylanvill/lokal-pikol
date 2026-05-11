import { Box, HStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import type SocialLink from '../../models/SocialLink';

interface ScheduleContactBannerProps {
    socialLinks: SocialLink[];
}

function ScheduleContactBanner({ socialLinks }: ScheduleContactBannerProps) {
    const facebookLink = socialLinks.find((link) => link.platform.toLowerCase() === 'facebook');
    const instagramLink = socialLinks.find((link) => link.platform.toLowerCase() === 'instagram');
    const hasNoLinks = !facebookLink && !instagramLink;

    return (
        <Box bg="blue.50" borderRadius="md" px={4} py={3} borderWidth={1} borderColor="blue.200">
            <Text fontSize="sm" color="blue.800" marginBottom={2}>
                This page only shows the live availability for this facility. To book a court, you can contact them via:
            </Text>
            <HStack gap={3} flexWrap="wrap">
                {facebookLink && (
                    <ChakraLink href={facebookLink.url} target="_blank" rel="noopener noreferrer" fontSize="sm" color="blue.700" display="inline-flex" alignItems="center" gap={1}>
                        <FaFacebookF />
                        Facebook
                    </ChakraLink>
                )}
                {instagramLink && (
                    <ChakraLink href={instagramLink.url} target="_blank" rel="noopener noreferrer" fontSize="sm" color="blue.700" display="inline-flex" alignItems="center" gap={1}>
                        <FaInstagram />
                        Instagram
                    </ChakraLink>
                )}
                {hasNoLinks && (
                    <Text fontSize="sm" color="blue.700">
                        Facebook
                    </Text>
                )}
            </HStack>
        </Box>
    );
}

export default ScheduleContactBanner;
