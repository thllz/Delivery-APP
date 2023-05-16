import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@mui/material';
import Card from '../../../components/CartCard/CartCard';
import contexto from '../../../context/MyContext';
import { requestData, sendRequest, setToken } from '../../../api/services';
import Header from '../../../components/Header/Header';
import './CartOrder.css';

function Order() {
  const { orderList,
    handleOrderList,
    handleOrders,
    total, sumOrderList, selledList } = useContext(contexto);
  const [seller, setSeller] = useState([]);
  const [user, setUser] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [saled, setSale] = useState({
    userId: 0,
    sellerId: 0,
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    status: 'Pendente',
  });

  const navigate = useNavigate();

  const handleSale = ({ target }) => {
    const { name, value } = target;
    setSale({ ...saled, [name]: value });
  };

  const handleNumeric = ({ target }) => {
    const { name, value } = target;
    setSale({ ...saled, [name]: Number(value) });
  };

  const getSeller = async (endpoint) => {
    const sellers = await requestData(endpoint);
    setSeller(sellers);
  };

  const finishOrder = async () => {
    const header = {
      'Content-Type': 'application/json',
      Authorization: user.token,
    };
    const endpoint = '/customer/orders';
    const body = { sale: saled, products: selledList };
    const response = await sendRequest(endpoint, body, { headers: header });
    localStorage.removeItem('cart');
    navigate(`/customer/orders/${response.id}`);
  };

  useEffect(() => {
    const endpoint = '/seller';
    getSeller(endpoint);
    const allCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const userObj = JSON.parse(localStorage.getItem('user')) || [];
    setUser(userObj);
    handleOrders(allCartItems);
  }, []);

  useEffect(() => {
    setSale({ ...saled, totalPrice: total, userId: user?.id });
  }, [user, total, seller]);

  useEffect(() => {
    sumOrderList();
  }, [orderList]);

  useEffect(() => {
    if (saled.deliveryAddress !== ''
      && saled.deliveryNumber > 0
      && saled.sellerId !== 0) setIsDisabled(false);
    else setIsDisabled(true);
  }, [saled]);

  useEffect(() => {
    (async () => {
      const { token } = JSON.parse(localStorage.getItem('user')) || [];
      if (!token) return navigate('/login');

      setToken(token);
    })();
  }, [navigate]);

  return (
    <div>
      <Header customer />
      <div className="mainDiv">
        <h1 className="cartName">Carrinho</h1>
        <table className="table">
          <tbody className="tbody">
            <tr className="textColumns">
              <th className="gridCartElement">Descrição</th>
              <th className="gridCartElement">Quantidade</th>
              <th className="gridCartElement">Valor Unitário</th>
              <th className="gridCartElement">Sub-total</th>
            </tr>
            { orderList.map((item, i) => (
              <Card
                key={ i }
                product={ item }
                index={ i }
                removeItem={ handleOrderList }
              />
            )) }
          </tbody>
        </table>
        <h2
          className="totalPrice"
          name="totalPrice"
        >
          Total: R$
          { ' ' }
          { total.toFixed(2).replace(/\./, ',') }
        </h2>
        <h2 className="deliveryInfo">Detalhes e Endereço para Entrega</h2>
        <div className="sellerInfo">
          <TextField
            className="selectTypeSeller"
            onChange={ handleNumeric }
            label="Vendedor"
            placeholder="Selecione um tipo"
            name="sellerId"
            select
            required
          >
            { seller.length === 0 && <option>Carregando...</option> }
            { seller.map((item, i) => (
              <MenuItem key={ i } value={ item.id }>{ item.name }</MenuItem>
            )) }
          </TextField>
          <TextField
            className="inputAddress"
            required
            type="text"
            name="deliveryAddress"
            label="Endereço"
            placeholder="Endereço"
            helperText="Ex: Rua Maria Joaquina"
            onChange={ (event) => handleSale(event) }
            value={ saled.deliveryAddress }
          />
          <TextField
            className="inputAddress"
            required
            type="number"
            name="deliveryNumber"
            label="Número"
            helperText="Ex: 90"
            placeholder="Número da residência"
            onChange={ (event) => handleNumeric(event) }
            value={ saled.deliveryNumber }
          />
          <Button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ () => finishOrder() }
            disabled={ isDisabled }
          >
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Order;
