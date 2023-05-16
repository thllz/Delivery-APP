import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logoH from '../../../images/logoH.png';
import 'animate.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [elemErr, setElemErr] = useState(false);

  const stringEmail = /\S+@\S+\.\S+/;
  const limitador = 6;
  const able = stringEmail.test(email) && password.length >= limitador;

  const navigate = useNavigate();

  const toLocalStorage = (response) => {
    localStorage.setItem('user', JSON.stringify(response));
  };

  const validateLogin = async () => {
    const CODE_NOT_FOUND = 404;
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });

    await api.post('/login', { email, password })
      .then((response) => {
        toLocalStorage(response.data);
        switch (response.data.role) {
        case 'administrator':
          navigate('/admin/manage');
          break;
        case 'seller':
          navigate('/seller/orders');
          break;
        default: navigate('/customer/products');
        }
      })
      .catch((error) => {
        if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
      });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    switch (user.role) {
    case 'administrator':
      navigate('/admin/manage');
      break;
    case 'seller':
      navigate('/seller/orders');
      break;
    case 'customer':
      navigate('/customer/products');
      break;
    default:
      navigate('/login');
    }
  }, []);

  return (
    <div className="mainDivLogin">
      <img className="logoH" src={ logoH } alt="logo chopee" />
      <p className="animate__animated animate__swing">Login</p>
      <div className="backDiv">
        <div className="divInputLogin">
          <TextField
            required
            error={ elemErr }
            type="email"
            label="Email"
            onChange={ ({ target: { value } }) => setEmail(value) }
            value={ email }
            data-testid="common_login__input-email"
            placeholder="Digite seu email"
          />
          <TextField
            required
            error={ elemErr }
            helperText={ elemErr && 'Email ou senha inválidos' }
            type="password"
            label="Senha"
            onChange={ ({ target: { value } }) => setPassword(value) }
            value={ password }
            data-testid="common_login__input-password"
            placeholder="Digite sua senha"
          />
        </div>
        <div className="divButtonsLogin">
          <Button
            className="btns"
            variant="outlined"
            data-testid="common_login__button-login"
            type="button"
            disabled={ !able }
            onClick={ validateLogin }
          >
            Acessar
          </Button>
          <Button
            className="btns"
            variant="outlined"
            data-testid="common_login__button-register"
            type="button"
            onClick={ () => navigate('/register') }
          >
            Registrar
          </Button>
        </div>
      </div>
    </div>
  );
}
