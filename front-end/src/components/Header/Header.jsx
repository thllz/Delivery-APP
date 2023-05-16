import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Toolbar, Box, Button, Typography } from '@mui/material';
import './Header.css';

export default function Header({ customer, seller, admin }) {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear('data');
    navigate('/');
  };

  React.useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    setUser(localStorageData);
  }, []);

  return (
    <div className="mainDivHeader">
      <Toolbar sx={ { justifyContent: 'space-between', width: '100%' } }>
        <Box sx={ { display: 'flex', alignItems: 'center' } }>
          { customer && (
            <Button
              className="btnHeader"
              variant="text"
              size="large"
              onClick={ () => navigate('/customer/products') }
            >
              PRODUTOS
            </Button>
          ) }
          { customer && (
            <Button
              className="btnHeader"
              variant="text"
              size="large"
              onClick={ () => navigate('/customer/orders') }
            >
              MEUS PEDIDOS
            </Button>
          ) }
          { seller && (
            <Button
              className="btnHeader"
              variant="text"
              size="large"
              onClick={ () => navigate('/seller/orders') }
            >
              PEDIDOS
            </Button>
          ) }
          { admin && (
            <div className="divBtnsAdminHeader">
              <Button
                className="btnHeader"
                variant="text"
                size="large"
                onClick={ () => navigate('/admin/manage') }
              >
                GERENCIAR USUÁRIOS
              </Button>
              <Button
                className="btnHeader"
                variant="text"
                size="large"
                onClick={ () => navigate('/admin/manage/products') }
              >
                GERENCIAR PRODUTOS
              </Button>
            </div>
          ) }
        </Box>
        <Box sx={ { display: 'flex', alignItems: 'center' } }>
          <Typography
            className="userNameText"
            variant="h6"
          >
            { user.name }
          </Typography>
          <Button
            variant="outlined"
            onClick={ logout }
            className="btnLogout"
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </div>
  );
}

Header.propTypes = {
  customer: PropTypes.bool,
  seller: PropTypes.bool,
  admin: PropTypes.bool,
}.isRequired;
