import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import OrderCard from '../../../components/OrderCard/OrderCard';
import Loading from '../../../components/Loading/Loading';
import './Orders.css';

function CustomerOrders() {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    const getOrders = async () => {
      const CODE_NOT_FOUND = 409;
      const api = axios.create({
        baseURL: 'http://localhost:3001',
      });
      await api.get('/customer/orders', { headers })
        .then((data) => { setAllOrders(data.data); })
        .catch((error) => {
          console.log(error);
          if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
        });
    };
    getOrders();
  }, []);

  return (
    <div>
      <Header customer />
      {
        allOrders.length === 0
        && <Loading />
      }
      <div className="mainDivOrders">
        { allOrders && allOrders.map((order, index) => (
          <OrderCard
            customer
            key={ index }
            cardInfo={ { order, index } }
          />
        )) }
      </div>
    </div>
  );
}

export default CustomerOrders;
