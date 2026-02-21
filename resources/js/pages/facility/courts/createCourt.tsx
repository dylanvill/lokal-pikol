import { Container } from '@chakra-ui/react';
import CreateCourtForm from '../../../components/facility/CreateCourtForm';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';

function CreateCourtPage() {
    return (
        <FacilityLayout>
            <Container maxWidth="2xl">
                <FacilityPageHeader title="Create New Court" description="Fill out the form below to add a new court to your facility." />
                <CreateCourtForm />
            </Container>
        </FacilityLayout>
    );
}

export default CreateCourtPage;
