import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import './CartCard.css';

function Card({ index, product, removeItem }) {
  return (
    <tr className="divTr">
      <td
        className="gridCartElement"
      >
        { product.name }
      </td>
      <td
        className="gridCartElement"
      >
        { `${product.qty}x` }
      </td>
      <td
        className="gridCartElement"
      >
        { `R$ ${Number(product.unitPrice).toFixed(2).replace(/\./, ',')}` }
      </td>
      <td
        className="gridCartElement"
      >
        { `R$ ${(product.price).toFixed(2).replace(/\./, ',')}` }
      </td>
      <td>
        <Button
          type="button"
          className="remove-card"
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          onClick={ () => removeItem(index) }
        >
          <DeleteOutlinedIcon />
        </Button>
      </td>
    </tr>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    unitPrice: PropTypes.string.isRequired,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default Card;
