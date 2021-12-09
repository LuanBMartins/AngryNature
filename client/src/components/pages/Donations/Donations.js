import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./style.donations.css";
import api from "./../../../services/api";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import discriToken from "./../../../utils/discriToken";

export default function Doacoes() {
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("email")));
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState('')
  const [register, setRegister] = useState({
    nome: "",
    email: email,
    data: "",
    valor: "",
    ong: "",
    idEspecialista: "",
    idUser: "",
  });

  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const [load, setLoad] = useState(false);

  const dateRef = useRef();

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  // const mock =  [
  //  {
  //   data: "2021-12-09",
  //   email: "carlos@email.com",
  //   id: 6,
  //   idEspecialista: 1,
  //   idUser: null,
  //   nome: "Carlos",
  //   ong: "Mercy Cops",
  //   valor: 200.5,
  // }, 
  // {
  //   data: "2021-12-08",
  //   email: "carlos@email.com",
  //   id: 5,
  //   idEspecialista: 1,
  //   idUser: null,
  //   nome: "Carlos",
  //   ong: "Mercy Cops",
  //   valor: 200.5,
  // },
  // {
  //   data: "2021-12-04",
  //   email: "carlos@email.com",
  //   id: 4,
  //   idEspecialista: 1,
  //   idUser: null,
  //   nome: "Carlos",
  //   ong: "Mercy Cops",
  //   valor: 200.5,
  // },
  // {
  //   data: "2021-12-03",
  //   email: "carlos@email.com",
  //   id: 3,
  //   idEspecialista: 1,
  //   idUser: null,
  //   nome: "Carlos",
  //   ong: "Mercy Cops",
  //   valor: 200.5,
  // },
  // {
  //   data: "2021-12-02",
  //   email: "carlos@email.com",
  //   id: 2,
  //   idEspecialista: 1,
  //   idUser: null,
  //   nome: "Carlos",
  //   ong: "Mercy Cops",
  //   valor: 200.5,
  // },
  // {
  //   data: "2021-12-02",
  //   email: "carlos@email.com",
  //   id: 1,
  //   idEspecialista: 1,
  //   idUser: null,
  //   nome: "Carlos",
  //   ong: "Mercy Cops",
  //   valor: 200.5,
  // },

  // ]
  const ong = [
    "Mercy Cops",
    "ICRC",
    "Medico sem fronteiras",
    "BRAC",
    "IPAM",
    "Greenpeace Brasil",
    "IPÊ",
  ];

  const clearForm = () => {
    setRegister({
      ...register,
      nome: '',
      valor: '',
      ong: '',
    })
  }

  const checkType = () => {
    const decoded = discriToken();
    return decoded.comum;
  };


  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmitClear = (e) => {
    setSearch('')
    setIsSearch(false)
  }

  const handleSubmitSearch = (e) => {
    const dateSearch = new Date(search).getTime();
    const date = data.map((el) => {
      return new Date(el.data).getTime();
    });

    const result = date
      .filter((el) => el <= dateSearch)
      .map((el) => new Date(el).toISOString().slice(0, 10));

    const findDates = data.reduce((acc, item) => {
      const temp = result?.find((el) => el === item.data);
      if (temp) {
        acc.push(item);
      }
      return acc;
    }, []);

    setResultSearch(findDates ? findDates : 'Não encontrado')

    
  };

  const handleChangeRegister = (e) => {
    const name = e.target.name;

    setRegister({
      ...register,
      [name]: e.target.value,
    });
  };

  const getDataDonations = async () => {
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
        response = await api.get(`doacao/comum/${decoded.id_user}`, config);
      } else {
        response = await api.get(`doacao/especialista/${decoded.id_user}`, config ); 
      }
      
      if (response.status === 200) {
        setData(response.data.reverse());
      } else {
        throw new Error("Erro ao buscar");
      }
    } catch (error) {
      notifyError(error.message);
    }
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
      response = await api.post(
        `doacao/doar/`,
        JSON.stringify(register),
        config
      );
      if (response.status === 200) {      
        notifySuccess("Doação criada com sucesso");
        setLoad(true)
      } else {
        throw new Error("Erro ao doar");
      }
      
      clearForm();
      setLoad(false)
      setModal(false)
    } catch (error) {
      notifyError(error.message);
    }
  };

  useEffect(() => {
    const decoded = discriToken();
    const date = new Date();
    const str = date.toISOString().slice(0, 10);

    if (!decoded.comum) {
      console.log('teste1')
      setRegister({
        ...register,
        idEspecialista: decoded.id_user,
        idUser: null,
        data: str
      });
    } else {
      console.log('teste2')
      setRegister({
        ...register,
        idUser: decoded.id_user,
        idEspecialista: null,
        data: str
      });
    }
    getDataDonations();
  }, []);

  useEffect(() => {
    if(load){
      getDataDonations();
    }
  }, [load])

  useEffect(() =>{
    if(resultSearch?.length){
      setIsSearch(true)
    }
    
  }, [resultSearch])

  useEffect(() =>{
    console.log(register)
  }, [register])
 
  return (
    <div className="container-donations">
      <div>
        {data?.length > 0 ? (
          <>
            <div className="donation-search">
              <input type="date"  value={search} onChange={handleChangeSearch} />
              <div className="search-button" onClick={handleSubmitSearch}>
                <SearchIcon fontSize="large" />
              </div>
              { isSearch && (
                <div className="search-button" onClick={handleSubmitClear}>
                  <ClearIcon fontSize="large" style={{background: "tomato"}}/>
                </div>
              )

              }
            </div>
            <div className="content-donation">
              {isSearch && (
                <table>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Ong</th>
                  </tr>
                  {resultSearch?.map((el, key) => {
                    return (
                      <tr key={key}>
                        <td>{el.nome}</td>
                        <td>{el.email}</td>
                        <td>{el.data}</td>
                        <td>{el.valor.toFixed(2)}</td>
                        <td>{el.ong}</td>
                      </tr>
                    );
                  })}
                </table>
              )}
              {!isSearch && (
                <table>
                 <tr>
                   <th>Nome</th>
                   <th>Email</th>
                   <th>Data</th>
                   <th>Valor</th>
                   <th>Ong</th>
                 </tr>
                 {data?.map((el, key) => {
                   return (
                     <tr key={key}>
                       <td>{el.nome}</td>
                       <td>{el.email}</td>
                       <td>{el.data}</td>
                       <td>{el.valor.toFixed(2)}</td>
                       <td>{el.ong}</td>
                     </tr>
                   );
                 })}
               </table>
              )}
             
            </div>
          </>
        ) : (
          <div>Nenhuma doação encontrada</div>
        )}

        <div className="button-donation">
          <Button color="primary" onClick={toggle}>
            Doar
          </Button>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Doar</ModalHeader>
            <ModalBody>
              <label>
                <span>Nome: </span>
                <input
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  value={register.nome}
                  onChange={handleChangeRegister}
                  autocomplete="off"
                  required
                />
              </label>

              <label>
                <span>Email: </span>
                <input
                  disabled={true}
                  autocomplete="off"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={register.email}
                  onChange={handleChangeRegister}
                  required
                />
              </label>

              <label>
                <span>Data: </span>
                <input
                  ref={dateRef}
                  name="data"
                  type="date"
                  placeholder="Data"
                  value={register.data}
                  onChange={handleChangeRegister}
                  disabled={true}
                />
              </label>
              <label>
                <span>Valor: </span>
                <input
                  name="valor"
                  type="number"
                  step="0.01"
                  placeholder="Valor"
                  value={register.valor}
                  onChange={handleChangeRegister}
                  required
                />
              </label>

              <label>
                <span>Ong: </span>
                <select
                  name="ong"
                  placeholder="ong"
                  value={register.ong}
                  onChange={(e) => {
                    setRegister((prev) => ({
                      ...prev,
                      ong: e.target.value,
                    }));
                  }}
                  required
                >
                  <option></option>
                  {ong.map((el, key) => {
                    return (
                      <option key={key} value={el}>
                        {el}
                      </option>
                    );
                  })}
                </select>
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
      </div>
      <ToastContainer />
    </div>
  );
}
