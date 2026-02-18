import { Box, HStack, Text } from '@chakra-ui/react';
import { Link, router } from '@inertiajs/react';
import React from 'react';
import { LuArrowLeft } from 'react-icons/lu';

function BackNavigation() {
    return (
        <Box marginBottom={8}>
            <Link
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    router.visit(window.history.back()!);
                }}
            >
                <HStack gap={1}>
                    <LuArrowLeft size={16} />
                    <Text fontSize="sm">Back</Text>
                </HStack>
            </Link>
        </Box>
    );
}

export default BackNavigation;
