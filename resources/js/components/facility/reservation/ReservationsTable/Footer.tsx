import { Flex, HStack, IconButton, Table, Text } from '@chakra-ui/react';
import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

function Footer() {
    return (
        <Table.Footer>
            <Table.Row>
                <Table.Cell colSpan={10}>
                    <Flex align="center" justify="space-between" py={2}>
                        <Text fontSize="sm" color="gray.600">
                            Showing 1 of 10 reservations
                        </Text>
                        <HStack gap={2}>
                            <IconButton size="sm" variant="outline" aria-label="Previous page">
                                <LuChevronLeft className="w-4 h-4" />
                            </IconButton>
                            <Text fontSize="sm" px={2}>
                                Page 1 of 10
                            </Text>
                            <IconButton size="sm" variant="outline" aria-label="Next page">
                                <LuChevronRight className="w-4 h-4" />
                            </IconButton>
                        </HStack>
                    </Flex>
                </Table.Cell>
            </Table.Row>
        </Table.Footer>
    );
}

export default Footer;
