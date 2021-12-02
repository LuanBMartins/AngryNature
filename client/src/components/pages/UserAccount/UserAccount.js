import { dialogClasses } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './style.useraccount.css'
import api from "./../../../services/api"
import location  from './../../../utils/location.json'
import { ToastContainer, toast } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap'

export default function UserAccount() {

  const [update, setUpdate] = useState({
    email: '',
    nome: '',
    senha: '',
    nascimento: '',
    regiao: {estado: '', cidade: ''},
    organizacao: '',
    especialidade: ''
  })

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
    regiao: {estado: '', cidade: ''},
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
      const id = localStorage.getItem('id')
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await api.get(`users/${id}`, config)

      if(response.status === 200){
        setData(response.data)
    
        console.log(response.data.nascimento.split('T'))
      } else {
        throw response.data
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitUpdate = async (e) => {
    
    try {
      const token = JSON.parse(localStorage.getItem('token'))
      const email = JSON.parse(localStorage.getItem('email'))
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await api.patch(`user/${update.email}`, update);
      if(response === 201){
        setData(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(() => {
    getDataUser()
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
                  regiao: {estado: e.target.value, cidade: ''}
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
                  regiao: {...update.regiao, cidade: e.target.value}
                }))
              }} 
              required
            >
              {estado && (
                estado?.cidades?.map((el) => {
                  return <option value={el}>{el}</option>
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
                  <Button color="primary">Confirmar</Button>
                  <Button color="danger" >Cancelar</Button>
                </ModalFooter>
              </Modal>
        <div className="content-data">
         
            <div>Nome: <span>{data.nome}</span></div>
            <div>Email: <span>{data.email}</span></div>
            <div>Nascimento: <span>{data.nascimento.split('T')[0]}</span></div>
            <div>Estado: <span>{data.regiao.estado}</span></div>
            <div>Cidade: <span>{data.regiao.cidade}</span></div>
            
            <label className="delete-edit">
            <EditIcon color="primary" fontSize="large" style={{cursor: 'pointer'}} onClick={toggle} />
            <DeleteIcon color="error" fontSize="large" style={{cursor: 'pointer'}}/>
            </label>          
        </div>
      </div>
 
  )
}
