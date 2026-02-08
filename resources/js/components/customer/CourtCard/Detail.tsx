import { Box, HStack, Text } from '@chakra-ui/react';

interface DetailProps {
    icon: React.ReactNode;
    label: string;
}

function Detail({ icon, label }: DetailProps) {
    return (
        <HStack alignItems="flex-start" justify="flex-start" gap={1}>
            <Box height={4} width={4} marginTop={.5}>
                {icon}
            </Box>
            <Text fontSize="sm" color="gray">
                {label}
            </Text>
        </HStack>
    );
}

export default Detail;
