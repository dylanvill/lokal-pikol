import { Box, HStack, Text, type TextProps } from '@chakra-ui/react';
import React from 'react';

interface DetailProps {
    icon: React.ReactNode;
    label: string | React.ReactNode;
    textProps?: TextProps;
    containerProps?: Omit<React.ComponentProps<typeof HStack>, 'children'>;
}

function DetailWithIcon({ icon, label, textProps = {}, containerProps = {} }: DetailProps) {
    return (
        <HStack alignItems="flex-start" justify="flex-start" gap={1} {...containerProps}>
            <Box height={4} width={4} marginTop={0.5}>
                {icon}
            </Box>
            <Text fontSize="sm" color="gray" {...textProps}>
                {label}
            </Text>
        </HStack>
    );
}

export default DetailWithIcon;
