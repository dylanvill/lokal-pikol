import { Box } from '@chakra-ui/react';
import CreateCourtForm from '../../../components/admin/CreateCourtForm';
import AppTitle from '../../../components/app/AppTitle';
import AdminLayout from '../../../layouts/admin/AdminLayout';

function CreateCourtPage() {
    return (
        <AdminLayout>
            <AppTitle>Create New Court</AppTitle>
            <Box maxWidth="2xl">
                <CreateCourtForm />
            </Box>
        </AdminLayout>
    );
}

export default CreateCourtPage;
