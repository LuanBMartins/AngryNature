import React, {useState, useEffect} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './style.dashboard.css'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap'

export default function Dashboard() {

  const [post, setPost] = useState([])
  const [phenomena, setPhenomena] = useState([])

  return (
    <div className="container-dashboard">
      <div>
        {phenomena?.length ?
          phenomena?.map((el) => {
            return(
              <Card>
                <CardTitle>{el.tipo}</CardTitle>
                <CardSubtitle>{`Aconteceu em ${el.cidade}, no estado de ${el.estado}`}</CardSubtitle>
              </Card>
            )
          }) :
          <div>Nenhum fenomeno encontrado</div>
        } 
      </div>
    </div>
  )
}
