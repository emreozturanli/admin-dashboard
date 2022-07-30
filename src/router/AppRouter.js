import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import OutletComponent from '../components/OutletComponent';
import ForgotPassword from '../pages/ForgotPassword';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <OutletComponent />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter