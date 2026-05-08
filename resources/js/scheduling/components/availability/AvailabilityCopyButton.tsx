import { Button } from '@chakra-ui/react';
import { LuCheck, LuCopy } from 'react-icons/lu';
import useCopyToClipboard from '../../pages/availability/hooks/useCopyToClipboard';

interface AvailabilityCopyButtonProps {
    text: string;
    label?: string;
    copiedLabel?: string;
    size?: 'xs' | 'sm' | 'md';
    variant?: 'solid' | 'outline' | 'ghost';
}

function AvailabilityCopyButton({
    text,
    label = 'Copy',
    copiedLabel = 'Copied!',
    size = 'sm',
    variant = 'outline',
}: AvailabilityCopyButtonProps) {
    const { copied, copy } = useCopyToClipboard();

    return (
        <Button size={size} variant={variant} colorPalette={copied ? 'green' : 'blue'} onClick={() => copy(text)}>
            {copied ? <LuCheck /> : <LuCopy />}
            {copied ? copiedLabel : label}
        </Button>
    );
}

export default AvailabilityCopyButton;
