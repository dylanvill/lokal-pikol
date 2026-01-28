import { Box, Input, Field, NativeSelect, VStack, HStack } from '@chakra-ui/react';

function SearchBar() {

    return (
        <Box bg="white" borderRadius={16} borderColor="gray.200" p={{ base: 4, md: 4 }} shadow="sm">
            <VStack gap={4}>
                <Field.Root>
                    <Field.Label fontSize="sm" color="gray.600" marginBottom={0}>
                        City
                    </Field.Label>
                    <NativeSelect.Root>
                        <NativeSelect.Field>
                            <option value="1">Dumaguete</option>
                            <option value="2">Valencia</option>
                            <option value="3">Bacong</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>
                <Field.Root>
                    <Field.Label fontSize="sm" color="gray.600" marginBottom={0}>
                        Date
                    </Field.Label>
                    <Input type="date" />
                </Field.Root>
                <HStack gap={4} w="full">
                    <Field.Root gap={0}>
                        <Field.Label fontSize="sm" color="gray.600" marginBottom={0}>
                            Start Time
                        </Field.Label>
                        <Input type="time" marginTop={0} paddingTop={0} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label fontSize="sm" color="gray.600" marginBottom={0}>
                            End Time
                        </Field.Label>
                        <Input type="time" />
                    </Field.Root>
                </HStack>
            </VStack>
        </Box>
    );
}

export default SearchBar;
