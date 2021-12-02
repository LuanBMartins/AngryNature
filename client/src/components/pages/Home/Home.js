import React, { useState, useEffect  } from 'react'
import "./style.home.css"
import api from "./../../../services/api"
import { useNavigate } from 'react-router-dom'
import location  from './../../../utils/location.json'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function UserForm() {

  const [formEspecializado, setFormEspecializado] = useState(false);
  const [estado, setEstado] = useState({})
  const [login, setLogin] = useState({
    email: '',
    senha: ''
  });

  const [register, setRegister] = useState({
    email: '',
    nome: '',
    senha: '',
    nascimento: '',
    estado: '',
    cidade: '',
    organizacao: '',
    especialidade: ''
  });

  const notifySuccess = (message) => toast.success(message)
  const notifyError = (message) => toast.error(message)

  const navigate = useNavigate()

  const especialidade = ['Meteorologista', 'Astronomo', 'Físico', 'Engenheiro Quimico', 'Biologo', 'Cientista de dados', 'Analista de dados', 'Desenvolvedor']

  const clearForm = () => {
    setRegister({
      email: '',
      nome: '',
      senha: '',
      nascimento: '',
      estado: '',
      cidade: '',
      organizacao: '',
      especialidade: ''
    })

    setEstado(location.estados[0])
  }

  const handleChangeRegister = (e) => {
    const name = e.target.name;

    setRegister({
      ...register,
      [name]: e.target.value
    })
  }

  const handleChangeLogin = (e) => {
    const name = e.target.name;

    setLogin({
      ...login,
      [name]: e.target.value
    })
  }


  const onSubmitLogin = async(e) => {
    e.preventDefault();
    try {
       const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await api.post('users/login', JSON.stringify(login), config)
      if(response.status === 200) {
        localStorage.setItem('token', response.data)
        notifySuccess('Logado com sucesso')
        navigate("/dashboard")
      } else {
        throw new Error('error')
      }
    } catch (error) {
      notifyError('Email e/ou senha incorretos')
    }
  }

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
     
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let response;
      if(register.organizacao){
        response = await api.post('specialists', JSON.stringify(register), config)
        if(response.status === 201){
          notifySuccess('Criado com sucesso')
        } else{
          throw new Error('Erro ao registrar especialista')
        }
      } else {
        for(const key in register){
          if(key === 'organizacao' || key === 'especialidade'){
            delete register[key]
          }
        }
        response = await api.post('users', JSON.stringify(register), config)
        if(response.status === 201){
          console.log('respostaa aqui', response.data)
          notifySuccess('Criado com sucesso')
        } else{
          throw new Error('Erro ao registrar usuário')
        }
      }
      clearForm();
    } catch (error) {
      notifyError(error.message)
    }
  }

  useEffect(() => {
    setEstado(location.estados[0])
  }, [])

  return (
    <div className="container-home">
      <img src="/tornado.jpg" alt="" />
      <div className="container-form">
        
        <form onSubmit={onSubmitLogin}>
        <h3>Login</h3>
          <label>
            <span>Email: </span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={login.email}
              onChange={handleChangeLogin}
              required
            />
          </label>

          <label>
            <span>Senha: </span>

            <input
              name="senha"
              type="password"
              placeholder="Senha"
              value={login.senha}
              onChange={handleChangeLogin}
              required
            />
          </label>

          <button>CONFIRMAR</button>
        </form>
      </div>

      <div className="container-form">
        <form onSubmit={onSubmitRegister}>
        <h3>Registro</h3>

          <label>
            <span>Nome: </span>
            <input
              name="nome"
              type="text"
              placeholder="Nome"
              value={register.nome}
              onChange={handleChangeRegister}
              required
            />
          </label>

          <label>
            <span>Email: </span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={register.email}
              onChange={handleChangeRegister}
              required
            />
          </label>

          <label>
            <span>Nascimento: </span>
            <input
              name="nascimento"
              type="date"
              placeholder="Nascimento"
              value={register.nascimento}
              onChange={handleChangeRegister}
              required
            />
          </label>

          <label>
            <span>Estado: </span>
            <select 
              name="estado" 
              placeholder="Estado" 
              value={register.estado} 
              onChange={(e) => { 
                setRegister((prev) => ({
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
              value={register.cidade} 
              onChange={(e) => {
                setRegister((prev) => ({
                  ...prev,
                  cidade: e.target.value
                }))
              }} 
              required
            >
              <option></option>
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
              value={register.senha}
              onChange={handleChangeRegister}
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
                  value={register.organizacao}
                  onChange={handleChangeRegister}
                  required
                />
              </label>
              <label>
                <span>Especialidade</span>
                <select name="especialidade" value={register.especialidade} onChange={handleChangeRegister} required>
                  <option></option>
                  {especialidade.map((el, key) => {
                    return <option key={key} value={el}>{el}</option>
                  })}
                </select>
              </label>
            </>
          )}
          <button>CONFIRMAR</button>
        </form>
      </div>
      <ToastContainer />
      
    </div>
  )
}
