import React, { useState, useEffect } from "react";
import "./style.phenomena.css";
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
} from "reactstrap";
import discriToken from "./../../../utils/discriToken";
import { useNavigate } from "react-router-dom";

export default function UserAccount({...props}) {
  const [update, setUpdate] = useState({
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
  const [dataTime, setDataTime] = useState("");

  const toggle = () => setModal(!modal);

  const [dataPhenomenonUser, setDataPhenomenonUser] = useState([]);
  const [dataPhenomenonType, setDataPhenomenonType] = useState([]);
  const [phenomenonType, , setPhenomenomType] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setUpdate({
      ...update,
      tipo: "",
      estado: "",
      cidade: "",
      data: "",
      horas: "",
      nivel: "",
      arquivo: "",
    });
  };

  const handleChangeUpdateFile = async (e) => {
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
    setUpdate({ ...update, arquivo: fileResponse });
    setLoading(false);
  };

  const handleChangeUpdateDateTime = (e) => {
    const dateTime = e.target.value.split("T");
    const date = dateTime[0];
    const time = `${dateTime[1]}:00`;
    setUpdate({ ...update, data: date, horas: time });
  };

  const handleChangeUpdate = (e) => {
    const name = e.target.name;
    setUpdate({
      ...update,
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

  const handleSubmitUpdate = async (e) => {
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
        `fenomeno/cadastro`,
        JSON.stringify(update),
        config
      );
      if (response.status === 200) {
        notifySuccess("Criado com sucesso");
        clearForm();
      } else {
        throw new Error("Erro ao criar fenomeno");
      }
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
      setUpdate({
        ...update,
        idEspecialista: decoded.id_user,
        idUser: null,
      });
    } else {
      setUpdate({
        ...update,
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
    console.log(file);
  }, [file]);

  return (
    <div className="container-phenomena">
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Registrar</ModalHeader>
        <ModalBody>
          <label>
            <span>Tipo: </span>
            <select
              name="tipo"
              placeholder="Tipo"
              value={update.tipo}
              onChange={(e) => {
                setUpdate((prev) => ({
                  ...prev,
                  tipo: e.target.value,
                }));
              }}
              required
            >
              <option></option>
              {props?.tipos.map((el, key) => {
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
              value={update.estado}
              onChange={(e) => {
                setUpdate((prev) => ({
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
              value={update.cidade}
              onChange={(e) => {
                setUpdate((prev) => ({
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
              onChange={handleChangeUpdateDateTime}
              required
            />
          </label>

          <label>
            <span>Nível: </span>
            <select
              name="nivel"
              placeholder="Nivel"
              value={update.nivel}
              onChange={(e) => {
                setUpdate((prev) => ({
                  ...prev,
                  nivel: e.target.value,
                }));
              }}
              required
            >
              <option></option>
              {props.nivel?.map((el, key) => {
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
              onChange={handleChangeUpdateFile}
              accept="video/*, image/*"
              required
            />
          </label>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmitUpdate}>
            Confirmar
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <div className="content-phenomena">
        <label className="update-phenomena">
          <h3>Fenomenos</h3>
          <Button color="primary" onClick={toggle}>
            Registrar
          </Button>
        </label>

        <div className="painel-phenomena">
          {dataPhenomenonUser?.length ? (
            dataPhenomenonUser?.map((el, key) => {
              return (
                <div className="response-phenomenon">
                  <div key={key} className="images-container">
                    <img
                      className="image"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/F5_tornado_Elie_Manitoba_2007.jpg/1200px-F5_tornado_Elie_Manitoba_2007.jpg"
                      alt=""
                    />
                  </div>
                  <div>
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
                    <Button color="secondary">Editar</Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Nenhum fenômeno encontrado</div>
          )}
        </div>
      </div>

      {/*  */}

      <ToastContainer />
    </div>
  );
}
