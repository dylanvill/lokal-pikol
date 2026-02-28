import { Box, Container, VStack } from '@chakra-ui/react';
import FacilityInformationForm from '../../components/facility/AccountForms/FacilityInformationForm';
import MediaForm from '../../components/facility/AccountForms/MediaForm';
import PaymentQrForm from '../../components/facility/AccountForms/PaymentQrForm';
import FacilityPageHeader from '../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../layouts/facility/FacilityLayout';

function AccountPage() {
    return (
        <FacilityLayout>
            <FacilityPageHeader
                title="Facility Information"
                description="Manage your facility information, including name, address, contact details, and other relevant information. Keeping this information up-to-date ensures that your customers have accurate details about your facility."
            />
            <Container justifyContent="center" alignItems="center" display="flex">
                <Box maxWidth="2xl">
                    <VStack alignItems="stretch" gap={8}>
                        <MediaForm currentCoverPhotoUrl="https://picsum.photos/720/1280" currentProfilePhotoUrl="https://picsum.photos/600/600" />
                        <FacilityInformationForm />
                        <PaymentQrForm />
                    </VStack>
                </Box>
            </Container>
        </FacilityLayout>
    );
}

export default AccountPage;
