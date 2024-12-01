import {
    Box,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import AddSignatoryModal from '../../components/signatory/AddSignatoryModal';
import SignatoryTableMenu from '../../components/signatory/SignatoryTableMenu';
import api from '../../config/api';
import TableLoading from '../../global/components/TableLoading'
import DashboardHeader from '../../global/components/DashboardHeader';
import TextSearchable from '../../global/components/TextSearchable';
import TableSearchBar from '../../global/components/TableSearchBar'

export default function Signatories() {
    const [searchValue, setSearchValue] = React.useState('')
    const [isClear, setIsClear] = React.useState(false)
    const { isLoading, data, refetch, } = useQuery({
        queryKey: ['signatories'],
        queryFn: async () => {
            const res = await api.get(`signatories?search=${searchValue}`);
            return res.data;
        },
    });

    React.useEffect(() => {
        if (isClear) {
            setSearchValue('');
            setIsClear(false);
            refetch();
        }
    }, [isClear])

    if (isLoading) return <TableLoading />;
    return <TableWPagination
        data={data}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        refetch={refetch}
        setIsClear={setIsClear}
    />;
}

const TableWPagination = ({ data, searchValue, setSearchValue, refetch, setIsClear }) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('user');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedData = React.useMemo(() => {
        return data.signatories.slice().sort((a, b) => {
            let compareA, compareB;
            if (orderBy === 'user') {
                compareA = a.user;
                compareB = b.user;
            } else if (orderBy === 'system') {
                compareA = a.age;
                compareB = b.age;
            } else if (orderBy === 'report') {
                compareA = a.signatoryPosition;
                compareB = b.signatoryPosition;
            } else if (orderBy === 'signatory') {
                compareA = a.signatoryPosition;
                compareB = b.signatoryPosition;
            } else if (orderBy === 'position') {
                compareA = a.signatoryPosition;
                compareB = b.signatoryPosition;
            } else {
                return 0;
            }
            if (order === 'asc') {
                return compareA > compareB ? 1 : -1;
            }
            return compareA < compareB ? 1 : -1;
        });
    }, [data.signatories, order, orderBy]);

    const paginatedData = React.useMemo(() => {
        const start = page * rowsPerPage;
        return sortedData.slice(start, start + rowsPerPage);
    }, [sortedData, page, rowsPerPage]);

    return (
        <>
            <DashboardHeader title="Signatories Management" description="Manage signatures" />

            <Box p={2}>
                <Box display="flex" justifyContent='space-between' mb={2} >
                    <TableSearchBar
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        refetch={refetch}
                        setIsClear={setIsClear}
                    />
                    <AddSignatoryModal systems={data.systems} />
                </Box>

                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table size='small'>
                        <TableHead sx={{ bgcolor: 'secondary.main', }}>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'user'}
                                        direction={orderBy === 'user' ? order : 'asc'}
                                        onClick={() => handleRequestSort('user')}
                                        sx={{
                                            color: 'white', // This colors the icon when inactive
                                            '&.Mui-active': {
                                                color: 'white', // This colors the icon when active
                                            },
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'white !important', // Enforce white color on the arrow icon
                                            },
                                        }}
                                    >
                                        User
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'system'}
                                        direction={orderBy === 'system' ? order : 'asc'}
                                        onClick={() => handleRequestSort('system')}
                                        sx={{
                                            color: 'white', // This colors the icon when inactive
                                            '&.Mui-active': {
                                                color: 'white', // This colors the icon when active
                                            },
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'white !important', // Enforce white color on the arrow icon
                                            },
                                        }}
                                    >
                                        System
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'report'}
                                        direction={orderBy === 'report' ? order : 'asc'}
                                        onClick={() => handleRequestSort('report')}
                                        sx={{
                                            color: 'white', // This colors the icon when inactive
                                            '&.Mui-active': {
                                                color: 'white', // This colors the icon when active
                                            },

                                            '& .MuiTableSortLabel-icon': {
                                                color: 'white !important', // Enforce white color on the arrow icon
                                            },
                                        }}
                                    >
                                        Report Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'signatory'}
                                        direction={orderBy === 'signatory' ? order : 'asc'}
                                        onClick={() => handleRequestSort('signatory')}
                                        sx={{
                                            color: 'white', // This colors the icon when inactive
                                            '&.Mui-active': {
                                                color: 'white', // This colors the icon when active
                                            },

                                            '& .MuiTableSortLabel-icon': {
                                                color: 'white !important', // Enforce white color on the arrow icon
                                            },
                                        }}
                                    >
                                        Signatory Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'position'}
                                        direction={orderBy === 'position' ? order : 'asc'}
                                        onClick={() => handleRequestSort('position')}
                                        sx={{
                                            color: 'white', // This colors the icon when inactive
                                            '&.Mui-active': {
                                                color: 'white', // This colors the icon when active
                                            },

                                            '& .MuiTableSortLabel-icon': {
                                                color: 'white !important', // Enforce white color on the arrow icon
                                            },
                                        }}
                                    >
                                        Signatory Position
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{
                                    color: 'white', // This colors the icon when inactive
                                    '&.Mui-active': {
                                        color: 'white', // This colors the icon when active
                                    },
                                }}> Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body1" color="textSecondary">
                                            No entries available.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((signatory) => (
                                    <TableRow key={signatory._id} hover>
                                        <TableCell component="th" scope="raw">
                                            <TextSearchable columnName={signatory.user} searchValue={searchValue} />
                                        </TableCell>
                                        <TableCell>
                                            <TextSearchable columnName={signatory.system} searchValue={searchValue} />
                                        </TableCell>
                                        <TableCell>
                                            <TextSearchable columnName={signatory.reportName} searchValue={searchValue} />
                                        </TableCell>
                                        <TableCell>
                                            <TextSearchable columnName={signatory.signatoryName} searchValue={searchValue} />
                                        </TableCell>
                                        <TableCell>
                                            <TextSearchable columnName={signatory.signatoryPosition} searchValue={searchValue} />
                                        </TableCell>
                                        <TableCell>
                                            <SignatoryTableMenu systems={data.systems} signatory={signatory} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    <TablePagination
                        component="div"
                        count={data.signatories.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </>
    );
};
