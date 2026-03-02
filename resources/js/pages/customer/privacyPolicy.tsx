import { Heading, Link as ChakraLink, List, Text, VStack } from '@chakra-ui/react';
import BackNavigation from '../../components/shared/BackNavigation';
import DefaultPageLayout from '../../layouts/DefaultPageLayout';

function PrivacyPolicyPage() {
    return (
        <DefaultPageLayout title="Privacy Policy">
            <BackNavigation />
            <VStack align="stretch" gap={6}>
                <Heading size="3xl">Privacy Policy</Heading>

                <Text fontSize="sm" color="gray.600">
                    Last updated: March 2, 2026
                </Text>

                <Text fontSize="md">
                    Lokal Pikol ("we", "us", or "our") provides a local pickleball court booking system for players and facilities in Negros Oriental.
                    This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
                </Text>

                <Heading size="md">1. Information We Collect</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Account information
                            </Text>
                            : When you create a customer or facility account, we collect information such as your name, email address, password, and
                            any details you provide about your facility (for facility owners).
                        </Text>
                    </List.Item>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Reservation details
                            </Text>
                            : When you book or manage reservations, we store information about your bookings, including selected courts, dates and
                            times, pricing, reservation status, and related fee information.
                        </Text>
                    </List.Item>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Facility and court information
                            </Text>
                            : For facility owners, we store information you provide about your facility, courts, court pricing, schedules, and block
                            bookings.
                        </Text>
                    </List.Item>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Google account information
                            </Text>
                            : If you choose to sign up or log in using Google, we receive basic profile information from Google (such as your name and
                            email address) to create and authenticate your account. We do not receive your Google password.
                        </Text>
                    </List.Item>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Uploaded media
                            </Text>
                            : Facilities may upload images such as profile photos, cover photos, and payment QR codes. Customers may upload payment
                            receipts to support reservation confirmation.
                        </Text>
                    </List.Item>
                    <List.Item>
                        <Text>
                            <Text as="span" fontWeight="semibold">
                                Usage and technical data
                            </Text>
                            : We may collect basic technical information such as your IP address, browser type, and device information for security,
                            logging, and troubleshooting. We do not currently use this data for marketing or advertising profiling.
                        </Text>
                    </List.Item>
                </List.Root>

                <Heading size="md">2. How We Use Your Information</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>To create and manage your customer or facility account.</List.Item>
                    <List.Item>To allow you to browse facilities, view availability, and make or manage reservations.</List.Item>
                    <List.Item>To enable facilities to manage their courts, pricing, block bookings, and reservations.</List.Item>
                    <List.Item>
                        To send transactional emails and notifications about your account and reservations (for example, reservation status updates
                        and verification emails).
                    </List.Item>
                    <List.Item>To verify your identity and maintain the security of the platform.</List.Item>
                    <List.Item>
                        To maintain logs and records necessary for operating the service, resolving disputes, and meeting legal obligations.
                    </List.Item>
                </List.Root>

                <Text fontSize="sm" color="gray.700">
                    We do{' '}
                    <Text as="span" fontWeight="semibold">
                        not
                    </Text>{' '}
                    send marketing or promotional emails unless you explicitly opt in. Our primary use of your information is to operate the
                    reservation system.
                </Text>

                <Heading size="md">3. Payments and QR Codes</Heading>
                <Text fontSize="md">
                    Payments for reservations are handled directly between customers and facilities. Facilities may share payment QR codes or payment
                    details through the platform so that customers can transfer funds directly to them. Lokal Pikol does not process or store your
                    bank account or card details. When you upload a payment receipt, we store the uploaded image as part of your reservation record.
                </Text>

                <Heading size="md">4. Legal Basis and Location</Heading>
                <Text fontSize="md">
                    Lokal Pikol is designed primarily for users in Negros Oriental, Philippines. We process your personal data based on your consent
                    (for example, when you create an account or use Google login) and our legitimate interest in operating and improving a court
                    reservation service, in line with applicable laws of the Philippines.
                </Text>

                <Heading size="md">5. How We Share Your Information</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>
                        With facilities you book with, so they can manage your reservations, view your booking details, and confirm or reject your
                        reservations.
                    </List.Item>
                    <List.Item>
                        With service providers that help us operate the platform (for example, hosting, email delivery, and logging). These providers
                        are required to handle your data securely.
                    </List.Item>
                    <List.Item>
                        When required by law, regulation, or legal process, or to protect the rights, property, or safety of Lokal Pikol, our users,
                        or others.
                    </List.Item>
                </List.Root>

                <Text fontSize="md">We do not sell your personal information to third parties.</Text>

                <Heading size="md">6. Cookies and Tracking</Heading>
                <Text fontSize="md">
                    Lokal Pikol may use essential cookies or similar technologies that are necessary to provide core functionality (such as keeping
                    you logged in or maintaining your session). We do not currently use cookies for advertising or behavioral tracking.
                </Text>

                <Heading size="md">7. Data Retention</Heading>
                <Text fontSize="md">
                    We keep your personal information for as long as your account is active or as needed to provide you with the service. Reservation
                    records and related data may be retained for a reasonable period to support operations, resolve disputes, and meet legal or
                    accounting requirements. When information is no longer needed, we take steps to delete or anonymize it.
                </Text>

                <Heading size="md">8. Your Rights and Choices</Heading>
                <List.Root as="ol" gap={2} fontSize="md" marginLeft={8}>
                    <List.Item>Access and update your account information through your profile or account settings.</List.Item>
                    <List.Item>Request correction of inaccurate information.</List.Item>
                    <List.Item>
                        Request deletion of your account, subject to data we may need to keep for legal or legitimate business reasons.
                    </List.Item>
                    <List.Item>Choose whether to use Google login or email/password sign up.</List.Item>
                </List.Root>

                <Heading size="md">9. Children&apos;s Privacy</Heading>
                <Text fontSize="md">
                    Lokal Pikol is not specifically directed at children under the age of 18. If you believe we have collected personal information
                    from a minor without proper consent, please contact us so we can take appropriate action.
                </Text>

                <Heading size="md">10. Changes to This Privacy Policy</Heading>
                <Text fontSize="md">
                    We may update this Privacy Policy from time to time to reflect changes in our services or applicable laws. When we make material
                    changes, we will update the date at the top of this page and may provide additional notice (such as a notification in the app or
                    via email).
                </Text>

                <Heading size="md">11. Contact Us</Heading>
                <Text fontSize="md">
                    If you have questions or concerns about this Privacy Policy or how we handle your data, please contact us at{' '}
                    <ChakraLink href="mailto:support@lokalpikol.com" color="blue.600">
                        support@lokalpikol.com
                    </ChakraLink>
                    .
                </Text>
            </VStack>
        </DefaultPageLayout>
    );
}

export default PrivacyPolicyPage;
