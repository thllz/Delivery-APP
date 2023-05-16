import React from 'react';
import PropTypes from 'prop-types';
import './UsersCard.css';
import axios from 'axios';
import { Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function UsersCard({ data, i, getUsers }) {
  const { id, name, email, role } = data;

  const deleteUser = async (idUser) => {
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = {
      'Content-Type': 'application/json',
      Authorization: user.token,
      role: user.role,
      userId: idUser,
    };
    await api.delete(
      '/admin/users',
      { headers },
    );
    getUsers();
  };

  return (
    <tr className="divCardUsers">
      <td>
        { i }
      </td>
      <td>
        { name }
      </td>
      <td>
        { email }
      </td>
      <td>
        { role }
      </td>
      <Button
        style={ { color: '#DC143C' } }
        className="remove-card"
        type="button"
        value={ id }
        // onClick={ (event) => deleteUser(event.target) }
      >
        <DeleteOutlinedIcon onClick={ () => deleteUser(id) } />
      </Button>
    </tr>
  );
}

UsersCard.propTypes = {
  i: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
}.isRequired;
