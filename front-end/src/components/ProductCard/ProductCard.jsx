import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';
import { CardActionArea, Card, CardContent, CardMedia, Typography,
  IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
  media: {
    paddingTop: '80.25%',
    objectFit: 'contain',
    margin: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '15px',
    height: '40px',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: '900',
    fontSize: '30px',
    letterSpacing: '2px',
    backgroundColor: '#353238ff',
    borderRadius: '20px',
    width: '75%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: '5px',
    color: '#f0c808ff',
    border: '2px solid #f0c808ff',
    fontFamily: 'Bebas Neue',
  },
  divInput: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
  },
  infos: {
    backgroundColor: '#e8e9f3ff',
    gap: '5px',
  },
}));

export default function ProductCard({ product, att, setAtt, setValidBtnCart }) {
  const [count, setCount] = useState(0);
  const classes = useStyles();
  const isInitialMount = useRef(true);

  const cartContainer = (counter) => {
    const MINUS_ONE = -1;
    const totalPrice = product.price * counter;
    const obj = {
      id: product.id,
      name: product.name,
      qty: counter,
      unitPrice: product.price,
      price: totalPrice,
      urlImage: product.urlImage,
    };
    const oldObj = JSON.parse(localStorage.getItem('cart')) || [];
    const indexObj = oldObj.indexOf(oldObj.find((c) => c.id === obj.id));
    if (indexObj !== MINUS_ONE) {
      oldObj[indexObj] = obj;
    } else oldObj.push(obj);
    localStorage.setItem('cart', JSON.stringify(oldObj));
  };

  const counter = (type) => {
    const PLUS_NUMBER = 1 + count;
    const MINUS_NUMBER = count - 1;
    if (type === 'plus' && count < 100) setCount(PLUS_NUMBER);
    if (type === 'minus' && count >= 1) setCount(MINUS_NUMBER);
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (isInitialMount.current) {
      cartItems.forEach((p) => {
        if (p.id === product.id) setCount(p.qty);
      });
      isInitialMount.current = false;
    } else {
      cartContainer(count);
      setAtt(att + 1);
      if (count === 0) {
        const newCartItems = cartItems.filter((c) => c.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        if (newCartItems.length === 0) setValidBtnCart(true);
      }
    }
  }, [count]);

  return (
    <Card className={ classes.root }>
      <CardActionArea>
        <CardMedia
          image={ product.urlImage }
          className={ classes.media }
          alt="imagem do produto"
          data-testid={ `customer_products__img-card-bg-image-${product.id}` }
          aria-hidden="true"
        />
        <CardContent className={ classes.infos }>

          <Typography
            className={ classes.title }
            data-testid={ `customer_products__element-card-title-${product.id}` }
          >
            { product.name }
          </Typography>
          <Typography
            className={ classes.price }
            variant="body1"
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            R$
            { product.price.replace(/\./, ',') }
          </Typography>
          <Typography className="amount">Quantidade</Typography>
          <div className={ classes.divInput }>
            <IconButton
              aria-label="subtract"
              onClick={ () => counter('minus') }
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            >
              <Remove />
            </IconButton>

            <Typography
              variant="h4"
              size="md"
              placeholder="Medium"
              id="quantity"
              label="Quantity"
              type="number"
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              onChange={ ({ target }) => setCount(target.value) }
            >
              {count}

            </Typography>
            <IconButton
              type="button"
              onClick={ () => counter('plus') }
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
            >
              <Add />
            </IconButton>
          </div>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    urlImage: PropTypes.string,
    name: PropTypes.string,
  }),
  i: PropTypes.number,
}.isRequired;
