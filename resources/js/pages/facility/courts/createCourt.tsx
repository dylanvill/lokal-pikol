import { Box } from '@chakra-ui/react';
import AppTitle from '../../../components/app/AppTitle';
import CreateCourtForm from '../../../components/facility/CreateCourtForm';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';

function CreateCourtPage() {
    return (
        <FacilityLayout>
            <AppTitle>Create New Court</AppTitle>
            <Box maxWidth="2xl">
                <CreateCourtForm />
            </Box>
        </FacilityLayout>
    );
}

export default CreateCourtPage;
