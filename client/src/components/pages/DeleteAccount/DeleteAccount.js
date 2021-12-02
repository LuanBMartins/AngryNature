import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Button } from 'reactstrap'
import './style.delete.css'
import api from "./../../../services/api"
import { ToastContainer, toast } from 'react-toastify'
import discriToken from './../../../utils/discriToken';
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailData, setEmailData] = useState('')

  const notifyError = (message) => toast.error(message)

  const handleInputChange = (e) => {
    setEmail(e.target.value)
  }

  const getEmail = async () => {
    try {
      const token = localStorage.getItem('token')
      const decode = discriToken()
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      let response;

      if(decode.comum){
        response = await api.get(`users/${decode.id_user}`, config)
        if(response.status === 200){
          setEmailData(response.data.email)
          console.log('email', response.data)
        } else{
          throw new Error('Erro ao buscar')
        }
      } else{
        response = await api.get(`specialists/${decode.id_user}`, config)
        if(response.status === 200){
          setEmailData(response.data.email)
        } else{
          throw new Error('Erro ao buscar')
        }
      }
    } catch (error) {
      notifyError(error.message)
    }
  }

  const deleteUser = async() => {
    try {
      const token = localStorage.getItem('token')
      const decoded = discriToken()
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      console.log(email)
      console.log(emailData)

      if(email === emailData){
        let response;
        if(decoded.comum){
          response = await api.delete(`users/${decoded.id_user}`, config)
        } else{
          response = await api.delete(`specialists/${decoded.id_user}`, config)
        }
  
        if(response.status === 200){
          localStorage.removeItem('token')
          navigate('/')
        } else {
          throw new Error('Erro ao deletar')
        }
      } else{
        throw new Error('Email incorreto')
      }
    } catch (error) {
      notifyError(error.message)
    }
  }

  useEffect(() => {
    getEmail()
  }, [])

  return (
    <div className="container-delete">
      <Sidebar/>
      <div>
        <div className="content-delete">
          <form>
            <label>
            <span>Digite o email para confirmar</span>
            <input type="email" onChange={handleInputChange} required/>
            </label>
          </form>
          <Button color="success" onClick={deleteUser}>Confirmar</Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
