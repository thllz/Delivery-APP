import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './Register.css';
import logoH from '../../../images/logoH.png';
import 'animate.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [elemErr, setElemErr] = useState(false);

  const navigate = useNavigate();

  const validateInput = (namR, emailR, pass) => {
    const stringEmail = /\S+@\S+\.\S+/;
    const limitador = 6;
    const nL = 10;
    const able = stringEmail.test(emailR) && pass.length >= limitador && namR.length > nL;
    if (able) setIsDisabled(false);
    else setIsDisabled(true);
  };
  const toLocalStorage = (response) => {
    localStorage.setItem('user', JSON.stringify(response));
  };
  const validateLogin = async () => {
    const CODE_NOT_FOUND = 409;
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });

    await api.post('/register', { name, email, password })
      .then(async () => {
        await api.post('/login', { email, password })
          .then((response) => {
            toLocalStorage(response.data);
            navigate('/customer/products');
          });
      })
      .catch((error) => {
        if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
      });
  };

  useEffect(() => {
    validateInput(name, email, password);
  }, [name, password, email]);

  return (
    <div className="mainDivRegister">
      <img className="logoH" src={ logoH } alt="logo chopee" />
      <p className="animate__animated animate__swing">Register</p>
      <div className="backDiv">
        <div className="divInputRegister">
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
        </div>
        <div className="divButtonsRegister">
          <Button
            className="btns"
            variant="outlined"
            type="button"
            onClick={ () => navigate('/login') }
          >
            Voltar
          </Button>
          <Button
            className="btns"
            variant="outlined"
            type="button"
            disabled={ isDisabled }
            onClick={ validateLogin }
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
}
