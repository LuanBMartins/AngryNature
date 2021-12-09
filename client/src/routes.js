import React from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Home from './components/pages/Home/Home'
import Dashboard from './components/pages/Dashboard/Dashboard'
import UserAccount from './components/pages/UserAccount/UserAccount'
import DeleteAccount from './components/pages/DeleteAccount/DeleteAccount'
import AllSpecialists from './components/pages/AllSpecialists/AllSpecialists'
import Phenomena from './components/pages/Phenomena/Phenomena'
import Donations from './components/pages/Donations/Donations'
import Reports from './components/pages/Reports/Reports'
import Publications from './components/pages/Publications/Publications'

import Error from './components/pages/Error/Error'
import Sidebar from './components/pages/Sidebar/Sidebar'

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>}  />
        <Route exact path="/dashboard" element={
          <ProtectedRoute>
            <Sidebar/>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route exact path="/useraccount" element={
          <ProtectedRoute>
            <Sidebar />
            <UserAccount/>
          </ProtectedRoute>
        }/>
        <Route exact path="/deleteaccount" element={
          <ProtectedRoute>
            <Sidebar/>
            <DeleteAccount/>
          </ProtectedRoute>
        }/>
        <Route exact path="/allspecialists" element={
          <ProtectedRoute>
            <Sidebar />
            <AllSpecialists/>
          </ProtectedRoute>
        }/>
        <Route exact path="/donations" element={
          <ProtectedRoute>
            <Sidebar />
            <Donations/>
          </ProtectedRoute>
        }/>
        <Route exact path="/myphenomena" element={
          <ProtectedRoute>
            <Sidebar />
            <Phenomena/>
          </ProtectedRoute>
        }/>
        <Route exact path="/mypublications" element={
          <ProtectedRoute>
            <Sidebar />
            <Publications/>
          </ProtectedRoute>
        }/>
        <Route exact path="/mypublications" element={
          <ProtectedRoute>
            <Sidebar />
            <Reports/>
          </ProtectedRoute>
        }/>
        
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  )
}
