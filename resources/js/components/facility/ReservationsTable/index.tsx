import { Box, Table } from '@chakra-ui/react';
import Footer from './Footer';
import Header from './Header';
import Row from './Row';

function ReservationsTable() {
    return (
        <Box width="full" overflowX="auto">
            <Table.Root size="sm" variant="outline" striped>
                <Header />
                {/* <Table.Body>
                    {currentReservations.map((reservation) => (
                        <Row />
                    ))}
                </Table.Body> */}
                <Footer />
            </Table.Root>
        </Box>
    );
}

export default ReservationsTable;
