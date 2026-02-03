import { Button, type ButtonProps } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';

export type NextButtonProps = Omit<ButtonProps, 'children'>;

function NextButton({ ...props }: NextButtonProps) {
    return (
        <Button {...props} variant="solid" size="sm">
            Next
            <LuArrowRight />
        </Button>
    );
}

export default NextButton;
