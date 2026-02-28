import { Box, Container, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import FacilityInformationForm from '../../components/facility/AccountForms/FacilityInformationForm';
import MediaForm from '../../components/facility/AccountForms/MediaForm';
import PaymentQrForm from '../../components/facility/AccountForms/PaymentQrForm';
import FacilityPageHeader from '../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../layouts/facility/FacilityLayout';
import type FacilityAccount from '../../models/facility/account/FacilityAccount';

interface AccountPageProps extends PageProps {
    account: FacilityAccount;
}

function AccountPage({ account }: AccountPageProps) {
    return (
        <FacilityLayout>
            <FacilityPageHeader
                title="Facility Information"
                description="Manage your facility information, including name, address, contact details, and other relevant information. Keeping this information up-to-date ensures that your customers have accurate details about your facility."
            />
            <Container justifyContent="center" alignItems="center" display="flex">
                <Box maxWidth="2xl">
                    <VStack alignItems="stretch" gap={8}>
                        <MediaForm currentCoverPhotoUrl={account.coverPhoto.url} currentProfilePhotoUrl={account.profilePhoto.url} />
                        <FacilityInformationForm
                            name={account.name}
                            city={account.city}
                            address={account.address}
                            email={account.email}
                            phone={account.phone}
                            description={account.description || ''}
                            openingTime={account.openingTime}
                            closingTime={account.closingTime}
                            googleMapsUrl={account.googleMapsUrl || ''}
                        />
                        <PaymentQrForm currentPaymentQrCodeUrl={account.paymentQrCode.url} />
                    </VStack>
                </Box>
            </Container>
        </FacilityLayout>
    );
}

export default AccountPage;
