import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import OrderCard from '../../../components/OrderCard/OrderCard';
import Loading from '../../../components/Loading/Loading';
import './Orders.css';

function Orders() {
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
      await api.get('/seller/orders', { headers })
        .then((data) => { setAllOrders(data.data); })
        .catch((error) => {
          console.log(error);
          if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
        });
    };
    getOrders();
  }, []);

  useEffect(() => {
  }, [allOrders]);

  return (
    <div className="mainDivSellerOrders">
      <Header seller />
      {
        allOrders.length === 0
        && <Loading />
      }
      { allOrders && allOrders.map((order, index) => (
        <OrderCard
          seller
          key={ index }
          cardInfo={ { order, index } }
        />
      )) }
    </div>
  );
}

export default Orders;
