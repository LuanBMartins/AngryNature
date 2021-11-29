import { dialogClasses } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './style.useraccount.css'
import api from "./../../../services/api"
export default function UserAccount() {

  const [update, setUpdate] = useState({
    name: "",
    email: "",
    birthday: "",
    country: "",
    state: "",
    city: "",
    specialty: "",
    organization: ""
  })
  
  const [message, setMessage] = useState(false)

  const [formEspecializado, setFormEspecializado] = useState('')
  const [res, setRes] = useState({
    nome: 'Carlos',
    email: 'carlos@teste.com',
    pais: 'Brasil',
    estado: 'MG' 
  })

  // name: "",
  // email: "",
  // birthday: "",
  // country: "",
  // state: "",
  // city: "",
  // specialty: "",
  // organization: ""

  const [data, setData] = useState({})

  const getDataUser = async (email) =>{
    try {
      const response = await api.get(`user/${email}`)

      if(response.status === 200){
        setRes(response.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitUpdate = async (e) => {
    
    try {
      const response = await api.patch(`user/${update.email}`, update);
      if(response === 201){
        setData(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleChangeUpdate = (e) => {
    const name = e.target.name;

    setUpdate({
      ...update,
      [name]: e.target.value
    })
  }

  return (
  
      <div className="container-useraccount">
        <Sidebar />
        <div className="content-useraccount">
          <form>
          <label>
            <span>Nome: </span>
            <input
              name="name"
              type="text"
              placeholder="Nome"
              value={data.name}
              onChange={handleChangeUpdate}
            />
          </label>

          <label>
            <span>Email: </span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChangeUpdate}
            />
          </label>

          <label>
            <span>Nascimento: </span>
            <input
              name="birthday"
              type="date"
              placeholder="Nascimento"
              onChange={handleChangeUpdate}
            />
          </label>

          <label>
            <span>País: </span>
            <select name="country" placeholder="País" onChange={handleChangeUpdate}>
              <option>{data.pais}</option>
            </select>
          </label>

          <label>
            <span>Estado: </span>

            <select
              name="state"
              placeholder="Estado"
              onChange={handleChangeUpdate}
            >
             <option>{data.estado}</option>
            </select>
          </label>

          <label>
            <span>Cidade: </span>
            <select
              name="city"
              placeholder="Cidade"
              onChange={handleChangeUpdate}
            >
              <option value="">Teste</option>
            </select>
          </label>

          <label>
            <span>Senha</span>
            <input
              name="password"
              type="password"
              placeholder="Senha"
              onChange={handleChangeUpdate}
            />
          </label>

          <label>
            <span>Cadastro para usuário especializado?</span>
            <input
              type="checkbox"
              className="check"
              onChange={(e) => {
                setFormEspecializado(e.target.checked)
              }}
            />
          </label>
          <button>CONFIRMAR</button>
          </form>
        </div>
         
      </div>
 
  )
}
