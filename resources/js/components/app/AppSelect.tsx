import { NativeSelect } from '@chakra-ui/react';
import type { NativeSelectRootProps } from '@chakra-ui/react';
import React from 'react';

export interface AppSelectProps extends NativeSelectRootProps {
    children: React.ReactElement<HTMLOptionElement> | React.ReactElement<HTMLOptionElement>[];
}

function AppSelect({ children, ...props }: AppSelectProps) {
    return (
        <NativeSelect.Root {...props}>
            <NativeSelect.Field
                borderRadius="md"
                borderColor="gray.300"
                _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182ce"
                }}
            >
                {children}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
        </NativeSelect.Root>
    );
}

export default AppSelect;
