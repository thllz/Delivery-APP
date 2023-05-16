import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Header from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import './Products.css';
import ProductCard from '../../../components/ProductCard/ProductCard';

const useStyles = makeStyles({
  container: {
    top: '0px',
    display: 'flex',
    margin: 'auto',
    width: '100%',
  },
  containerSales: {
    marginTop: '100px',
    width: '90%',
    margin: 'auto',
  },
});

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [att, setAtt] = useState(0);
  const [totalCart, setTotalCart] = useState(0);
  const [isBtnCartDisabled, setIsBtnCartDisabled] = useState(true);
  const isInitialMount = useRef(true);
  const classes = useStyles();

  const navigate = useNavigate();

  const getProducts = async () => {
    const CODE_NOT_FOUND = 404;
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });
    await api.get('/products')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error.response === CODE_NOT_FOUND) return setIsLoading(true);
      });
  };

  useEffect(() => {
    const MS_TIME = 500;
    const processData = JSON.parse(localStorage.getItem('user'));
    switch (processData?.role) {
    case 'customer':
      navigate('/customer/products');
      getProducts();
      setTimeout(() => setIsLoading(false), MS_TIME);
      break;
    default: {
      localStorage.clear();
      navigate('/');
    }
    }
  }, [navigate]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const getPriceCart = JSON.parse(localStorage.getItem('cart')) || [];
      if (getPriceCart.length === 0) setTotalCart(0);
      else {
        const totalValues = getPriceCart.reduce((acc, cur) => acc + +cur.price, 0);
        setTotalCart(totalValues.toFixed(2));
        setIsBtnCartDisabled(false);
      }
    }
  }, [att]);

  return (
    <div className={ classes.container }>
      <Header customer />
      <div>
        {
          isLoading
            ? <Loading />
            : (
              <div>
                <Grid container spacing={ 4 } className={ classes.containerSales }>
                  {
                    data.map((product, i) => (
                      <Grid
                        sx={ { my: 1, mx: 'auto', maxWidth: 360 } }
                        key={ product.id }
                        item
                        xs={ 12 }
                        sm={ 6 }
                        md={ 4 }
                        lg={ 3 }
                      >
                        <ProductCard
                          key={ i }
                          product={ product }
                          att={ att }
                          setAtt={ setAtt }
                          setValidBtnCart={ setIsBtnCartDisabled }
                        />
                      </Grid>
                    ))
                  }
                </Grid>
              </div>
            )
        }
      </div>
      <Button
        className="cartButton"
        type="button"
        onClick={ () => navigate('/customer/checkout') }
        data-testid="customer_products__button-cart"
        disabled={ isBtnCartDisabled }
      >
        <ShoppingCartOutlinedIcon className="cartIcon" />
        <div>
          <span>
            R$
            { ' ' }
          </span>
          <span>
            { totalCart.toString().replace(/\./, ',') }
          </span>
        </div>
      </Button>
    </div>
  );
}
