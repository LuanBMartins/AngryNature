import { dialogClasses } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './style.allspecialists.css'
import api from "./../../../services/api"
import location  from './../../../utils/location.json'
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

  const [modal, setModal] = useState(false)
  const [estado, setEstado] = useState({})

  const toggle = () => setModal(!modal)

  const especialidade = ['Meteorologista', 'Astronomo', 'Físico', 'Engenheiro Quimico', 'Biologo', 'Cientista de dados', 'Analista de dados', 'Desenvolvedor']
  
  const [formEspecializado, setFormEspecializado] = useState('')
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
      console.log(decoded)
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
        console.log(update)
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
  

  useEffect(() => {
    getDataUser()
  }, [])

  useEffect(() => {
    setEstado(location.estados[0])
    setUpdate((prev) => ({
      ...prev,
      estado: location.estados[0].sigla
    }))
  }, [])


  return (
  
      <div className="container-useraccount">
        <Sidebar />
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
              required
            />
          </label>

          <label>
            <span>Email: </span>
            <input
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

          {formEspecializado && (
            <>
              <label>
                <span>Instituição/Organização</span>
                <input
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
                  <Button color="danger" >Cancelar</Button>
                </ModalFooter>
              </Modal>
        <div className="content-data">

            <div style={{border: 'none'}}>
              <div>Nome: <span>{data.nome}</span></div>
              <div>Email: <span>{data.email}</span></div>
              <div>Nascimento: <span>{data.nascimento.split('T')[0]}</span></div>
              <div>Estado: <span>{data.estado}</span></div>
              <div>Cidade: <span>{data.cidade}</span></div>
            </div>
            
            
            <label className="delete-edit">
              Atualizar dados - 
            <EditIcon color="primary" fontSize="large" style={{cursor: 'pointer'}} onClick={toggle} />
            </label>          
        </div>
        <ToastContainer />
      </div>
 
  )
}
