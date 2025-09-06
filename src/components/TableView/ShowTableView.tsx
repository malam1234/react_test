import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const ShowTableView = ({ data, columns, error, fetching }: { data: any, columns: Array<{ key: string; label: string }>, error: any, fetching: boolean }) => {

    const alignColumns = (index: number) => {
        if (index === columns.length - 1)
            return "right";
        return index === 0 ? "left" : "center";
    }

    return (
        <>
            {fetching && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col, index) => (<TableCell align={alignColumns(index)} sx={{ fontWeight: 'bold' }}>{col.label}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((book: any) => (
                            <TableRow key={book.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {columns.map((col, index) => (<TableCell align={alignColumns(index)}>{book[col.key]}</TableCell>))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ShowTableView;