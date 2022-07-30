import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { DbContext } from '../context/DbContext';
import AddEmployee from './AddEmployee';

export default function EmployeeTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { employees, setUpdateInfo, setDialogOpen } = useContext(DbContext)
    const [search, setSearch] = React.useState('')

    const columns = [
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'address', label: 'Address', minWidth: 100 },
        { id: 'company', label: 'Company', minWidth: 100 }
    ];

    function createData(name, email, address, company, id) {
        return { name, email, address, company, id };
    }

    const rows = search ? employees?.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase())) : employees?.map((e) => createData(e.name, e.email, e.address, e.company, e.id))

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

    const handleRowClick = (row) => {
        setUpdateInfo({ id: row.id, name: row.name, email: row.email, address: row.address, company: row.company })
    }

    return (
        <Paper sx={{ padding: '1rem' }} elevation={24}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h4' >Employees</Typography>
                <TextField
                    variant="outlined"
                    sx={{marginLeft: '1rem'}}
                    placeholder='Search for an employee'
                    size='small'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i} sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(row)}>

                                        {columns?.map((column, i) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={i} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}

                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button onClick={() => setDialogOpen(true)}>Add New Employee</Button>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            <AddEmployee />
        </Paper>
    );
}