import React from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Home from './components/pages/Home/Home'
import Dashboard from './components/pages/Dashboard/Dashboard'
import UserAccount from './components/pages/UserAccount/UserAccount'
import DeleteAccount from './components/pages/DeleteAccount/DeleteAccount'
import AllSpecialists from './components/pages/AllSpecialists/AllSpecialists'
import Sidebar from './components/pages/Sidebar/Sidebar'
import Error from './components/pages/Error/Error'

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>}  />
        <Route exact path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route exact path="/useraccount" element={
          <ProtectedRoute>
            <UserAccount/>
          </ProtectedRoute>
        }/>
        <Route exact path="/deleteaccount" element={
          <ProtectedRoute>
            <DeleteAccount/>
          </ProtectedRoute>
        }/>
        <Route exact path="/allspecialists" element={
          <ProtectedRoute>
            <AllSpecialists/>
          </ProtectedRoute>
        }/>
        
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  )
}
