import { Table } from '@chakra-ui/react';

const headerData = [
    { id: 'Court Name', label: 'Court Name' },
    { id: 'Date', label: 'Date' },
    { id: 'Time', label: 'Time' },
    { id: 'Status', label: 'Status' },
    { id: 'Payment Receipt', label: 'Payment Receipt' },
    { id: 'Requested At', label: 'Requested At' },
    { id: 'Approve', label: 'Approve' },
    { id: 'Actions', label: 'Actions' },
];

function Header() {
    return (
        <Table.Header>
            <Table.Row>
                {headerData.map((header) => (
                    <Table.ColumnHeader key={header.id}>{header.label}</Table.ColumnHeader>
                ))}
            </Table.Row>
        </Table.Header>
    );
}

export default Header;
