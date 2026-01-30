import { Field } from '@chakra-ui/react';
import type { FieldLabelProps } from '@chakra-ui/react';
import React from 'react';

export interface AppFormLabelProps extends FieldLabelProps {}

function AppFormLabel({ children, ...props }: AppFormLabelProps) {
    return (
        <Field.Label fontSize="sm" color="gray.600" marginBottom={0} {...props}>
            {children}
        </Field.Label>
    );
}

export default AppFormLabel;
