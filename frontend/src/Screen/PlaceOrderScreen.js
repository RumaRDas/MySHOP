import React, { useState } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
// import { creatOrder} from '../actions/cartActions'

const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    console.log(cart.paymentMethod)
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    //calculate price
    cart.itemPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    const placeOrderHandler = () => {
        console.log('placeOrder')
    }

    //calculate Shipping price
    cart.shippingPrice = addDecimals(cart.itemPrice > 100 ? 0 : 20)

    //calculat tax price
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemPrice).toFixed(2)))
    //calculat total Price

    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                            </p>
                            <p>
                                {cart.shippingAddress.address},  {cart.shippingAddress.city},  {cart.shippingAddress.postalCode},   {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Payment Method
                            </h2>
                            <p><strong>Method: </strong> {cart.paymentMethod}</p>
                            <ListGroup.Item>
                                <h2>Order Item</h2>
                                {cart.cartItems.length === 0 ? (<Message>Your cart is EmptyS</Message>) :
                                    (<ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.image} fluid rounded></Image>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>)}
                            </ListGroup.Item>


                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}> Place Order</Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen