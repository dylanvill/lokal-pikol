import { Button, type ButtonProps } from '@chakra-ui/react';
import { LuArrowLeft } from 'react-icons/lu';

export type PreviousButtonProps = Omit<ButtonProps, 'children'>;

function PreviousButton({ ...props }: PreviousButtonProps) {
    return (
        <Button {...props}>
            <LuArrowLeft />
            Previous
        </Button>
    );
}

export default PreviousButton;
