import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Button, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Header from '../../../components/Header/Header';
import DetailCard from '../../../components/DetailCard/DetailCard';
import Loading from '../../../components/Loading/Loading';
import './OrderDetails.css';

function CustomerOrdersDetails() {
  const [order, setOrder] = useState({});
  const [isDelivered, setIsDelivered] = useState(true);
  const { pathname } = useLocation();
  const { id } = useParams();

  const date = new Date(order?.saleDate);
  const formattedDate = date.toLocaleDateString('pt-BR', { timezone: 'UTC' });

  const { token } = JSON.parse(localStorage.getItem('user'));

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const api = axios.create({
    baseURL: 'http://localhost:3001',
  });

  const getOrders = async () => {
    const CODE_NOT_FOUND = 409;
    await api.get(pathname, { headers })
      .then((response) => {
        setOrder(response.data);
        if (
          response.data.status === 'Em Trânsito') setIsDelivered(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (order.status === 'Entregue') {
      setIsDelivered(true);
    }
  }, [order.status]);

  const handleStatus = async () => {
    await api.patch(`/seller/orders/${id}`, { status: 'Entregue' }, { headers })
      .catch((error) => {
        console.log(error);
        if (error.response.status === CODE_NOT_FOUND) return setElemErr(true);
      });
    getOrders();
  };

  return (
    <div className="mainDivDetails">
      <Header customer />
      <div className="divDetailsOrder">
        <h2 className="detailsText">
          Detalhes do Pedido
        </h2>
        {
          order?.SaleProduct?.length > 0
            ? (
              <div className="infoDetails">
                <div className="orderHeader">
                  <h4>
                    <span>
                      PEDIDO 000
                    </span>
                    <span>
                      { order.id }
                    </span>
                  </h4>
                  <label
                    htmlFor="seller"
                  >
                    { 'Vendedor: ' }
                    <Typography
                      variant="h7"
                    >
                      { `${order.sellers?.name}` }
                    </Typography>
                  </label>
                  <label
                    htmlFor="data"
                  >
                    { 'Data: ' }
                    <Typography
                      variant="h7"
                    >
                      { formattedDate }
                    </Typography>
                  </label>
                  <label
                    htmlFor="status"
                  >
                    { 'Status: ' }
                    <Typography
                      variant="h7"
                    >
                      { order.status }
                    </Typography>
                  </label>
                  <Button
                    variant="outlined"
                    type="button"
                    className="btnDelivered"
                    disabled={ isDelivered }
                    onClick={ handleStatus }
                  >
                    MARCAR COMO ENTREGUE
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
                  { (order.SaleProduct).map((e, i) => (
                    <DetailCard key={ i } cardInfo={ e } index={ i } customer />
                  )) }
                </TableRow>
              </div>
            )
            : <Loading />
        }
        <div
          className="totalPrice"
        >
          { `Total R$ ${order?.totalPrice?.replace(/\./, ',')}` }
        </div>
      </div>
    </div >
  );
}

export default CustomerOrdersDetails;
