import React from 'react';
import CreateCourtForm from '../../../components/admin/CreateCourtForm';
import AppTitle from '../../../components/app/AppTitle';
import AdminLayout from '../../../layouts/admin/AdminLayout';
import { Box } from '@chakra-ui/react';

function CreateCourtPage() {
    return (
        <AdminLayout>
            <AppTitle>Create New Court</AppTitle>
            <Box maxWidth="xl">
                <CreateCourtForm />
            </Box>
        </AdminLayout>
    );
}

export default CreateCourtPage;
