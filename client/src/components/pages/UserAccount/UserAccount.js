import { dialogClasses } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './style.useraccount.css'
import api from "./../../../services/api"
import location  from './../../../utils/location.json'
import useLocalStorage from './../../../utils/useLocalStorage'
import { ToastContainer, toast } from 'react-toastify'
import EditIcon from '@mui/icons-material/Edit';
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap'
import discriToken from './../../../utils/discriToken';
import { useNavigate } from 'react-router-dom'

export default function UserAccount() {

  const [update, setUpdate] = useState({
    email: '',
    nome: '',
    senha: '',
    nascimento: '',
    estado: '',
    cidade: '',
    organizacao: '',
    especialidade: ''
  })

  const notifySuccess = (message) => toast.success(message)
  const notifyError = (message) => toast.error(message)

  const navigate = useNavigate()

  const [email, setEmail] = useLocalStorage("email", "")
  const [modal, setModal] = useState(false)
  const [estado, setEstado] = useState({})

  const toggle = () => setModal(!modal)

  const especialidade = ['Meteorologista', 'Astronomo', 'Físico', 'Engenheiro Quimico', 'Biologo', 'Cientista de dados', 'Analista de dados', 'Desenvolvedor']
  
  const [data, setData] = useState({
    email: '',
    nome: '',
    senha: '',
    nascimento: '',
    estado: '', 
    cidade: '',
    organizacao: '',
    especialidade: ''
  })

  const handleChangeUpdate = (e) => {
    const name = e.target.name;

    setUpdate({
      ...update,
      [name]: e.target.value
    })
  }

  const getDataUser = async () =>{
    try {
      const token = localStorage.getItem('token')
      const decoded = discriToken()
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      let response;
      if(decoded.comum){
        response = await api.get(`users/${decoded.id_user}`, config)
      } else{
        response = await api.get(`specialists/${decoded.id_user}`, config)
      }

      if(response.status === 200){
        setData(response.data)
      } else {
        throw response.data
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitUpdate = async (e) => {
    
    try {
      
      const token = localStorage.getItem('token')
      const decoded = discriToken()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      let response;
      if(!decoded.comum){
        response = await api.put(`specialists/${decoded.id_user}`, JSON.stringify(update), config)
        if(response.status === 200){
          notifySuccess('Atualizado com sucesso')
          setEmail(update.email)
          navigate('/dashboard')
        } else{
          throw new Error('Erro ao atualizar especialista')
        }
      } else {
        for(const key in update){
          if(key === 'organizacao' || key === 'especialidade'){
            delete update[key]
          }
        }
        response = await api.put(`users/${decoded.id_user}`, JSON.stringify(update), config)
        if(response.status === 200){
          notifySuccess('Atualizado com sucesso')
          navigate('/dashboard')
        } else{
          throw new Error('Erro ao registrar usuário')
        }
      }
    } catch (error) {
      notifyError('Erro ao criar')
    }
  }

  const checkType = () => {
    const decoded = discriToken()
    return decoded.comum;
  }
  

  useEffect(() => {
    getDataUser()
  }, [])

  useEffect(() => {
    setEstado(location.estados[0])
  }, [])


  return (
  
      <div className="container-useraccount">
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>
            Atualizar dados
          </ModalHeader>
          <ModalBody>
          <label>
            <span>Nome: </span>
            <input
              name="nome"
              type="text"
              placeholder="Nome"
              value={update.nome}
              onChange={handleChangeUpdate}
              autocomplete="off"
              required
            />
          </label>

          <label>
            <span>Email: </span>
            <input
              autocomplete="off"
              name="email"
              type="email"
              placeholder="Email"
              value={update.email}
              onChange={handleChangeUpdate}
              required
            />
          </label>

          <label>
            <span>Nascimento: </span>
            <input           
              name="nascimento"
              type="date"
              placeholder="Nascimento"
              value={update.nascimento}
              onChange={handleChangeUpdate}
              required
            />
          </label>

          <label>
            <span>Estado: </span>
            <select 
              name="estado" 
              placeholder="Estado" 
              value={update.estado} 
              onChange={(e) => { 
                setUpdate((prev) => ({
                  ...prev,
                  estado: e.target.value
                }))
                setEstado(location.estados.find((el) => el.sigla === e.target.value))
              }} 
              required
            >
              <option></option>
              {location.estados.map((el, key) => {
                return <option key={key} value={el.sigla}>{el.sigla} - {el.nome}</option>
              })}
            </select>
          </label>
          <label>
            <span>Cidade: </span>
            <select 
              name="cidade" 
              placeholder="Cidade" 
              value={update.cidade} 
              onChange={(e) => {
                setUpdate((prev) => ({
                  ...prev,
                  cidade: e.target.value
                }))
              }} 
              required
            >
              <option></option>
              {estado && (
                estado?.cidades?.map((el, key) => {
                  return <option key={key}value={el}>{el}</option>
                })
              )}
            </select>
          </label>       

          <label>
            <span>Senha</span>
            <input
              name="senha"
              type="password"
              placeholder="Senha"
              value={update.senha}
              onChange={handleChangeUpdate}
              required
            />
          </label>

          {!checkType() && (
            <>
              <label>
                <span>Instituição/Organização</span>
                <input
                  autocomplete="off"
                  name="organizacao"
                  type="text"
                  placeholder="Sigla ou nome"
                  value={update.organizacao}
                  onChange={handleChangeUpdate}
                  required
                />
              </label>
              <label>
                <span>Especialidade</span>
                <select name="especialidade" value={update.especialidade} onChange={handleChangeUpdate} required>
                  <option></option>
                  {especialidade.map((el, key) => {
                    return <option key={key} value={el}>{el}</option>
                  })}
                </select>
              </label>
            </>
          )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleSubmitUpdate}>Confirmar</Button>
                  <Button color="danger" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
              </Modal>
        <div className="content-account">

            <div>
              <div className="mb-2 item">Nome: <span>{data.nome}</span></div>
              <div className="mb-2 item">Email: <span>{data.email}</span></div>
              <div className="mb-2 item">Nascimento: <span>{data.nascimento.split('T')[0]}</span></div>
              <div className="mb-2 item">Estado: <span>{data.estado}</span></div>
              <div className="mb-2 item">Cidade: <span>{data.cidade}</span></div>
              {!checkType() && (
                <>
                  <div className="mb-2 item">Organização: <span>{data.organizacao}</span> </div>
                   <div className="mb-2 item">Especialidade: <span>{data.especialidade}</span> </div>
                </>  
              )}
            </div>
            
            
            <label className="edit">
            <Button color="primary" onClick={toggle} className="d-flex align-items-center">
              <EditIcon color="light" fontSize="small" style={{cursor: 'pointer'}} />
              Atualizar
            </Button>
           
            </label>          
        </div>
        <ToastContainer />
      </div>
 
  )
}
