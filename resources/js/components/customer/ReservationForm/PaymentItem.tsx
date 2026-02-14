import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { formatCurrency } from '../../../lib/utils';

export interface PaymentItemProps {
    label: string;
    amount: number;
}

function PaymentItem({ label, amount }: PaymentItemProps) {
    return (
        <HStack justify="space-between" width="full">
            <Text>{label}</Text>
            <Text>{formatCurrency(amount)}</Text>
        </HStack>
    );
}

export default PaymentItem;
