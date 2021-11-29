import React from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Home from './components/pages/Home/Home'
import Dashboard from './components/pages/Dashboard/Dashboard'
import UserAccount from './components/pages/UserAccount/UserAccount'
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
        <Route path="/useraccount" element={<UserAccount/>} /> 
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  )
}
