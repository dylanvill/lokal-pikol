import { Button, useStepsContext, type ButtonProps } from '@chakra-ui/react';
import { LuArrowLeft } from 'react-icons/lu';

export type PreviousButtonProps = Omit<ButtonProps, 'children'>;

function PreviousButton({ ...props }: PreviousButtonProps) {
    const { goToPrevStep } = useStepsContext();

    return (
        <Button {...props} variant="outline" size="sm" onClick={goToPrevStep}>
            <LuArrowLeft />
            Previous
        </Button>
    );
}

export default PreviousButton;
