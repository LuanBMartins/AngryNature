
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './style.allspecialists.css'
import api from "./../../../services/api"
import { ToastContainer, toast } from 'react-toastify'
import { Card } from 'reactstrap'

export default function UserAccount() {

  const [listSpecialists, setListSpecialists] = useState([])
  const notifySuccess = (message) => toast.success(message)
  const notifyError = (message) => toast.error(message)

  const styleContainer = {
    background: 'linear-gradient(to right, rgb(113, 163, 179),rgb(89, 194, 89))',
    display: 'flex',
    height: '100vh',
  }


  const getDataSpecialists = async () =>{
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      
      const response = await api.get('specialists', config)
      if(response.status === 200) {
        setListSpecialists(response.data)
        notifySuccess('Especialistas encontrados')
      } else{
        throw new Error('Não foi possível buscar')
      }

    } catch (error) {
      notifyError(error.message)
    }
  }

  useEffect(() => {
    getDataSpecialists()
  }, [])

  return (
  
      <div className="container-specialists">
        <div className="specialists">
          <h1>Especialistas</h1>
            {listSpecialists?.map((el, key) => {
              return (
                  <Card className="border mb-3 mt-4 p-3" key={key}>
                    <div className="mb-2">Nome: <span>{el.nome}</span> </div>
                    <div className="mb-2">Email para contato: <span>{el.email}</span> </div>
                    <div className="mb-2">Estado: <span>{el.estado}</span> </div>
                    <div className="mb-2">Cidade: <span>{el.cidade}</span> </div>
                    <div className="mb-2">Especialidade: <span>{el.especialidade}</span> </div>
                    <div className="mb-2">Organização: <span>{el.organizacao}</span> </div>
                  </Card>
              )
            })}          
        </div>
        <ToastContainer />
      </div>
 
  )
}
