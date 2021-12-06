import React from 'react'
import "./style.donations.css"
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap'

import SearchIcon from '@mui/icons-material/Search';


export default function Doacoes() {



  const mock = [{
    nome: 'Carlos',
    email: 'carlos@gmail.com',
    data: '01-01-2020',
    valor: 200.00,
    ong: 'AJUDE'
  }]

  return (
    <div className="container-donations">
       

      <div>
        <div className="donation-search">
          <input type="date"/>
          <SearchIcon 
            style={{
              background: 'white', 
              border: '1px solid lightgrey', 
              borderRadius: '6px', 
              marginLeft: '5px',
              marginBottom: '0.5em',
              cursor: 'pointer',
              boxShadow: '2px 2px 1px grey',
            }} 
            fontSize="large"
          />
        </div>
        <div className="content-donation">
          <table>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Ong</th>
            </tr>
          {mock?.map((el) => {
            return (
              <tr>
                <td>{el.nome}</td>
                <td>{el.email}</td>
                <td>{el.data}</td>
                <td>{el.valor.toFixed(2)}</td>
                <td>{el.ong}</td>
              </tr>
            )
          })}
          </table>
          
        </div>
        <div className="button-donation">
          <Button color="primary">
              Doar
          </Button>
        </div>
        
      </div>
    
    </div>
  )
}
