import { Heading, Link as ChakraLink, List, Text, VStack } from '@chakra-ui/react';
import BackNavigation from '../../components/shared/BackNavigation';
import DirectoryLayout from '../../layouts/directory/DirectoryLayout';

function TermsAndConditionsPage() {
    return (
        <DirectoryLayout title="Terms and Conditions - Court Directory">
            <BackNavigation />
            <VStack align="stretch" gap={6} mt={4}>
                <Heading size="3xl">Terms and Conditions - Court Directory</Heading>

                <Text fontSize="sm" color="gray.600">
                    Last updated: March 8, 2026
                </Text>

                <Text fontSize="md">
                    These Terms and Conditions ("Terms") govern your use of and participation in the Lokal Pikol Court Directory ("Directory"), a free
                    listing service for pickleball courts in the Negros region. By completing a court listing form or browsing the directory, you
                    agree to these Terms.
                </Text>

                <Heading size="md">1. About the Directory</Heading>
                <Text fontSize="md">
                    The Lokal Pikol Court Directory is a free service that provides public listings of pickleball courts in the Negros region. The
                    directory helps players discover courts and contact them directly. This is separate from our main reservation platform and does
                    not include booking functionality.
                </Text>

                <Heading size="md">2. Court Listing Process</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>Court owners may receive a signed URL invitation via email to complete a listing form for their court.</List.Item>
                    <List.Item>These signed URLs are one-time use with expiration times for security purposes.</List.Item>
                    <List.Item>Once you complete the form, your court information becomes part of the public directory.</List.Item>
                    <List.Item>We do not create user accounts for court owners - access is only through secure, temporary signed URLs.</List.Item>
                    <List.Item>
                        All listings are managed by our administrators. You cannot directly edit or remove listings after submission, but you may
                        contact us for changes.
                    </List.Item>
                </List.Root>

                <Heading size="md">3. Public Information</Heading>
                <Text fontSize="md">
                    All information you provide through the listing form becomes publicly visible in the directory. This includes your court name,
                    address, contact information, operating hours, photos, and any social media or booking links you choose to share. Only provide
                    information you are comfortable making public.
                </Text>

                <Heading size="md">4. Your Responsibilities as a Court Owner</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>Provide accurate, complete, and up-to-date information about your court.</List.Item>
                    <List.Item>Ensure you have the right to share the information and photos you submit.</List.Item>
                    <List.Item>Respond professionally to inquiries from players who find your court through the directory.</List.Item>
                    <List.Item>Maintain your court in a safe and appropriate condition for players.</List.Item>
                    <List.Item>Comply with applicable laws regarding operating your court facility.</List.Item>
                </List.Root>

                <Heading size="md">5. Directory Users (Players)</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>The directory is provided for informational purposes to help you discover courts.</List.Item>
                    <List.Item>Contact courts directly for availability, pricing, and booking arrangements.</List.Item>
                    <List.Item>Respect court owners' policies and rules when visiting or contacting them.</List.Item>
                    <List.Item>Use the directory information responsibly and do not misuse contact details.</List.Item>
                </List.Root>

                <Heading size="md">6. No Warranties or Guarantees</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>We do not verify or guarantee the accuracy of court information provided by court owners.</List.Item>
                    <List.Item>We are not responsible for the condition, safety, or operation of any courts listed in the directory.</List.Item>
                    <List.Item>
                        We do not guarantee the availability or quality of courts, or resolve disputes between players and court owners.
                    </List.Item>
                    <List.Item>Your use of the directory and visits to listed courts are at your own risk.</List.Item>
                </List.Root>

                <Heading size="md">7. Content Guidelines</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>All submitted information must be accurate and not misleading.</List.Item>
                    <List.Item>Do not include content that is illegal, harmful, offensive, or infringes others' rights.</List.Item>
                    <List.Item>Photos must be appropriate and relevant to your court.</List.Item>
                    <List.Item>Do not include spam, excessive promotional content, or irrelevant information.</List.Item>
                </List.Root>

                <Heading size="md">8. Our Rights</Heading>
                <Text fontSize="md">
                    We reserve the right to review, modify, or remove any court listing at our discretion, including if the listing violates these
                    Terms, contains inaccurate information, or if we receive justified complaints. We may also modify or discontinue the directory
                    service at any time.
                </Text>

                <Heading size="md">9. Relationship to Main Platform</Heading>
                <Text fontSize="md">
                    This free directory service operates separately from our main Lokal Pikol reservation platform. Having a directory listing does
                    not automatically enroll you in our full reservation system. If you're interested in our complete facility management and
                    reservation platform, separate terms and registration will apply.
                </Text>

                <Heading size="md">10. No Service Fees</Heading>
                <Text fontSize="md">
                    The directory service is completely free. We do not charge for listings or take any fees from transactions between players and
                    courts. Players and courts handle all arrangements and payments directly.
                </Text>

                <Heading size="md">11. Limitation of Liability</Heading>
                <Text fontSize="md">
                    To the fullest extent permitted by law, Lokal Pikol will not be liable for any damages arising from your use of the directory,
                    interactions with courts or players you meet through the directory, or any inaccuracies in court information. Your participation
                    in the directory and visits to listed courts are at your own risk.
                </Text>

                <Heading size="md">12. Governing Law</Heading>
                <Text fontSize="md">
                    These Terms are governed by the laws of the Philippines. Any disputes will be subject to the jurisdiction of the appropriate
                    courts in the Philippines.
                </Text>

                <Heading size="md">13. Changes to These Terms</Heading>
                <Text fontSize="md">
                    We may update these Terms from time to time. When we make changes, we will update the date at the top of this page and may provide
                    notice through the directory. Your continued use of the directory after changes take effect means you accept the updated Terms.
                </Text>

                <Heading size="md">14. Contact Us</Heading>
                <Text fontSize="md">
                    If you have questions about these Terms or need to update or remove a court listing, please contact us at{' '}
                    <ChakraLink href="mailto:directory@lokalpikol.com" color="blue.600">
                        directory@lokalpikol.com
                    </ChakraLink>
                    .
                </Text>
            </VStack>
        </DirectoryLayout>
    );
}

export default TermsAndConditionsPage;
