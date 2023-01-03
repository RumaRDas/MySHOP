import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  // console.log("QUENTITY:", qty)
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  // console.log(cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  //remove product from cart
  const removeFromCartHandler = (id) => {
    // console.log('remove')
    dispatch(removeFromCart(id))

  }
  //checkout 
  const checkoutHandler = () => {
    // console.log('checkout')
    history.push('/login?redirect=shipping')
  }
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {/* Shopping cart productDetails */}
          {cartItems.length === 0 ? <Message>Your cart is empty <Link to="/">Go Back</Link> </Message> : (<ListGroup variant='flush'>
            {cartItems.map((item) => (
              // item.product= product._id

              < ListGroup.Item key={item.product} >
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    {item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Select size="sm" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>{
                      [...Array(item.countInStock).keys()].map(num => (
                        <option key={num + 1} value={num + 1}> {num + 1}</option>
                      ))
                    }

                    </Form.Select>
                  </Col>
                  <Col md={2} type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash'></i>
                  </Col>
                </Row>
              </ListGroup.Item>))}
          </ListGroup>)}
        </Col>
        {/* Shopping cart price details */}
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to checkout</Button>
              </ListGroup.Item>
            </ListGroup>

          </Card>
        </Col>

      </Row>

    </>
  )
}

export default CartScreen