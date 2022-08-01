import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import OutletComponent from '../components/OutletComponent';
import ForgotPassword from '../pages/ForgotPassword';
import Employees from '../pages/Employees';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <OutletComponent />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter