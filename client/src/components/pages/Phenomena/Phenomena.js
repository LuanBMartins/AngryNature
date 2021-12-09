import React, { useState, useEffect } from "react";
import "./style.phenomena.css";
import api from "./../../../services/api";
import location from "./../../../utils/location.json";
import { ToastContainer, toast } from "react-toastify";
import PhenomenaUpdate from './PhenomenaUpdate'
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
    tipo: "",
    estado: "",
    cidade: "",
    data: "",
    horas: "",
    nivel: "",
    arquivo: "",
    idEspecialista: "",
    idUser: "",
  });

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [estado, setEstado] = useState({});
  const [selectedImage, setSelectedImage] = useState('');
  const [id, setId] = useState('');
  const [dataPhenomenonUser, setDataPhenomenonUser] = useState([]);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false)

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
      tipo: "",
      estado: "",
      cidade: "",
      data: "",
      horas: "",
      nivel: "",
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

  const handleChangeRegisterDateTime = (e) => {
    const dateTime = e.target.value.split("T");
    const date = dateTime[0];
    const time = `${dateTime[1]}:00`;
    setRegister({ ...register, data: date, horas: time });
  };

  const handleChangeRegister = (e) => {
    const name = e.target.name;
    setRegister({
      ...register,
      [name]: e.target.value,
    });
  };

  const getPhenomenaUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = discriToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (decoded.comum) {
        response = await api.get(
          `fenomeno/consulta/comum/${decoded.id_user}`,
          config
        );
      } else {
        response = await api.get(
          `fenomeno/consulta/especialista/${decoded.id_user}`,
          config
        );
      }

      if (response.status === 200) {
        setDataPhenomenonUser(response.data);
      } else {
        throw new Error("Erro ao buscar");
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  const handleSubmitDelete = async() => {
    try {
      const token = localStorage.getItem('token')
      const decoded = discriToken()
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await api.delete(`/fenomeno/deleta/${selectedImage}`, config)
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
      console.log(selectedImage)
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      response = await api.post(
        `fenomeno/cadastro`,
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

  const checkType = () => {
    const decoded = discriToken();
    return decoded.comum;
  };

  useEffect(() => {
    const decoded = discriToken();
    if (!decoded.comum) {
      setRegister({
        ...register,
        idEspecialista: decoded.id_user,
        idUser: null,
      });
    } else {
      setRegister({
        ...register,
        idUser: decoded.id_user,
        idEspecialista: null,
      });
    }
    getPhenomenaUsers();
  }, []);

  useEffect(() => {
    setEstado(location.estados[0]);
  }, []);

  useEffect(() => {
    if(loadData){
      getPhenomenaUsers();
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
      {dataPhenomenonUser?.length === 0 && (
        <div className="message-empty">Nenhum fenômeno encontrado</div>
      )}
      <h3>Fenomenos</h3>
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
              <span>Tipo: </span>
              <select
                name="tipo"
                placeholder="Tipo"
                value={register.tipo}
                onChange={(e) => {
                  setRegister((prev) => ({
                    ...prev,
                    tipo: e.target.value,
                  }));
                }}
                required
              >
                <option></option>
                {tipos.map((el, key) => {
                  return (
                    <option key={key} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
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
                    estado: e.target.value,
                  }));
                  setEstado(
                    location.estados.find((el) => el.sigla === e.target.value)
                  );
                }}
                required
              >
                <option></option>
                {location.estados.map((el, key) => {
                  return (
                    <option key={key} value={el.sigla}>
                      {el.sigla} - {el.nome}
                    </option>
                  );
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
                    cidade: e.target.value,
                  }));
                }}
                required
              >
                <option></option>
                {estado &&
                  estado?.cidades?.map((el, key) => {
                    return (
                      <option key={key} value={el}>
                        {el}
                      </option>
                    );
                  })}
              </select>
            </label>

            <label>
              <span>Data/hora: </span>
              <input
                name="data/hora"
                type="datetime-local"
                placeholder="Data/hora"
                onChange={handleChangeRegisterDateTime}
                required
              />
            </label>

            <label>
              <span>Nível: </span>
              <select
                name="nivel"
                placeholder="Nivel"
                value={register.nivel}
                onChange={(e) => {
                  setRegister((prev) => ({
                    ...prev,
                    nivel: e.target.value,
                  }));
                }}
                required
              >
                <option></option>
                {nivel?.map((el, key) => {
                  return (
                    <option key={key} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
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
          {(dataPhenomenonUser?.length > 0) && (
                dataPhenomenonUser?.map((el, key) => {
                  return (
                    <div className="response-phenomenon">
                      <div key={key} className="images-container">
                        <img
                          className={`image ${selectedImage === el.id ? 'selected' : ''}`}
                          src={`${el.arquivo}`}
                          alt=""    
                          onClick={(e) => handleClickImage(el.id)}       
                        />
                      </div>
                      <div>
                      <div className="">
                          Autor: <span>{el.autor}</span>{" "}
                        </div>
                        <div className="">
                          Tipo: <span>{el.tipo}</span>{" "}
                        </div>
                        <div className="">
                          Estado: <span>{el.estado}</span>{" "}
                        </div>
                        <div className="">
                          Cidade: <span>{el.cidade}</span>{" "}
                        </div>
                        <div className="">
                          Data: <span>{el.data}</span>{" "}
                        </div>
                        <div className="">
                          Hora: <span>{el.horas}</span>{" "}
                        </div>
                        <div className="">
                          Nível: <span>{el.nivel}</span>{" "}
                        </div>
                        <div className="d-flex">
                        <PhenomenaUpdate setLoadData={(e) => setLoadData(e)} id={selectedImage ? selectedImage : null}/>
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
