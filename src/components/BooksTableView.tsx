import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from '@mui/material';

const BooksTableView = ({ columns, data, error, fetching }: { columns: Array<{ key: string; label: string; align?: string }>, data: any, error: any, fetching: boolean }) => {

    return (
        <>
            <h1>Books Table</h1>
            <p>List of books will be displayed here.</p>

            {fetching && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Author</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Published Date</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.allBooks && data.allBooks.map((book: any) => (
                            <TableRow key={book.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {book.title}
                                </TableCell>
                                <TableCell align="right">{book.author}</TableCell>
                                <TableCell align="right">{book.publishedDate}</TableCell>
                                <TableCell align="right">{book.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default BooksTableView;