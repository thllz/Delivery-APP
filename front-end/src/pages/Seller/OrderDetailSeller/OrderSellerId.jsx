import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Header from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import DetailCard from '../../../components/DetailCard/DetailCard';
import './OrderSellerId.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [preparing, setPreparing] = useState(false);
  const [dispatched, setDispatch] = useState(false);
  const { id } = useParams();
  const date = new Date(orders.saleDate);
  const formattedDate = date.toLocaleDateString('pt-BR', { timezone: 'UTC' });
  const CODE_NOT_FOUND = 409;
  const api = axios.create({
    baseURL: 'http://localhost:3001',
  });
  const { token } = JSON.parse(localStorage.getItem('user'));

  const testIds = {
    deliveryStatus: 'seller_order_details__element-order-details-label-delivery-status',
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const getOrders = async () => {
    await api.get(`/seller/orders/${id}`, { headers })
      .then((data) => { setOrders(data.data); })
      .catch((error) => {
        console.log(error);
        if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (orders.status === 'Pendente') {
      setPreparing(false);
    } else if (orders.status === 'Preparando') {
      setPreparing(true);
      setDispatch(false);
    } else {
      setDispatch(true);
      setPreparing(true);
    }
  }, [orders.status]);

  const handleStatus = async (status) => {
    await api.patch(`/seller/orders/${id}`, { status }, { headers })
      .then(() => { getOrders(); })
      .catch((error) => {
        console.log(error);
        if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
      });
  };
  return (
    <div className="divMainSellerId">
      <Header seller />
      {
        orders.length === 0
          ? <Loading />
          : (
            <div className="divMainInfo">
              <div className="divMainInfoSellerId">
                <Typography
                  className="sellerIdText"
                >
                  { `Pedido 000${orders.id}` }
                </Typography>
                <Typography
                  className="sellerIdDate"
                >
                  { `Data: ${formattedDate}` }
                </Typography>
                <Typography
                  className="sellerIdStatus"
                >
                  { `Status: ${orders.status}` }
                </Typography>
              </div>
              <div className="divBtnsSellerId">
                <Button
                  className="btnSellerId"
                  variant="outlined"
                  type="button"
                  onClick={ () => handleStatus('Preparando') }
                  disabled={ preparing }
                >
                  PREPARAR PEDIDO
                </Button>
                <Button
                  className="btnSellerId"
                  variant="outlined"
                  type="button"
                  onClick={ () => handleStatus('Em Trânsito') }
                  disabled={ dispatched }
                >
                  SAIU PARA ENTREGA
                </Button>
              </div>
              <TableRow>
                <TableHead>
                  <TableCell align="left">Item(s)</TableCell>
                  <TableCell align="left">Descrição</TableCell>
                  <TableCell align="center">Qntd.</TableCell>
                  <TableCell align="center">Valor Unitário</TableCell>
                  <TableCell align="center">Sub-total</TableCell>
                </TableHead>
                { orders.length !== 0
                  && orders.SaleProduct.map((order, index) => (
                    <DetailCard
                      key={ index }
                      cardInfo={ { order, index } }
                      seller
                    />
                  )) }
              </TableRow>
              <Typography
                className="totalPrice"
              >
                { `R$: ${orders.totalPrice.replace(/\./, ',')}` }
              </Typography>
            </div>
          )
      }
    </div>
  );
}

export default Orders;
