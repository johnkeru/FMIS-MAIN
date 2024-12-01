import { Typography } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProvider from './context/UserContext';
import Dashboard from './layout/Dashboard';
import OnlySuperAdmins from './middleware/OnlySuperAdmins';
import Home from './pages/Home';
import Index from './pages/Index';
import Login from './pages/Login';
import RoleAssign from './pages/role/RoleAssign';
import RolesAssignedTable from './pages/role/RolesAssignedTable';
import RolesTable from './pages/role/RolesTable';
import SignatoriesTable from './pages/signatory/SignatoriesTable';
import SignatoryCreate from './pages/signatory/SignatoryCreate';
import CreateTransactionType from './pages/signatory/CreateTransactionType';
import Test from './pages/signatory/Test';

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path='/' element={<UserProvider><Dashboard /></UserProvider>}>
        <Route path='dashboard' element={<Index />} />

        <Route path='roles' element={<OnlySuperAdmins><RolesTable /></OnlySuperAdmins>} />
        <Route path='roles/assign' element={<RoleAssign />} />
        <Route path='roles/roles-assigned' element={<RolesAssignedTable />} />

        <Route path='signatories' element={<SignatoriesTable />} />
        <Route path='/signatories/create-transaction-type' element={<CreateTransactionType />} />
        <Route path='signatories/create' element={<SignatoryCreate />} />
        <Route path='signatories/test' element={<Test />} />

      </Route>

    </Routes>
  );
};

export default App;
