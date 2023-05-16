import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Common/Login/Login';
import Register from './pages/Common/Register/Register';
import NotFound from './pages/Common/NotFound/NotFound';
import Products from './pages/Customer/Products/Products';
import SellerOrders from './pages/Seller/Orders/Orders';
import SellerOrdersId from './pages/Seller/OrderDetailSeller/OrderSellerId';
import CustomerOrder from './pages/Customer/Cart/CartOrder';
import CustomerOrders from './pages/Customer/Orders/Orders';
import CustomerOrdersDetails from './pages/Customer/Details/OrderDetails';
import AdminManager from './pages/Admin/AdminManager';
import ProductManager from './pages/Admin/ProductManager/ProductManager';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/checkout" element={ <CustomerOrder /> } />
      <Route exact path="/customer/orders/" element={ <CustomerOrders /> } />
      <Route exact path="/customer/orders/:id" element={ <CustomerOrdersDetails /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/seller/orders" element={ <SellerOrders /> } />
      <Route exact path="/seller/orders/:id" element={ <SellerOrdersId /> } />
      <Route exact path="/admin/manage" element={ <AdminManager /> } />
      <Route exact path="/admin/manage/products" element={ <ProductManager /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
