import { Box } from '@chakra-ui/react';
import AppTitle from '../../../components/app/AppTitle';
import CreateCourtForm from '../../../components/facility/CreateCourtForm';
import ClientLayout from '../../../layouts/facility/FacilityLayout';

function CreateCourtPage() {
    return (
        <ClientLayout>
            <AppTitle>Create New Court</AppTitle>
            <Box maxWidth="2xl">
                <CreateCourtForm />
            </Box>
        </ClientLayout>
    );
}

export default CreateCourtPage;
