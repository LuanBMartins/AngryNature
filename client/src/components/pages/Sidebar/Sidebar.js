import React, { useState, useEffect } from 'react'
import './style.css'
import { SidebarData } from './SidebarData'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteIcon from '@mui/icons-material/Delete';
import discriToken from './../../../utils/discriToken';
import FeedIcon from '@mui/icons-material/Feed';
import { useSelector } from 'react-redux';
import api from "./../../../services/api"
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Sidebar() {

  const [data, setData] = useState('')
  // const [selected, setSelected] = useState(JSON.parse(localStorage.getItem('sidebard')))
  const [emailLocal, setEmailLocal] = useState('')
  const [loading, setLoading] = useState(false)
  const [typeComum, setTypeComum] = useState('')
  
  const navigate = useNavigate()


  const getEmail = async () =>{
    const email = localStorage.getItem('email')
    setEmailLocal(JSON.parse(email))
  }
  const check = (e) => {
    setData(e.target.textContent)
    setLoading(true)
  }

  useEffect(() => {
    if(data === 'Sair'){
      setTimeout(() => {
        setLoading(false)
        localStorage.removeItem('token')
        navigate('/')
      }, 3000) 
    }
  }, [data])

  useEffect(() => {
    const decoded = discriToken()
    setTypeComum(decoded.comum)
    getEmail()
    console.log(window.location.pathname)
  }, [])


  
  return (
    <div className="sidebar">
      <div className="avatar"><AccountCircleIcon style={{fontSize:"6em"}} /></div>
      <div style={{color: 'white'}}>{emailLocal}</div>
      <ul className="SidebarList">
        {SidebarData.map((el, key) => {
          
          return (
            <Link 
              to={el?.link} 
              key={key}
              className="link" 
            >
              <li 
                key={key} 
                className="row"
                id={window.location.pathname === el?.link ? 'active' : ''}
              > 
                  <div id="icon">{el.icon}</div>
                
                  <div id="title">{el.title}</div>
    
              </li>
            </Link>
          )
        })}

          {!typeComum && (
            <>
            <Link
              to="/allspecialists"
              className="link"
            >
            <li
              className="row"
              id={window.location.pathname === '/allspecialists' ? 'active' : ''}
            >
              <div id="icon"><GroupsIcon/></div>
              <div id="title">Especialistas</div>
            </li>
           </Link>
           <Link
              to="/mypublications"
              className="link"
            >
            <li
              className="row"
              id={window.location.pathname === '/mypublications' ? 'active' : ''}

            >
              <div id="icon"><FeedIcon/></div>
              <div id="title">Minhas publicações</div>
            </li>
           </Link>
           <Link
              to="/reports"
              className="link"
            >
            <li
              className="row"
              id={window.location.pathname === '/reports' ? 'active' : ''}

            >
              <div id="icon"><AssessmentIcon /></div>
              <div id="title">Relatórios</div>
            </li>
           </Link>
           </>
          )}

          <Link
            to="/deleteaccount"
            className="link"
          >
          <li
            className="row"
            id={window.location.pathname === '/deleteaccount' ? 'active' : ''}
          >
            <div id="icon"><DeleteIcon color="error"/></div>
            <div id="title" style={{color: "tomato"}}>Excluir conta</div>
          </li>
          </Link>  

          <li className="row" onClick={check}>
            {loading && 
            (<div style={{textAlign: 'center'}}>
              <Spinner  animation="border" color="danger" size="sm" />
             </div>
            )  
            }
            {!loading && (
              <>
                <div id="icon"><ExitToAppIcon color="error" /></div>
                <div id="title" style={{color: "tomato"}}>{'Sair'}</div>
              </>
            )}
          </li>
      </ul>
    </div>
  )
}
