import PropTypes from 'prop-types';
import React from 'react';
import './OrderCard.css';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

export default function OrderCard(props) {
  const { cardInfo, seller, customer } = props;
  const { index, order } = cardInfo;
  const { totalPrice, deliveryAddress,
    deliveryNumber, status, saleDate } = order;

  const date = new Date(saleDate);

  const formattedDate = date.toLocaleDateString('pt-BR', { timezone: 'UTC' });

  const navigate = useNavigate();

  return (
    <div>
      { customer
        && (
          <div className="cardOrders">
            <Typography variant="h7">
              { `Pedido: 000${index + 1}` }
            </Typography>
            <Typography variant="h7">
              { `Status: ${status}` }
            </Typography>
            <Typography variant="h7">
              { `Data: ${formattedDate}` }
            </Typography>
            <Typography variant="h7">
              { `Valor total: R$ ${totalPrice.replace(/\./, ',')}` }
            </Typography>
            <Button
              type="button"
              onClick={ () => navigate(`/customer/orders/${order.saleId}`) }
            >
              Ver detalhes
            </Button>
          </div>
        ) }
      {
        seller
        && (
          <div>
            <div className="cardOrders">
              <Typography variant="h7">
                { `Pedido: 000${index + 1}` }
              </Typography>
              <Typography variant="h7">
                { `Status: ${status}` }
              </Typography>
              <Typography variant="h7">
                { `Data: ${formattedDate}` }
              </Typography>
              <Typography variant="h7">
                { `Valor total: R$ ${totalPrice.replace(/\./, ',')}` }
              </Typography>
              <Typography variant="h7">
                { `Endereço: ${deliveryAddress}` }
              </Typography>
              <Typography variant="h7">
                { `Número: ${deliveryNumber}` }
              </Typography>
              <Button
                type="button"
                onClick={ () => navigate(`/seller/orders/${order.id}`) }
              >
                Ver detalhes
              </Button>
            </div>
          </div>
        )
      }
    </div>
  );
}

OrderCard.propTypes = {
  customer: PropTypes.bool.isRequired,
  seller: PropTypes.bool.isRequired,
  cardInfo: PropTypes.shape({
    index: PropTypes.number,
    order: PropTypes.shape({
      deliveryAddress: PropTypes.string,
      deliveryNumber: PropTypes.number,
      id: PropTypes.number,
      saleDate: PropTypes.string,
      saleId: PropTypes.number,
      sellerId: PropTypes.number,
      status: PropTypes.string,
      totalPrice: PropTypes.string,
    }),
  }).isRequired,
};
