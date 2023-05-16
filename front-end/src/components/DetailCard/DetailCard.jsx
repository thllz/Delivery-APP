import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import './DetailCard.css';

function DetailCard(props) {
  const { cardInfo, index: i, customer, seller } = props;
  return (
    <div className="divMainDetailCard">
      { customer
        && (
          <div className="divTable">
            <TableRow>
              <TableBody className="tableBody">
                <TableCell className="cellIndex">
                  { i + 1 }
                </TableCell>
                <TableCell className="cellDesc">
                  { cardInfo.Products?.name }
                </TableCell>
                <TableCell className="cellQnty">
                  { cardInfo.quantity }
                  x
                </TableCell>
                <TableCell className="cellPriceUnit">{ `R$ ${Number(cardInfo.Products?.price).toFixed(2).replace(/\./, ',')}` }</TableCell>
                <TableCell className="cellSubTotalPrice">{ `R$ ${(Number(cardInfo.Products?.price) * cardInfo.quantity).toFixed(2).replace(/\./, ',')}` }</TableCell>
              </TableBody>
            </TableRow>
          </div>
        ) }

      { seller
        && (
          <div className="divTable">
            <TableRow>
              <TableBody className="tableBody">
                <TableCell className="cellIndex">
                  { cardInfo.index + 1 }
                </TableCell>
                <TableCell className="cellDesc">
                  { cardInfo.order.Products?.name }
                </TableCell>
                <TableCell className="cellQnty">
                  { cardInfo.order.quantity }
                  x
                </TableCell>
                <TableCell className="cellPriceUnit">{ `R$ ${Number(cardInfo.order.Products?.price).toFixed(2).replace(/\./, ',')}` }</TableCell>
                <TableCell className="cellSubTotalPrice">{ `R$ ${(Number(cardInfo.order.Products?.price) * cardInfo.order.quantity).toFixed(2).replace(/\./, ',')}` }</TableCell>
              </TableBody>
            </TableRow>
          </div>
        ) }
    </div>
  );
}

DetailCard.propTypes = {
  index: PropTypes.number.isRequired,
  customer: PropTypes.bool.isRequired,
  seller: PropTypes.bool.isRequired,
  cardInfo: PropTypes.shape({
    index: PropTypes.number,
    order: PropTypes.shape({
      Products: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }),
      quantity: PropTypes.number.isRequired,
    }),
    quantity: PropTypes.number,
    Products: PropTypes.shape,
    SaleProduct: PropTypes.shape({
      Products: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.string,
      }),
      quantity: PropTypes.number,
    }),
  }).isRequired,
};

export default DetailCard;
