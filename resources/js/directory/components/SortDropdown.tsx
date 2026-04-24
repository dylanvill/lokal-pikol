import { Box, Field, Flex, NativeSelect, Text } from '@chakra-ui/react';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';

function SortDropdown() {

    const {props} = usePage();
    console.log("🚀 ~ SortDropdown ~ props:", props)

    const [value, setValue] = useState('default');
    return (
        <Field.Root>
            <Flex
                flexDirection={{
                    base: 'column',
                    md: 'row',
                }}
            >
                <Field.Label marginRight={2}>
                    <Text fontSize="xs">Sort by:</Text>
                </Field.Label>
                <Box>
                    <NativeSelect.Root key="sort-dropdown" id="sort-dropdown" size="xs">
                        <NativeSelect.Field placeholder="Default" value={value} onChange={(e) => setValue(e.target.value)}>
                            <option value="default">Default</option>
                            <option value="popularity">Popularity</option>
                            <option value="newest">Date Joined (latest)</option>
                            <option value="oldest">Date Joined (earliest)</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Box>
            </Flex>
        </Field.Root>
    );
}

export default SortDropdown;
