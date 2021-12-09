import React, { useState, useEffect } from "react";
import "./style.phenomena.css";
import discriToken from "./../../../utils/discriToken";
import api from "./../../../services/api";
import location from "./../../../utils/location.json";
import { ToastContainer, toast } from "react-toastify";
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


export default function PhenomenaUpdate({...props}) {

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

  const [modal, setModal] = useState(false);
  const [estado, setEstado] = useState({});
  const [selectedImage, setSelectedImage] = useState('');
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const toggle = () => setModal(!modal);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

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


  const handleSubmitRegister = async (e) => {
    try {
      console.log(register)
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      response = await api.put(
        `fenomeno/atualiza/${props?.id}`,
        JSON.stringify(register),
        config
      );
      if (response.status === 200) {
        notifySuccess("Atualizado com sucesso");
        props?.setLoadData(true)
        setModal(false)
        clearForm();
      } else {
        throw new Error("Erro ao atualizar");
      }

      props?.setLoadData(false)
    } catch (error) {
      notifyError(error.message);
    }
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
  }, []);


  return (
    <div>
        <Button color="primary" onClick={toggle} disabled={props?.id ? false : true}>
          Atualizar
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>Atualizar</ModalHeader>
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
        <ToastContainer />
      </div>
  )
}
