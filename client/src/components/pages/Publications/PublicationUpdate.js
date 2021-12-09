import React, { useState, useEffect } from "react";
import "./style.publications.css";
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
    texto: "",
    data: "", 
    arquivo: "",
    idEspecialista: "",
  });

  const [modal, setModal] = useState(false);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const toggle = () => setModal(!modal);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);


  const clearForm = () => {
    setRegister({
      ...register,
      autor: "",
      texto: "",
      data: "", 
      arquivo: "",
      idEspecialista: "",
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


  const handleChangeRegister = (e) => {
    const name = e.target.name;
    setRegister({
      ...register,
      [name]: e.target.value,
    });
  };


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
      response = await api.put(
        `post/atualiza/${props?.id}`,
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
      });
    } 
  }, []);


  return (
    <div>
        <Button color="primary" onClick={toggle} disabled={props?.id ? false : true}>
         Atualizar
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
        <ToastContainer />
      </div>
  )
}
