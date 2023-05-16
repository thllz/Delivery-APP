import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Header from '../../components/Header/Header';
import UsersCard from '../../components/AdminUsers/UsersCard';
import './AdminManager.css';

export default function AdminManager() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [elemErr, setElemErr] = useState(false);

  const fieldValidation = () => {
    const regexEmail = /\S+@\S+\.\S+/;
    const passLength = 6;
    const nameLength = 12;
    const test = regexEmail.test(email)
      && password.length >= passLength
      && name.length >= nameLength
      && role.length > 0;
    if (test) setIsDisabled(false);
    else setIsDisabled(true);
  };

  const getUsers = async () => {
    const CODE_NOT_FOUND = 409;
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = {
      'Content-Type': 'application/json',
      Authorization: user.token,
      role: user.role,
    };

    await api.get(
      '/admin/users',
      { headers },
    )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
      });
  };

  const callToApi = async () => {
    const CODE_NOT_FOUND = 409;
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = {
      'Content-Type': 'application/json',
      Authorization: user.token,
      role: user.role,
    };
    await api.post('/admin/register', { name, email, password, role }, { headers })
      .then(() => {
      })
      .catch((error) => {
        if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
      });
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    fieldValidation();
  }, [name, email, password, role]);

  return (
    <div className="mainDivPage">
      <Header admin />
      <div className="divMainAdmin">
        <div className="mainDivRegisterAdmin">
          <h2 className="textMain">Cadastrar um novo usuário</h2>
          <TextField
            required
            type="text"
            label="Nome"
            onChange={ ({ target: { value } }) => setName(value) }
            value={ name }
            placeholder="Digite seu nome completo"
          />
          <TextField
            required
            error={ elemErr }
            type="email"
            helperText={ elemErr && 'Email já cadastrado!' }
            label="Email"
            onChange={ ({ target: { value } }) => setEmail(value) }
            value={ email }
            placeholder="Digite seu email"
          />
          <TextField
            required
            type="password"
            label="Senha"
            helperText="Mínimo 6 caracteres"
            onChange={ ({ target: { value } }) => setPassword(value) }
            value={ password }
            placeholder="Digite sua senha"
          />
          <TextField
            className="selectTypeAdmin"
            onChange={ (event) => setRole(event.target.value) }
            defaultValue={ role[1] }
            label="Tipo"
            placeholder="Selecione um tipo"
            select
            required
          >
            <MenuItem value="administrator">Administrator</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </TextField>
          <Button
            type="button"
            disabled={ isDisabled }
            onClick={ callToApi }
          >
            Cadastrar
          </Button>
        </div>
        <div className="divListAdminScroll">
          <div className="divListUserAdmin">
            <h2 className="textMain">Lista de usuários</h2>
            { users.length === 0
              ? <h3>Sem usuários</h3>
              : users.map((user, i) => (
                <UsersCard
                  key={ user.id }
                  i={ i }
                  getUsers={ getUsers }
                  data={ user }
                />
              )) }
          </div>
        </div>
      </div>
    </div>
  );
}
