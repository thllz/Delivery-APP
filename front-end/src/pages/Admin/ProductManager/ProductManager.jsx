import React, { useState, useEffect } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  Box, Button, Card, CardActionArea, CardContent, CardMedia, Modal, TextField, Typography,
} from '@mui/material';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import './ProductManager.css';
import {
  CardItemsManagerProduct, style, styleInfoCardEdit, styleInput, styleInputsEdit,
  styleTitle, productsListManageProduct, CardMediaManagerProduct,
  CardContentManagerProduct, styleButtonCardManageProduct, cardContentAreaManageProduct,
  styleBoxManageProduct, boxButtonsCardManageProduct, styleConfirmationModal,
  successUpdateProduct,
} from './ProductManagerMUI';

export default function UserManager() {
  const [productSearch, setProductsSearch] = useState([]);
  const [confirmationModalState, setConfirmationModalState] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [editModalIdOpenState, setEditModalIdOpenState] = useState(false);
  const [search, setSearch] = useState([]);
  const [idProductToEdit, setIdProductToEdit] = useState(0);
  const [productToEdit, setProductToEdit] = useState(0);
  const [nameProdEdit, setNameProdEdit] = useState('');
  const [priceProdEdit, setPriceProdEdit] = useState('');
  const [urlImageProdEdit, setUrlImageProdEdit] = useState('');
  const [products, setProducts] = useState();
  const [updated, setUpdated] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(0);
  const [isDisabledUpdateBtn, setIsDisabledUpdateBtn] = useState(true);

  const confirmationModalOpen = () => setConfirmationModalState(true);
  const confirmationModalClose = () => setConfirmationModalState(false);
  const editIdModalOpen = () => setEditModalIdOpenState(true);
  const editIdModalClose = () => setEditModalIdOpenState(false);
  const addProductModalOpen = () => setAddProductModal(true);
  const addProductModalClose = () => setAddProductModal(false);

  const searchProduct = (value) => {
    setSearch(value);
    const filter = products
      .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()));
    setProductsSearch(filter);
  };

  const editProduct = (idProduct) => {
    editIdModalOpen();
    const prod = products.find((p) => p.id === +idProduct);
    setProductToEdit(prod);
    setIdProductToEdit(idProduct);
  };

  const api = axios.create({ baseURL: 'http://localhost:3001' });

  const getProducts = async () => {
    await api.get('/products')
      .then((response) => {
        setProducts(response.data);
        setProductsSearch(response.data);
      });
  };

  const deleteProduct = async () => {
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const header = {
      'Content-Type': 'application/json',
      Authorization: user.token,
      role: user.role,
      idToDelete: productIdToDelete,
    };
    await api.delete('admin/manage/products', { headers: header })
      .then(() => {
        getProducts();
      });
  };

  const deleteBtnModal = async () => { deleteProduct(); confirmationModalClose(); };

  const deleteProductConfirm = async (idProduct) => {
    setProductIdToDelete(idProduct);
    confirmationModalOpen();
  };

  const setProduct = async (id) => {
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const header = {
      'Content-Type': 'application/json',
      Authorization: user.token,
      role: user.role,
    };
    const body = { id, name: nameProdEdit, price: priceProdEdit, url: urlImageProdEdit };
    await api.patch('/admin/manage/products', body, { headers: header })
      .then(() => {
        setUpdated(true);
        getProducts();
      });
  };

  const addProduct = async () => {
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const header = {
      'Content-Type': 'application/json',
      Authorization: user.token,
      role: user.role,
    };
    const body = { name: nameProdEdit, price: +priceProdEdit, url: urlImageProdEdit };
    await api.put('/admin/manage/product', body, { headers: header })
      .then((response) => {
        const OK_STATUS = 200;
        setNameProdEdit('');
        setPriceProdEdit(0);
        setUrlImageProdEdit('');
        getProducts();
        if (response.status === OK_STATUS) setUpdated(true);
        else setUpdated(false);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const MIN_LENGTH_TEXT = 5;
    const validName = nameProdEdit.length >= MIN_LENGTH_TEXT;
    const validPrice = priceProdEdit > 0;
    const validUrl = urlImageProdEdit !== '';

    if (validName && validPrice && validUrl) setIsDisabledUpdateBtn(false);
    else setIsDisabledUpdateBtn(true);
  }, [nameProdEdit, priceProdEdit, urlImageProdEdit]);

  useEffect(() => {
    setNameProdEdit('');
    setPriceProdEdit(0);
    setUrlImageProdEdit('');
  }, [updated]);

  return (
    <div className="mainDivManageProduct">
      <Header admin />
      <div className="divBtnsManageProduct">
        <Button
          className="btnManageProduct"
          type="text"
          variant="outlined"
          onClick={ addProductModalOpen }
        >
          Adicionar produto
        </Button>
        <Modal open={ confirmationModalState } onClose={ confirmationModalClose }>
          <Box sx={ styleConfirmationModal }>
            <Typography variant="h6" component="h2" sx={ styleTitle }>
              Você tem certeza?
            </Typography>
            <Button
              type="text"
              variant="outlined"
              onClick={ () => setConfirmationModalState(false) }
            >
              CANCELAR
            </Button>
            <Button
              type="text"
              variant="outlined"
              color="warning"
              onClick={ () => deleteBtnModal() }
            >
              DELETAR
            </Button>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal open={ addProductModal } onClose={ addProductModalClose }>
          <Box sx={ style }>
            <Typography variant="h6" component="h2" sx={ styleTitle }>
              Adicionar um novo produto
            </Typography>
            <TextField
              type="text"
              label="Nome"
              onChange={ ({ target: { value } }) => setNameProdEdit(value) }
              value={ nameProdEdit }
              sx={ styleInput }
              helperText={ productToEdit.name }
              placeholder="Digite um novo nome"
            />
            <TextField
              type="number"
              label="Preço"
              onChange={ ({ target: { value } }) => setPriceProdEdit(value) }
              value={ priceProdEdit }
              sx={ styleInput }
              placeholder="Digite um novo valor (SOMENTE NÚMEROS)"
              helperText={ productToEdit.price }
            />
            <TextField
              type="text"
              label="URL da imagem"
              onChange={ ({ target: { value } }) => setUrlImageProdEdit(value) }
              value={ urlImageProdEdit }
              sx={ styleInput }
              placeholder="Digite um novo valor"
              helperText={ productToEdit.urlImage }
            />
            <Button
              type="button"
              onClick={ () => addProduct() }
              variant="outlined"
              color="success"
              disabled={ isDisabledUpdateBtn }
            >
              Atualizar
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={ addProductModalClose }
            >
              Voltar
            </Button>
            <Typography
              variant="h6"
              component="h2"
              color="success"
              sx={ successUpdateProduct }
            >
              { updated && 'Produto criado!' }
            </Typography>
          </Box>
        </Modal>
      </div>
      <Box sx={ styleBoxManageProduct }>
        <Typography variant="h6" component="h2" sx={ styleTitle }>
          Pesquise o produto pelo nome
        </Typography>
        <TextField
          type="text"
          label="Produto"
          onChange={ ({ target: { value } }) => searchProduct(value) }
          value={ search }
          sx={ styleInput }
          placeholder="Digite o nome do produto"
        />
        <Box sx={ productsListManageProduct }>
          {
            !products
              ? <Loading />
              : (
                productSearch.map((p, i) => (
                  <Card sx={ CardItemsManagerProduct } key={ i }>
                    <CardActionArea sx={ cardContentAreaManageProduct }>
                      <CardMedia
                        image={ p.urlImage }
                        src={ p.urlImage }
                        className="CardMediaManagerProduct"
                        alt="imagem do produto"
                        aria-hidden="true"
                      />
                      <CardMedia
                        image={ p.urlImage }
                        sx={ CardMediaManagerProduct }
                        alt="imagem do produto"
                        aria-hidden="true"
                      />
                      <CardContent sx={ CardContentManagerProduct }>
                        <Typography className="CardTitleManagerProdut">
                          { p.name }
                        </Typography>
                        <Typography className="CardPriceManagerProdut" variant="body1">
                          R$
                          { p.price.replace(/\./, ',') }
                        </Typography>
                        <Box sx={ boxButtonsCardManageProduct }>
                          <Button
                            value={ p.id }
                            sx={ styleButtonCardManageProduct }
                          >
                            <ModeEditOutlineOutlinedIcon
                              onClick={ () => editProduct(p.id) }
                              color="info"
                            />
                          </Button>
                          <Button
                            value={ p.id }
                            sx={ styleButtonCardManageProduct }
                          >
                            <DeleteOutlinedIcon
                              onClick={ () => deleteProductConfirm(p.id) }
                              color="error"
                            />
                          </Button>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))
              )
          }
        </Box>
      </Box>
      {
        productToEdit
        && (
          <Modal
            open={ editModalIdOpenState }
            onClose={ editIdModalClose }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={ style }>
              <Box sx={ styleInfoCardEdit }>
                <Typography variant="h6" component="h2" sx={ styleTitle }>
                  Editar produto
                </Typography>
                <Typography variant="h6" component="h2">
                  { `Id: ${productToEdit.id}` }
                </Typography>
                <Typography variant="h6" component="h2">
                  { `Produto: ${productToEdit.name}` }
                </Typography>
                <Typography variant="h6" component="h2">
                  { `Preço: ${productToEdit.price}` }
                </Typography>
                <Typography>Alterar</Typography>
              </Box>
              <Box sx={ styleInputsEdit }>
                <TextField
                  type="text"
                  label="Nome"
                  onChange={ ({ target: { value } }) => setNameProdEdit(value) }
                  value={ nameProdEdit }
                  sx={ styleInput }
                  helperText={ productToEdit.name }
                  placeholder="Digite um novo nome"
                />
                <TextField
                  type="number"
                  label="Preço"
                  onChange={ ({ target: { value } }) => setPriceProdEdit(value) }
                  value={ priceProdEdit }
                  sx={ styleInput }
                  placeholder="Digite um novo valor (SOMENTE NÚMEROS)"
                  helperText={ productToEdit.price }
                />
                <TextField
                  type="text"
                  label="URL da imagem"
                  onChange={ ({ target: { value } }) => setUrlImageProdEdit(value) }
                  value={ urlImageProdEdit }
                  sx={ styleInput }
                  placeholder="Digite um novo valor"
                  helperText={ productToEdit.urlImage }
                />
                <Button
                  type="button"
                  onClick={ () => setProduct(idProductToEdit) }
                  variant="outlined"
                  color="success"
                  disabled={ isDisabledUpdateBtn }
                >
                  Atualizar
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={ () => setEditModalIdOpenState(false) }
                >
                  Voltar
                </Button>
                <Typography
                  variant="h6"
                  component="h2"
                  color="success"
                  sx={ successUpdateProduct }
                >
                  { updated && 'Produto atualizado!' }
                </Typography>
              </Box>
            </Box>
          </Modal>
        )
      }
    </div>
  );
}
