import { Box } from '@chakra-ui/react';
import AppTitle from '../../../components/app/AppTitle';
import CreateCourtForm from '../../../components/client/CreateCourtForm';
import ClientLayout from '../../../layouts/client/ClientLayout';

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
