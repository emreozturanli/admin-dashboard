import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, InputAdornment, TableHead, TextField, Typography } from '@mui/material';
import { DbContext } from '../context/DbContext';
import SearchIcon from '@mui/icons-material/Search';
import AddEmployee from './AddEmployee';
import TableSortLabel from '@mui/material/TableSortLabel';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
export default function EmployeeTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { employees, setUpdateInfo, setDialogOpen,setEditEmployeeOpen } = React.useContext(DbContext)
  const [search, setSearch] = React.useState('')

  /*SORT PART */

  const [orderDirection, setOrderDirection] = React.useState('asc')
  const [valueToOrderBy, setValueToOrderBy] = React.useState('name')

  const handleRequestSort = (event, property) => {
    const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? 'desc' : 'asc')
  }

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property)
  }

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index])
    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order;
      return a[1] - b[1]
    })
    return stabilizedRowArray.map((el) => el[0])
  }

  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 100 },
    { id: 'company', label: 'Company', minWidth: 100 }
  ];

  function createData(name, email, address, company, id) {
    return { name, email, address, company, id };
  }

  const rowInfo = employees?.map((e) => createData(e.name, e.email, e.address, e.company, e.id))
  const searchedRowInfo = employees?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

  const rows = search ? sortedRowInformation(searchedRowInfo, getComparator(orderDirection, valueToOrderBy)) : sortedRowInformation(rowInfo, getComparator(orderDirection, valueToOrderBy))

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
    setEditEmployeeOpen(true)
  }

  return (
    <div style={{ padding:'0 2rem'}}>
    <Paper sx={{ maxWidth: '1200px', margin:'auto', padding: '2rem' }} elevation={24}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'center' },
          flexDirection: { md: 'row', xs: 'column' }
        }}
        component='section'
      >
        <Typography variant='h4' >Employees</Typography>
        <TextField
          variant="outlined"
          sx={{ marginLeft: '1rem' }}
          placeholder='Search for an employee'
          size='small'
          value={search}
          onChange={(e) => {setSearch(e.target.value); setPage(0)}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={valueToOrderBy === column.id}
                    direction={valueToOrderBy === column.id ? orderDirection : 'asc'}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>

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
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: { md: 'row', xs: 'column' }
      }} >
        <Button onClick={() => setDialogOpen(true)} sx={{ order: {xs : 2, md : 0}}}>Add New Employee</Button>

        <TablePagination
          sx={{marginBottom:{ xs: '2rem' }}}
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Box>
      <AddEmployee />
    </Paper>
    </div>
  );
}
