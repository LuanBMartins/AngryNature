import React from 'react'
import './style.css'
import { SidebarData } from './SidebarData'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="avatar"><AccountCircleIcon style={{fontSize:"6em"}} /></div>
      <ul className="SidebarList">
        {SidebarData.map((el, key) => {
          
          return (
            <Link to={el.link}>
              <li 
                key={key} 
                className="row"
                id={window.location.pathname === el.link ? 'active' : ''}        
              > 
                  <div id="icon">{el.icon}</div> 
                  <div id="title">{el.title}</div>
              </li>
            </Link>
            
          )
        })}
      </ul>
    </div>
  )
}
