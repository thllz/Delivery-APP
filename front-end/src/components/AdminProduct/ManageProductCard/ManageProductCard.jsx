import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';

export default function ManageProductCard({ products, index }, editProduct) {
  return (
    <div>
      <Card
        className="CardItemsManagerProduct"
        key={ index }
      >
        <CardActionArea>
          <CardMedia
            image={ products.urlImage }
            src={ products.urlImage }
            className="CardMediaManagerProduct"
            alt="imagem do produto"
            aria-hidden="true"
          />
          <CardContent className="CardContentManagerProduct">
            <Typography
              className="CardTitleManagerProdut"
            >
              { products.name }
            </Typography>
            <Typography
              className="CardPriceManagerProdut"
              variant="body1"
            >
              R$
              { products.price.replace(/\./, ',') }
            </Typography>
            <Button
              value={ products.id }
              onClick={ () => editProduct.editProduct }
            >
              Selecionar
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
