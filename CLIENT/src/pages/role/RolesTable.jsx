import { Box, Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { FaUserPen } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import AddRoleDialog from '../../components/role/AddRoleDialog';
import RoleTableMenu from '../../components/role/RoleTableMenu';
import api from '../../config/api';
import { useUser } from '../../context/UserContext';
import DashboardHeader from '../../global/components/DashboardHeader';
import TableLoading from '../../global/components/TableLoading';

export default function RolesTable() {
    const [currentTab, setCurrentTab] = React.useState('active'); // active | disabled
    const { currentUser } = useUser();

    const { data: roles, isLoading, } = useQuery({
        queryKey: ['roles', currentTab],  // Include currentTab in queryKey to handle default and dynamic refetch
        queryFn: async ({ queryKey }) => {
            const [_, tab] = queryKey;  // Destructure queryKey to get the current tab value
            const roleNames = currentUser.Roles;
            const queryParams = roleNames.map(role => `roles=${encodeURIComponent(role)}`).join('&');
            const res = await api.get(`roles?${queryParams}&tab=${tab}`);
            return res.data.roles;
        },
        enabled: !!currentUser,  // Ensure the query runs only if currentUser is defined
    });

    const handleChangeTab = (tab) => {
        setCurrentTab(tab);  // Trigger refetch by updating currentTab, which is part of queryKey
    };
    if (isLoading) return <TableLoading />;
    return <TablePlain data={roles} currentTab={currentTab} handleChangeTab={handleChangeTab} />
}


const TablePlain = ({ data, currentTab, handleChangeTab, }) => {
    const nav = useNavigate()

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');

    // Sorting handler
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Sorting function
    const sortedData = React.useMemo(() => {
        return data.sort((a, b) => {
            if (orderBy === 'name') {
                return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (orderBy === 'age') {
                return order === 'asc' ? a.age - b.age : b.age - a.age;
            }
            return 0;
        });
    }, [data, order, orderBy]);

    return (
        <>
            <DashboardHeader title="Role Management" description="Manage User Roles" />


            <Box p={2}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled button group"
                    >
                        <Button onClick={() => handleChangeTab('active')} sx={{ bgcolor: currentTab == 'active' ? 'primary.main' : '#c0c0c0', ":hover": { bgcolor: currentTab == 'active' ? 'primary.main' : '#c0c0c0' } }}>Active</Button>
                        <Button onClick={() => handleChangeTab('disabled')} sx={{ bgcolor: currentTab == 'disabled' ? 'primary.main' : '#c0c0c0', ":hover": { bgcolor: currentTab == 'disabled' ? 'primary.main' : '#c0c0c0' } }}>Disabled</Button>
                    </ButtonGroup>
                    <Box display="flex">
                        <Button
                            size='large'
                            startIcon={<FaUserPen />}
                            variant="contained"
                            color="info"
                            onClick={() => nav('/roles/assign')}
                            sx={{ mr: 1 }}
                        >
                            Role Assign
                        </Button>
                        <AddRoleDialog />
                    </Box>
                </Box>


                <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 1, overflow: 'auto' }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{
                                    py: 1, // vertical padding
                                    px: 2, // horizontal padding
                                }}>
                                    Actions
                                </TableCell>
                                <TableCell sx={{ py: 1, px: 2 }}>
                                    <TableSortLabel
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={() => handleRequestSort('name')}
                                    >
                                        Role Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right" sx={{ py: 1, px: 2 }}>
                                    Permission
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography variant="body1" color="textSecondary">
                                            No entries available.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sortedData.map((role) => (
                                    <TableRow key={role.name} sx={{ '&:nth-of-type(even)': { bgcolor: 'grey.200', }, ":hover": { bgcolor: 'grey.300' } }}>
                                        <TableCell sx={{ py: 1, px: 2 }}>
                                            <RoleTableMenu data={role} currentTab={currentTab} />
                                        </TableCell>
                                        <TableCell component="th" scope="row" sx={{ py: 1, px: 2 }}>
                                            {role.name}
                                        </TableCell>
                                        <TableCell align="right" sx={{ py: 1, px: 2 }}>
                                            {role.permission}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </>
    );
};

