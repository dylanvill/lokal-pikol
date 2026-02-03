import { Steps } from '@chakra-ui/react';
import { LuFileText, LuCamera, LuClock, LuEye, LuCheck } from 'react-icons/lu';
import DetailsStepContent, { type DetailsFormData } from './DetailsStepContent';
import useCreateCourtForm from './hooks/useCreateCourtForm';
import PhotosStepContent from './PhotosStepContent';
import TimeStepContent from './TimeStepContent';

const steps = [
    {
        index: 0,
        icon: <LuFileText />,
        description: 'Name and Type',
    },
    {
        index: 1,
        icon: <LuCamera />,
        description: 'Photos',
    },
    {
        index: 2,
        icon: <LuClock />,
        description: 'Slots',
    },
    {
        index: 3,
        icon: <LuEye />,
        description: 'Review',
    },
];

function CreateCourtForm() {
    const { setCreateFormData } = useCreateCourtForm();

    const handleOnDetailsSubmitted = (data: DetailsFormData) => {
        setCreateFormData({
            name: data.name,
            type: data.type,
        });
    };

    const handlePhotosSubmitted = (photos: File[]) => {
        setCreateFormData({
            photos,
        });
    };

    return (
        <Steps.Root defaultStep={0} colorPalette="blue" backgroundColor="white" p={8} borderRadius={12} shadow="md" count={steps.length} size="sm">
            <Steps.List marginBottom={6}>
                {steps.map((step, index) => (
                    <Steps.Item key={index} index={index}>
                        <Steps.Indicator>
                            <Steps.Status incomplete={step.icon} complete={<LuCheck />} />
                        </Steps.Indicator>
                        <Steps.Separator />
                    </Steps.Item>
                ))}
            </Steps.List>

            <DetailsStepContent onDetailsSubmitted={handleOnDetailsSubmitted} />
            <PhotosStepContent onPhotosSubmitted={handlePhotosSubmitted} />
            <TimeStepContent />

            <Steps.CompletedContent>
                <div style={{ padding: '2rem 0' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>All steps are complete!</h2>
                    <p>Your court has been created successfully.</p>
                </div>
            </Steps.CompletedContent>
        </Steps.Root>
    );
}

export default CreateCourtForm;
