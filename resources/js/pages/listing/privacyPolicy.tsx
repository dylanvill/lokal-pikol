import { Heading, Link as ChakraLink, List, Text, VStack } from '@chakra-ui/react';
import BackNavigation from '../../components/shared/BackNavigation';
import ListingLayout from '../../layouts/listing/ListingLayout';

function PrivacyPolicyPage() {
    return (
        <ListingLayout title="Privacy Policy - Court Directory">
            <BackNavigation />
            <VStack align="stretch" gap={6}>
                <Heading size="3xl">Privacy Policy - Court Directory</Heading>

                <Text fontSize="sm" color="gray.600">
                    Last updated: March 8, 2026
                </Text>

                <Text fontSize="md">
                    This Privacy Policy explains how Lokal Pikol ("we", "us", or "our") collects, uses, and protects information in our free court
                    directory service for pickleball courts in the Negros region. This directory operates separately from our main reservation
                    platform and has different data practices.
                </Text>

                <Heading size="md">1. Information We Collect</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Court listing information
                            </Text>
                            : When you complete our court listing form via the signed URL, we collect basic information about your court including
                            name, address, city, contact details, operating hours, and any links you choose to share.
                        </Text>
                    </List.Item>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Contact information for invitation
                            </Text>
                            : We may collect your email address to send you the signed URL invitation to complete your court listing.
                        </Text>
                    </List.Item>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Photos and media
                            </Text>
                            : You may choose to upload cover photos and profile photos of your court, which will be displayed publicly in the
                            directory.
                        </Text>
                    </List.Item>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Social media and booking links
                            </Text>
                            : You may provide links to your social media accounts or external booking systems, which will be displayed publicly as
                            part of your court listing.
                        </Text>
                    </List.Item>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Technical information
                            </Text>
                            : We may collect basic technical information such as IP address and browser information when you access the signed URL or
                            when visitors browse the directory, for security and operational purposes.
                        </Text>
                    </List.Item>
                </List.Root>

                <Heading size="md">2. How We Use Your Information</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>To create and display your court listing in our public directory.</List.Item>
                    <List.Item>To send you the signed URL invitation to complete your listing.</List.Item>
                    <List.Item>To help players in Negros region discover and contact your court.</List.Item>
                    <List.Item>To maintain and improve the directory service.</List.Item>
                    <List.Item>To prevent fraud and maintain security of the signed URL system.</List.Item>
                    <List.Item>To occasionally inform you about our full reservation platform (with your consent).</List.Item>
                </List.Root>

                <Text fontSize="sm" color="gray.700">
                    We do not send regular marketing emails unless you explicitly request information about our full reservation platform.
                </Text>

                <Heading size="md">3. Public Directory Nature</Heading>
                <Text fontSize="md">
                    Information you provide through the court listing form becomes part of a public directory that anyone can view without creating an
                    account. This includes your court name, address, contact details, operating hours, photos, and any social media or booking links
                    you choose to share. Only provide information you are comfortable making public.
                </Text>

                <Heading size="md">4. Signed URL System</Heading>
                <Text fontSize="md">
                    We use signed URLs with expiration times to allow you to complete your court listing form. These links are one-time use and expire
                    after a set period for security purposes. We do not create user accounts for court owners - access is only through these secure,
                    temporary links.
                </Text>

                <Heading size="md">5. How We Share Your Information</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>
                        Your court listing information is displayed publicly in our directory for anyone to view and use to contact your court
                        directly.
                    </List.Item>
                    <List.Item>
                        With service providers that help us operate the directory (such as hosting and email delivery), who are required to handle
                        data securely.
                    </List.Item>
                    <List.Item>When required by law, regulation, or legal process, or to protect our rights or the safety of others.</List.Item>
                </List.Root>

                <Text fontSize="md">We do not sell your information to third parties.</Text>

                <Heading size="md">6. Data Retention</Heading>
                <Text fontSize="md">
                    Your court listing remains in our public directory indefinitely unless you request removal. Email addresses used for sending
                    signed URLs may be retained for reasonable periods for operational and security purposes. When you request removal of your
                    listing, we will delete or anonymize the information.
                </Text>

                <Heading size="md">7. Your Rights and Choices</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>Request updates or corrections to your court listing information.</List.Item>
                    <List.Item>Request removal of your court listing from the directory.</List.Item>
                    <List.Item>Choose what information to include in your public listing.</List.Item>
                    <List.Item>Decline to participate in the directory altogether.</List.Item>
                </List.Root>

                <Heading size="md">8. Security</Heading>
                <Text fontSize="md">
                    We use signed URLs with expiration times to securely provide access to the listing form. We take reasonable measures to protect
                    the information we collect, though no internet transmission is completely secure.
                </Text>

                <Heading size="md">9. Relationship to Main Platform</Heading>
                <Text fontSize="md">
                    This directory operates separately from our main Lokal Pikol reservation platform. If you later choose to join our full
                    reservation system, different terms and privacy practices will apply, and you will need to create a separate facility account.
                </Text>

                <Heading size="md">10. Changes to This Privacy Policy</Heading>
                <Text fontSize="md">
                    We may update this Privacy Policy from time to time. When we make changes, we will update the date at the top of this page and may
                    provide notice through the directory or via email if we have your contact information.
                </Text>

                <Heading size="md">11. Contact Us</Heading>
                <Text fontSize="md">
                    If you have questions about this Privacy Policy or wish to update or remove your court listing, please contact us at{' '}
                    <ChakraLink href="mailto:directory@lokalpikol.com" color="blue.600">
                        directory@lokalpikol.com
                    </ChakraLink>
                    .
                </Text>
            </VStack>
        </ListingLayout>
    );
}

export default PrivacyPolicyPage;
