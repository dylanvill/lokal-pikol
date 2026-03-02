import { Heading, Link as ChakraLink, List, Text, VStack } from '@chakra-ui/react';
import BackNavigation from '../../components/shared/BackNavigation';
import DefaultPageLayout from '../../layouts/DefaultPageLayout';

function TermsAndConditionsPage() {
    return (
        <DefaultPageLayout title="Terms and Conditions">
            <BackNavigation />
            <VStack align="stretch" gap={6} mt={4}>
                <Heading size="3xl">Terms and Conditions</Heading>

                <Text fontSize="sm" color="gray.600">
                    Last updated: {new Date().getFullYear()}
                </Text>

                <Text fontSize="md">
                    These Terms and Conditions ("Terms") govern your use of Lokal Pikol ("Lokal Pikol", "we", "us",
                    or "our"), a local pickleball court reservation system designed for players and facilities in Negros
                    Oriental. By creating an account or using our website and services, you agree to be bound by these
                    Terms.
                </Text>

                <Heading size="md">1. Our Role</Heading>
                <Text fontSize="md">
                    Lokal Pikol provides an online platform that connects players (customers) with pickleball facilities
                    and courts. We facilitate browsing, reservation requests, scheduling, and communication between
                    customers and facilities. Lokal Pikol does not own or operate the facilities listed on the platform
                    and is not a party to the payment transactions between customers and facilities.
                </Text>

                <Heading size="md">2. Accounts and Eligibility</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>
                        You must create an account to make reservations as a customer or to manage courts and
                        reservations as a facility.
                    </List.Item>
                    <List.Item>
                        You are responsible for providing accurate, complete information and for keeping your login
                        credentials secure.
                    </List.Item>
                    <List.Item>
                        You must be legally capable of entering into agreements under the laws of the Philippines to
                        use the platform.
                    </List.Item>
                    <List.Item>
                        If you sign up using Google, you authorize Lokal Pikol to use your Google account information
                        (such as your name and email address) to create and manage your account. We do not receive your
                        Google password.
                    </List.Item>
                </List.Root>

                <Heading size="md">3. Reservations and Booking Process</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>
                        Court availability is shown based on facility schedules, pricing, existing reservations, and
                        block bookings (such as open plays or events).
                    </List.Item>
                    <List.Item>
                        When you select court slots and initiate a reservation, the slots may be placed "on hold" for
                        a short period so other users cannot book them at the same time.
                    </List.Item>
                    <List.Item>
                        If you do not complete the required steps (such as payment or confirmation) within the hold
                        period, your reservation request may automatically expire and the slots will be released.
                    </List.Item>
                    <List.Item>
                        Most reservations require facility approval. A reservation is only considered confirmed once
                        the facility has approved it and, where applicable, acknowledged your payment.
                    </List.Item>
                    <List.Item>
                        Facilities may use recurring block bookings to reserve time for events, open plays, or
                        maintenance. These blocks will make certain slots unavailable for regular reservations.
                    </List.Item>
                </List.Root>

                <Heading size="md">4. Payments</Heading>
                <Text fontSize="md">
                    Payment arrangements are primarily between customers and facilities. Facilities may share payment
                    QR codes or payment details within the platform so that customers can pay them directly. Lokal
                    Pikol does not process or store your bank account or card details. When you upload a payment
                    receipt to support a reservation, we store that receipt as part of your reservation record.
                </Text>

                <Heading size="md">5. Cancellations, Changes, and No-Shows</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>
                        Each facility may set its own rules regarding cancellations, rebooking, refunds, and
                        no-shows. These rules may be communicated through the platform or directly by the facility.
                    </List.Item>
                    <List.Item>
                        It is your responsibility to review and understand any cancellation or refund policies that a
                        facility applies to your reservation.
                    </List.Item>
                    <List.Item>
                        Lokal Pikol is not responsible for any refunds or disputes between customers and facilities
                        relating to cancellations, changes, or no-shows.
                    </List.Item>
                </List.Root>

                <Heading size="md">6. Your Responsibilities as a Customer</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>Provide accurate reservation details and contact information.</List.Item>
                    <List.Item>Arrive on time for your reservation and respect facility rules and staff.</List.Item>
                    <List.Item>Use the courts and equipment responsibly and safely.</List.Item>
                    <List.Item>Comply with any facility-specific policies, including dress code, conduct, and payment rules.</List.Item>
                </List.Root>

                <Heading size="md">7. Responsibilities of Facilities</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>Provide accurate and up-to-date information about their facility, courts, pricing, and availability.</List.Item>
                    <List.Item>Manage reservations fairly and in good faith, including approvals, rejections, and changes.</List.Item>
                    <List.Item>Communicate any important rules, restrictions, or changes that may affect customer bookings.</List.Item>
                    <List.Item>Comply with applicable laws and regulations related to operating their facility and handling payments.</List.Item>
                </List.Root>

                <Heading size="md">8. Acceptable Use</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>Do not use Lokal Pikol for any unlawful purpose or to violate any applicable laws or regulations.</List.Item>
                    <List.Item>Do not attempt to interfere with or disrupt the platform, its security, or its infrastructure.</List.Item>
                    <List.Item>Do not misuse reservations (for example, repeatedly booking and not showing up, or abusing the hold system).</List.Item>
                    <List.Item>Do not upload content that is illegal, harmful, or infringes the rights of others.</List.Item>
                </List.Root>

                <Heading size="md">9. Service Availability and Changes</Heading>
                <Text fontSize="md">
                    We aim to keep Lokal Pikol available and functioning smoothly, but we cannot guarantee that the
                    platform will be free from interruptions, errors, or downtime. We may modify, suspend, or
                    discontinue parts of the service (such as features, layouts, or integrations) at any time to
                    improve the platform or address technical or security issues.
                </Text>

                <Heading size="md">10. Disclaimer and Limitation of Liability</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>
                        The information shown on Lokal Pikol (including facility details, availability, and pricing) is
                        provided by facilities. While we encourage accuracy, we do not guarantee that all information
                        is always complete, accurate, or up to date.
                    </List.Item>
                    <List.Item>
                        Your use of the platform and participation in activities at facilities are at your own risk. It
                        is your responsibility to ensure you are physically able and properly equipped to play
                        pickleball or participate in related activities.
                    </List.Item>
                    <List.Item>
                        To the fullest extent permitted by law, Lokal Pikol will not be liable for any indirect,
                        incidental, special, or consequential damages arising out of or in connection with your use of
                        the platform or your interactions with facilities or other users.
                    </List.Item>
                </List.Root>

                <Heading size="md">11. Changes to These Terms</Heading>
                <Text fontSize="md">
                    We may update these Terms from time to time to reflect changes in our services or legal
                    requirements. When we make material changes, we will update the date at the top of this page and
                    may provide additional notice (such as a notification in the app or via email). Your continued use
                    of Lokal Pikol after changes take effect means you accept the updated Terms.
                </Text>

                <Heading size="md">12. Governing Law</Heading>
                <Text fontSize="md">
                    These Terms are governed by the laws of the Philippines. Any disputes arising out of or relating to
                    your use of Lokal Pikol will be subject to the jurisdiction of the appropriate courts in the
                    Philippines.
                </Text>

                <Heading size="md">13. Contact Us</Heading>
                <Text fontSize="md">
                    If you have questions about these Terms, please contact us at{' '}
                    <ChakraLink href="mailto:support@lokalpikol.com" color="blue.600">
                        support@lokalpikol.com
                    </ChakraLink>
                    .
                </Text>
            </VStack>
        </DefaultPageLayout>
    );
}

export default TermsAndConditionsPage;
