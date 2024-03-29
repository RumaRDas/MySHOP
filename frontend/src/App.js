import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';
import CartScreen from './Screen/CartScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import ProfileScreen from './Screen/ProfileScreen';
import ShippingScreen from './Screen/ShippingScreen';
import PaymentScreen from './Screen/PaymentScreen';
import PlaceOrderScreen from './Screen/PlaceOrderScreen';
import OrderScreen from './Screen/OrderScreen';
import UserListScreen from './Screen/UserListScreen';
import UserEditScreen from './Screen/UserEditScreen'
import ProductListScreen from './Screen/ProductListScreen'
import ProductEditScreen from './Screen/ProductEditScreen'
import OrderListScreen from './Screen/OrderListScreen';
const App=() =>{
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>

          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen}/>
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
