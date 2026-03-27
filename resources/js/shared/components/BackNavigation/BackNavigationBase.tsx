import { Box, HStack, Text } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { type MouseEvent } from 'react';
import { LuArrowLeft } from 'react-icons/lu';

export interface BackNavigationBaseProps {
    href?: string;
    onClick?: (e: MouseEvent<Element, globalThis.MouseEvent>) => void;
    label?: string;
}

function BackNavigationBase({ href, onClick, label = 'Back' }: BackNavigationBaseProps) {
    return (
        <Box marginBottom={6}>
            <Link
                href={href || '#'}
                {...(onClick && {
                    onClick: (e) => {
                        e.preventDefault();
                        onClick(e);
                    },
                })}
            >
                <HStack gap={1}>
                    <LuArrowLeft size={16} />
                    <Text fontSize="sm">{label}</Text>
                </HStack>
            </Link>
        </Box>
    );
}

export default BackNavigationBase;
