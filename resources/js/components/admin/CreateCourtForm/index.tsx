import { Button, ButtonGroup, Steps } from '@chakra-ui/react';
import React from 'react';

import { LuFileText, LuCamera, LuClock, LuEye, LuCheck } from 'react-icons/lu';
import DetailsStepContent from './DetailsStepContent';
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
    return (
        <Steps.Root
            defaultStep={0}
            colorPalette="blue"
            backgroundColor="white"
            p={8}
            borderRadius={12}
            shadow="md"
            count={steps.length}
            size="sm"
            onStepChange={() => {}}
        >
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

            <DetailsStepContent />
            <PhotosStepContent />
            <TimeStepContent />

            <Steps.CompletedContent>
                <div style={{ padding: '2rem 0' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>All steps are complete!</h2>
                    <p>Your court has been created successfully.</p>
                </div>
            </Steps.CompletedContent>

            <ButtonGroup size="sm" variant="outline" style={{ marginTop: '2rem' }}>
                <Steps.PrevTrigger asChild>
                    <Button>Previous</Button>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                    <Button>Next</Button>
                </Steps.NextTrigger>
            </ButtonGroup>
        </Steps.Root>
    );
}

export default CreateCourtForm;
