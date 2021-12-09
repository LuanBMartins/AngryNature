import React, { useState, useEffect } from "react";
import "./style.dashboard.css";
import api from "./../../../services/api";
import location from "./../../../utils/location.json";
import { ToastContainer, toast } from "react-toastify";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Card,
  Spinner,
  UncontrolledTooltip,
} from "reactstrap";
import discriToken from "./../../../utils/discriToken";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [post, setPost] = useState([])
  const [phenomena, setPhenomena] = useState([])


  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);


  const getPhenomenaAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`fenomeno/lista`, config);
      if (response.status === 200) {
        setPhenomena(response.data);
        console.log(response);
      } else {
        throw new Error("Erro ao buscar");
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  const getPostAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`post/lista`, config);
      if (response.status === 200) {
        setPost(response.data);
      } else {
        throw new Error("Erro ao buscar");
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  useEffect(() => {
    getPhenomenaAll();
    getPostAll();
  }, [])

  return (
    <div className="container-dashboard">
      <div className="painel-phenomenon">
          <h1>Fenomenos</h1>
        {phenomena?.length ?
          phenomena?.map((el, key) => {
            return (
            <div id={`tooltip-${key}-${el.id}`}  key={key} className="images-container-dashboard">
              <img className="image-dashboard" src={`${el.arquivo}`} alt="" onClick={(e) => window.open(el.arquivo)}/>
              <UncontrolledTooltip 
                placement="auto"
                target={`tooltip-${key}-${el.id}`}
              >
                <div className="p-2 mb-2">Registrado por: {el.autor}</div>
                <div className="p-2 mb-2">Tipo: {el.tipo}</div>
                <div className="p-2 mb-2">Localização: {el.cidade} - {el.estado}</div>
                <div className="p-2 mb-2">Aconteceu em: {el.data} as {el.horas}</div>
              </UncontrolledTooltip>
            </div>
            
          )
          }) : <div>Nenhum fenomeno encontrado</div>
        }
      </div>
      <div className="painel-post">
        <h1>Posts</h1>
      {post?.length ?
          post?.map((el, key) => {
            return (
              <div id={`tooltip2-${key}-${el.id}`} className="content-post">
                <div key={key} className="images-container-dashboard">
                  <img className="image-dashboard-post" src={`${el.arquivo}`} alt="" onClick={(e) => window.open(el.arquivo)}/>
                  <div>{el.texto}</div>
                </div>
                <UncontrolledTooltip 
                placement="auto"
                target={`tooltip2-${key}-${el.id}`}
              >
                <div className="p-2 mb-2">Registrado por: {el.autor}</div>
                <div className="p-2 mb-2">Data: {el.data}</div>
              </UncontrolledTooltip>
              </div>
            
          )
          }) : <div>Nenhum fenomeno encontrado</div>
        }
      </div>
     
    </div>
  )
}
