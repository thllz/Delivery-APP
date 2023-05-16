import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [selledList, setSelledList] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassWord = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleName = ({ target: { value } }) => {
    setName(value);
  };

  const sumOrderList = useCallback(() => {
    const sum = orderList.reduce((acc, { unitPrice, qty }) => {
      const ctotal = unitPrice * qty;
      return acc + ctotal;
    }, 0);
    setTotal(Number((sum).toFixed(2)));
  }, [orderList]);

  const handleOrders = (data) => setOrderList(data);

  const handleOrderList = useCallback((index) => {
    const newList = [...orderList];
    newList.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(newList));
    setOrderList(newList);
  }, [orderList]);

  const validateRegister = (namR, emailR, pass) => {
    const stringEmail = /\S+@\S+\.\S+/;
    const limitador = 6;
    const nL = 12;
    const able = stringEmail.test(emailR) && pass.length >= limitador && namR.length > nL;
    return able;
  };

  useEffect(() => {
    const newList = orderList.map((item) => {
      const { id, qty } = item;
      return { id, qty };
    });
    setSelledList(newList);
  }, [orderList]);

  const value = useMemo(() => (
    {
      email,
      password,
      name,
      orderList,
      total,
      selledList,
      products,
      setProducts,
      handleEmail,
      handlePassWord,
      handleName,
      validateRegister,
      handleOrderList,
      handleOrders,
      sumOrderList,
    }), [email,
    password,
    name,
    orderList, total, selledList, products, handleOrderList, sumOrderList, setProducts]);

  return (
    <MyContext.Provider value={ value }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default MyProvider;
