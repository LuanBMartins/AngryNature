import React, { useState, useEffect } from "react";
import "./style.publications.css";
import api from "./../../../services/api";
import location from "./../../../utils/location.json";
import { ToastContainer, toast } from "react-toastify";
import PublicationUpdate from './PublicationUpdate'
import EditIcon from "@mui/icons-material/Edit";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Card,
  Spinner,
} from "reactstrap";
import discriToken from "./../../../utils/discriToken";
import { useNavigate } from "react-router-dom";

export default function UserAccount() {
  const [register, setRegister] = useState({
    autor: "",
    data: "",
    texto: "",
    arquivo: "",
    idEspecialista: "",
  });

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [id, setId] = useState('');
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false)
  const [listPost, setListPosts] = useState([]);

  const toggle = () => setModal(!modal);

  const tipos = [
    "Tornado",
    "Terremoto",
    "Tempestade",
    "Nevasca",
    "Tsunami",
    "Furação",
    "Ciclone",
    "Tufão",
    "Erupção Vulcânica",
    "Deslizamento de terra",
    "Incêndio natural",
  ];
  const nivel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  

  const clearForm = () => {
    setRegister({
      ...register,
      autor: "",
      data: "",
      texto: "",
      arquivo: "",
    });
    setFile('');
  };

  const handleClickImage = (id) => {
    setSelectedImage(id)
  }

  const handleChangeRegisterFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gerencia");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dybba0h3l/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const fileResponse = await res.json();
    setFile(fileResponse.secure_url);
    setRegister({ ...register, arquivo: fileResponse.secure_url });
    setLoading(false);
  };

  const handleChangeRegister = (e) => {
    const name = e.target.name;
    setRegister({
      ...register,
      [name]: e.target.value,
    });
  };

  const getDataPosts = async () =>{
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      
      const response = await api.get('post/lista', config)
      if(response.status === 200) {
        setListPosts(response.data)
      } else{
        throw new Error('Não foi possível buscar')
      }

    } catch (error) {
      notifyError(error.message)
    }
  }

  const handleSubmitDelete = async() => {
    try {
      const token = localStorage.getItem('token')
      const decoded = discriToken()
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await api.delete(`/post/deleta/${selectedImage}`, config)
      if(response.status === 201){
        notifySuccess('Deletado com sucesso')
        setLoadData(true)
      } else{
        throw new Error('Erro ao deletar')
      }
      setLoadData(false)
    } catch (error) {
      notifyError(error.message)
    }
  }

  const handleSubmitRegister = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      response = await api.post(
        `post/cadastro`,
        JSON.stringify(register),
        config
      );
      if (response.status === 200) {
        notifySuccess("Criado com sucesso");
        setLoadData(true)
        clearForm();
        setModal(false)
      } else {
        throw new Error("Erro ao criar fenomeno");
      }

      setLoadData(false)
    } catch (error) {
      notifyError(error.message);
    }
  };

  useEffect(() => {
    const decoded = discriToken()
    setRegister({
      ...register,
      idEspecialista: decoded.id_user,
    })
    getDataPosts();
  }, []);

  useEffect(() => {
    if(loadData){
      getDataPosts();
    }
  }, [loadData])

  useEffect(() => {
    if(selectedImage){
      setId(selectedImage)
    }
    console.log(selectedImage)
  }, [selectedImage])


  return (
    <div className="container-phenomena">
      {listPost?.length === 0 && (
        <div className="message-empty">Nenhum relatório encontrado</div>
      )}
      <h3>Relatórios</h3>
      <div>
        <Button color="primary" onClick={toggle}>
          Registrar
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>Registrar</ModalHeader>
          <ModalBody>
          <label>
              <span>Autor: </span>
              <input
                name="autor"
                type="text"
                placeholder="Autor"
                onChange={handleChangeRegister}
                required
              />
            </label>
            

            <label>
              <span>Data: </span>
              <input
                name="data"
                type="date"
                placeholder="Data"
                onChange={handleChangeRegister}
                required
              />
            </label>

            <label>
              <span>Texto: </span>
               <textarea className="border" name="texto"cols="50" rows="4" onChange={handleChangeRegister}></textarea >
            </label>

            <label>
              <span>Arquivo(Foto ou vídeo)</span>
              <input
                name="arquivo"
                type="file"
                placeholder="Foto/video"
                onChange={handleChangeRegisterFile}
                accept="video/*, image/*"
                required
              />
              {loading &&(
                <div className="text-center">
                  <Spinner animation="border" size="sm" />
                </div>
              )}
            </label>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmitRegister}>
              Confirmar
            </Button>
            <Button color="danger" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      <div className="content-phenomena">
        <div>
          {(listPost?.length > 0) && (
                listPost?.map((el, key) => {
                  return (
                    <div className={`response-posts ${selectedImage === el.id ? 'selected' : ''}`} onClick={(e) => handleClickImage(el.id)}>
                      <div key={key} className="images-posts">
                        <img
                          className={`image`}
                          src={`${el.arquivo}`}
                          alt=""    
                              
                        />
                      </div>
                      <div>
                        <div className="">
                          Autor: <span>{el.autor}</span>{" "}
                        </div>
                       
                        <div className="">
                          Data: <span>{el.data}</span>{" "}
                        </div>
                      
                        <div className="">
                          Texto: <span>{el.texto}</span>{" "}
                        </div>
                        <div className="d-flex">
                        <PublicationUpdate setLoadData={(e) => setLoadData(e)} id={selectedImage ? selectedImage : null}/>
                        <Button color="danger" onClick={handleSubmitDelete} disabled={selectedImage ? false : true}>Deletar</Button>
                        <Button color="info" onClick={(e) => window.open(el.arquivo)}>Visualizar</Button>
                        </div>                  
                      </div>
                    </div>
                  );
                })
              )}
        </div>
        
      </div>    
      <ToastContainer />
    </div>
  );
}
