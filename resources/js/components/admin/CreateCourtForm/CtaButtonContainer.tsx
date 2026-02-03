import { Flex } from '@chakra-ui/react';
import React from 'react';

export interface CtaButtonsProps {
    renderPrevious?: React.ReactNode;
    renderNext: React.ReactNode;
}

function CtaButtonContainer({ renderPrevious = null, renderNext = null }: CtaButtonsProps) {
    const hasPrevious = Boolean(renderPrevious);

    return (
        <Flex alignItems="flex-end" justifyContent={hasPrevious ? 'space-between' : 'flex-end'} marginTop={12}>
            {hasPrevious && renderPrevious}
            {renderNext}
        </Flex>
    );
}

export default CtaButtonContainer;
