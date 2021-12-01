import React, { useState, useEffect, useRef } from 'react'
import "./style.home.css"
import api from "./../../../services/api"

export default function UserForm() {

  const [message, setMessage] = useState('')
  const [formEspecializado, setFormEspecializado] = useState(false);
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const [register, setRegister] = useState({
    name: '',
    email: '',
    birthday: '',
    country: '',
    state: '',
    city: '',
    password: '',
    organization: '',
    specialty: ''
  });


  const pais = ['Selecione o país', 'Brasil', 'Alemanha', 'Estados Unidos']

  // http://educacao.dadosabertosbr.com/api/cidades/mg
  const cidade = ['Selecione a cidade', 'Pouso Alegre', 'Berlin', 'Florida']
  const estado = ['Selecione o estado', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF']
  const especialidade = ['Selecione uma especialidade', 'Meteorologia', 'Astronomo', 'Físico', 'Engenhario Quimico', 'Biologo', 'Cientista de dados']


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

  const onSubmitLogin = (e) => {
    e.preventDefault();
  }

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      let response;
      if(register.organization && register.specialty){
        response = await api.post('userSpecialist', register)
        if(response.status === 200){
          setMessage(response.message)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
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
              onChange={handleChangeLogin}
            />
          </label>

          <label>
            <span>Senha: </span>

            <input
              name="password"
              type="password"
              placeholder="Senha"
              onChange={handleChangeLogin}
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
              name="name"
              type="text"
              placeholder="Nome"
              onChange={(e) => setRegister()}
            />
          </label>

          <label>
            <span>Email: </span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChangeRegister}
            />
          </label>

          <label>
            <span>Nascimento: </span>
            <input
              name="birthday"
              type="date"
              placeholder="Nascimento"
              onChange={handleChangeRegister}
            />
          </label>

          <label>
            <span>País: </span>
            <select name="country" placeholder="País" onChange={handleChangeRegister}>
              {pais.map((el) => {
                return <option value={el}>{el}</option>
              })}
            </select>
          </label>

          <label>
            <span>Estado: </span>

            <select
              name="state"
              placeholder="Estado"
              onChange={handleChangeRegister}
            >
              {estado.map((el) => {
                return <option value={el}>{el}</option>
              })}
            </select>
          </label>

          <label>
            <span>Cidade: </span>
            <select
              name="city"
              placeholder="Cidade"
              onChange={handleChangeRegister}
            >
              {cidade.map((el, key) => {
                return <option key={key} value={el} selected={el === 'Selecione a cidade' ? 'selected' : ''}>{el}</option>
              })}
            </select>
          </label>

          <label>
            <span>Senha</span>
            <input
              name="password"
              type="password"
              placeholder="Senha"
              onChange={handleChangeRegister}
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
                  name="organization"
                  type="text"
                  placeholder="Sigla ou nome"
                  onChange={handleChangeRegister}
                />
              </label>
              <label>
                <span>Especialidade</span>
                <select name="especialidade" onChange={handleChangeRegister}>
                  {especialidade.map((el, key) => {
                    return <option key={key} value={el} selected={el === 'Selecione uma especialidade' ? el : ''}>{el}</option>
                  })}
                </select>
              </label>
            </>
          )}
          <button>CONFIRMAR</button>
        </form>
      </div>
    </div>
  )
}
