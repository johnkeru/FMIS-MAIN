import {
    Box,
    Button,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { FaUserPen } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import SignatoryTableMenu from '../../components/signatory/SignatoryTableMenu';
import api from '../../config/api';
import { useSearch } from '../../context/SearchContext';
import DashboardHeader from '../../global/components/DashboardHeader';
import TableLoading from '../../global/components/TableLoading';
import TableSearchBar from '../../global/components/TableSearchBar';
import TextSearchable from '../../global/components/TextSearchable';

export default function SignatoriesTable() {
    const { searchValue, } = useSearch()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['signatories', page],
        queryFn: async () => {
            const res = await api.get(`get-signatories?search=${searchValue}&page=${page}&limit=${rowsPerPage}`);
            return res.data;
        },
    });

    React.useEffect(() => {
        const debouncedSearch = setTimeout(() => {
            refetch()
        }, 500);
        return () => clearTimeout(debouncedSearch);
    }, [searchValue]);

    React.useEffect(() => {
        refetch()
    }, [rowsPerPage, page]);

    if (isLoading) return <TableLoading />;
    return <TablePlain data={data} page={page} setPage={setPage} refetch={refetch} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
}

const TablePlain = ({ data, page, setPage, rowsPerPage, setRowsPerPage }) => {
    const nav = useNavigate();

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('payee');

    // Sorting handler
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Pagination handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page when rows per page changes
    };

    // Sorting logic
    const isEmpty = data.signatories.length === 0;
    const sortedData = React.useMemo(() => {
        if (isEmpty) return [];
        return data.signatories.sort((a, b) => {
            if (orderBy === 'payee') {
                return order === 'asc' ? a.payee.localeCompare(b.payee) : b.payee.localeCompare(a.payee);
            } else if (orderBy === 'transactionType') {
                return order === 'asc'
                    ? a.transactionType.localeCompare(b.transactionType)
                    : b.transactionType.localeCompare(a.transactionType);
            }
            return 0;
        });
    }, [data, order, orderBy]);

    return (
        <>
            <DashboardHeader title="Signatories Management" description="Manage Signatories" />

            <Box p={2}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Box display="flex" gap={2} ml="auto">
                        <TableSearchBar />
                        <Button
                            size="large"
                            startIcon={<FaUserPen />}
                            variant="contained"
                            color="info"
                            onClick={() => nav('/signatories/create')}
                            sx={{ mr: 1 }}
                        >
                            Add Signatory
                        </Button>
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: 'secondary.main' }}>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'payee'}
                                        direction={orderBy === 'payee' ? order : 'asc'}
                                        onClick={() => handleRequestSort('payee')}
                                    >
                                        Payee
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'transactionType'}
                                        direction={orderBy === 'transactionType' ? order : 'asc'}
                                        onClick={() => handleRequestSort('transactionType')}
                                    >
                                        Transaction Type
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>{isEmpty ? 'BOX A' : sortedData[0].boxA.boxName}</TableCell>
                                <TableCell>{isEmpty ? 'BOX C' : sortedData[0].boxC.boxName}</TableCell>
                                <TableCell>{isEmpty ? 'BOX D' : sortedData[0].boxD.boxName}</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isEmpty ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body1" color="textSecondary">
                                            No entries found. Try a different search.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sortedData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((signatory) => (
                                        <TableRow
                                            key={signatory._id}
                                            sx={{
                                                '&:nth-of-type(even)': { bgcolor: 'grey.200' },
                                                ':hover': { bgcolor: 'grey.300' },
                                            }}
                                        >
                                            <TableCell>
                                                <TextSearchable columnName={signatory.payee} />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    maxWidth: 300,
                                                }}
                                                title={signatory.transactionType}
                                            >
                                                <TextSearchable columnName={signatory.transactionType} />
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                                        {signatory.boxA.positionTitle}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {signatory.boxA.fullName}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                                        {signatory.boxC.positionTitle}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {signatory.boxC.fullName}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                                        {signatory.boxD.positionTitle}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {signatory.boxD.fullName}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <SignatoryTableMenu signatory={signatory} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>

                    <TablePagination
                        component="div"
                        count={isEmpty ? 0 : data.total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={isEmpty ? [] : [5, 10, 25]}
                        disabled={isEmpty}
                    />
                </TableContainer>
            </Box>
        </>
    );
};
