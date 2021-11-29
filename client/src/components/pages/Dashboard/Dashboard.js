import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './style.dashboard.css'

export default function Dashboard() {
  return (
    <div className="container-dashboard">
      <Sidebar/>
      <div>
        <h2>Dashboard</h2>
        <div className="content">
          Não há posts no momento
          <button className="">Adicionar post</button>
        </div>
      </div>


    </div>
  )
}
